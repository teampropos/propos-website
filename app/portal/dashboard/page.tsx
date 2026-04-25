"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { MessageSquare, Clock, ShieldCheck, Star } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  auto_posted: "Auto-posted",
  pending: "Pending approval",
  needs_human: "Needs review",
  spam: "Spam",
  discarded: "Discarded",
};

const STATUS_COLORS: Record<string, string> = {
  auto_posted: "text-green-600",
  pending: "text-yellow-600",
  needs_human: "text-orange-600",
  spam: "text-red-500",
  discarded: "text-gray-400",
};

interface ActivityItem {
  id: number;
  reviewer_name: string | null;
  star_rating: number;
  review_text: string | null;
  status: string;
  received_at: string;
}

interface DashboardData {
  replies_this_month: number;
  pending_count: number;
  recent_activity: ActivityItem[];
}

interface Client {
  business_name: string;
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  sub: string;
  icon: React.ElementType;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={20} className="text-[#2563EB]" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#111827]">{value}</p>
        <p className="text-sm font-medium text-[#111827]">{label}</p>
        <p className="text-xs text-[#6B7280] mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get<DashboardData>("/api/dashboard"),
      api.get<Client>("/api/auth/me"),
    ])
      .then(([dash, cl]) => {
        setData(dash);
        setClient(cl);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <div className="p-8 text-[#6B7280]">Something went wrong. Please refresh.</div>;
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#111827]">
          {client ? client.business_name : "Dashboard"}
        </h1>
        <p className="text-[#6B7280] mt-1">
          Propos is actively monitoring your reviews and replying automatically as they come in. You don&apos;t need to check this daily — we handle everything in the background.
        </p>
      </div>

      {data ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard
              label="Replies this month"
              value={data.replies_this_month}
              sub={
                data.replies_this_month === 0
                  ? "No reviews yet — we'll handle them as they come in"
                  : "Sent automatically on your behalf"
              }
              icon={MessageSquare}
            />
            <StatCard
              label="Pending approvals"
              value={data.pending_count}
              sub="Negative reviews waiting for you"
              icon={Clock}
            />
            <StatCard
              label="Auto replies"
              value="On"
              sub="Positive reviews post instantly"
              icon={ShieldCheck}
            />
          </div>

          <p className="text-xs text-[#6B7280] mb-6">
            Every replied review helps build trust with future customers.
          </p>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-4">
            <p className="text-sm font-medium text-[#111827] mb-1">How it works</p>
            <ul className="text-sm text-[#6B7280] space-y-1">
              <li>Positive reviews (4–5 stars) are replied to automatically — no action needed.</li>
              <li>Negative or sensitive reviews are held here for your approval before anything posts.</li>
              <li>Spam is detected automatically and excluded.</li>
            </ul>
          </div>

          {data.pending_count > 0 ? (
            <div className="bg-[#EFF6FF] border border-[#2563EB]/20 rounded-xl p-5">
              <p className="text-sm font-medium text-[#1D4ED8]">
                You&apos;ve got {data.pending_count} review{data.pending_count !== 1 ? "s" : ""} waiting for your approval when you get a chance.
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                Unanswered reviews can affect how potential customers perceive your business.
              </p>
              <a
                href="/portal/pending"
                className="inline-block mt-3 text-sm font-medium text-[#2563EB] hover:underline"
              >
                Review them &rarr;
              </a>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
              <p className="text-sm font-medium text-[#111827] mb-1">You&apos;re all caught up.</p>
              <p className="text-sm text-[#6B7280]">
                Propos is watching for new reviews. When they land, positive ones go out instantly and anything sensitive comes here first.
              </p>
            </div>
          )}

          {data.recent_activity.length > 0 && (
        <div className="mt-6">
          <h2 className="font-heading text-lg font-bold text-[#111827] mb-3">Recent activity</h2>
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            {data.recent_activity.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 px-5 py-4 ${i < data.recent_activity.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}
              >
                <div className="flex shrink-0 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} className={s <= item.star_rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">
                    {item.reviewer_name || "Anonymous"}
                  </p>
                  {item.review_text && (
                    <p className="text-xs text-[#6B7280] truncate">{item.review_text}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs font-medium ${STATUS_COLORS[item.status] || "text-gray-400"}`}>
                    {STATUS_LABELS[item.status] || item.status}
                  </p>
                  <p className="text-xs text-[#9CA3AF]">
                    {new Date(item.received_at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

        <p className="text-xs text-[#9CA3AF] mt-8">
          Negative reviews are always held for your approval before posting.
        </p>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] p-6 h-28 animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
}

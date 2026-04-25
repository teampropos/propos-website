"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Star, X } from "lucide-react";

interface Review {
  id: number;
  reviewer_name: string | null;
  star_rating: number;
  review_text: string | null;
  received_at: string;
  status: string;
}

const STATUS_LABELS: Record<string, string> = {
  auto_posted: "Auto-posted",
  pending: "Pending",
  needs_human: "Needs review",
  spam: "Spam",
  discarded: "Discarded",
};

const STATUS_COLORS: Record<string, string> = {
  auto_posted: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  needs_human: "bg-orange-100 text-orange-700",
  spam: "bg-red-100 text-red-700",
  discarded: "bg-gray-100 text-gray-500",
};

const FILTERS = ["All", "Auto-posted", "Pending", "Needs review", "Spam", "Discarded"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
      ))}
    </div>
  );
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-medium text-[#111827]">{review.reviewer_name || "Anonymous"}</p>
            <StarRating rating={review.star_rating} />
          </div>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#111827]">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-[#6B7280] mb-3">
          {new Date(review.received_at).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {review.review_text ? (
          <p className="text-sm text-[#374151] bg-[#F9FAFB] rounded-lg p-4 leading-relaxed mb-4">
            &ldquo;{review.review_text}&rdquo;
          </p>
        ) : (
          <p className="text-sm text-[#6B7280] italic mb-4">No review text — star rating only.</p>
        )}

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[review.status] || "bg-gray-100 text-gray-500"}`}>
            {STATUS_LABELS[review.status] || review.status}
          </span>
          {review.status === "pending" || review.status === "needs_human" ? (
            <a href="/portal/pending" className="text-xs text-[#2563EB] hover:underline">
              Go to pending approvals &rarr;
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Review | null>(null);

  useEffect(() => {
    api.get<Review[]>("/api/reviews")
      .then(setReviews)
      .finally(() => setLoading(false));
  }, []);

  const filtered = reviews.filter((r) => {
    if (filter === "All") return true;
    return (STATUS_LABELS[r.status] || r.status) === filter;
  });

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-2">
        <h1 className="font-heading text-3xl font-bold text-[#111827]">Reviews</h1>
        <p className="text-[#6B7280] mt-1">All reviews Propos has handled for you.</p>
      </div>

      <p className="text-xs text-[#9CA3AF] mb-5">
        Spam reviews are detected automatically and excluded from replies.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 ${
              filter === f
                ? "bg-[#2563EB] text-white"
                : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B7280] text-sm">Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-[#6B7280] text-sm">No reviews found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Reviewer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Rating</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Review</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase tracking-wide">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] cursor-pointer"
                  onClick={() => setSelected(r)}
                >
                  <td className="px-5 py-4 font-medium text-[#111827]">
                    {r.reviewer_name || "Anonymous"}
                  </td>
                  <td className="px-5 py-4">
                    <StarRating rating={r.star_rating} />
                  </td>
                  <td className="px-5 py-4 text-[#6B7280] max-w-xs">
                    <span className="line-clamp-2">{r.review_text || "No text"}</span>
                  </td>
                  <td className="px-5 py-4 text-[#6B7280] whitespace-nowrap">
                    {new Date(r.received_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] || "bg-gray-100 text-gray-500"}`}>
                      {STATUS_LABELS[r.status] || r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-xs text-[#2563EB] font-medium">View</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && <ReviewModal review={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

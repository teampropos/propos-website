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
  reply_text: string | null;
  replied_at: string | null;
}

const STATUS_LABELS: Record<string, string> = {
  auto_posted: "Auto-posted",
  scheduled: "Scheduled",
  preview: "Preview — not posted",
  pending: "Pending",
  needs_human: "Needs review",
  spam: "Spam",
  discarded: "Discarded",
};

const STATUS_COLORS: Record<string, string> = {
  auto_posted: "text-green-700 border-green-200",
  scheduled: "text-[var(--color-accent)] border-[var(--color-accent)]",
  preview: "text-[var(--color-accent)] border-[var(--color-accent)]",
  pending: "text-amber-700 border-amber-200",
  needs_human: "text-orange-700 border-orange-200",
  spam: "text-red-700 border-red-200",
  discarded: "text-[var(--color-text-secondary)] border-[var(--color-border)]",
};

const FILTERS = ["All", "Auto-posted", "Scheduled", "Pending", "Needs review", "Spam", "Discarded"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= rating ? "fill-[#B08A2E] text-[#B08A2E]" : "text-[var(--color-border)]"} />
      ))}
    </div>
  );
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-[var(--color-paper)] p-6 w-full max-w-lg border border-[var(--color-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">{review.reviewer_name || "Anonymous"}</p>
            <StarRating rating={review.star_rating} />
          </div>
          <button onClick={onClose} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            <X size={20} />
          </button>
        </div>

        <p className="text-xs text-[var(--color-text-secondary)] mb-3">
          {new Date(review.received_at).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {review.review_text ? (
          <p className="text-sm text-[var(--color-text-primary)] bg-[var(--color-surface)] p-4 leading-relaxed mb-4">
            &ldquo;{review.review_text}&rdquo;
          </p>
        ) : (
          <p className="text-sm text-[var(--color-text-secondary)] italic mb-4">No review text — star rating only.</p>
        )}

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 border text-xs font-medium ${STATUS_COLORS[review.status] || "text-[var(--color-text-secondary)] border-[var(--color-border)]"}`}>
            {STATUS_LABELS[review.status] || review.status}
          </span>
          {review.status === "pending" || review.status === "needs_human" ? (
            <a href="/portal/pending" className="text-xs text-[var(--color-accent)] hover:underline">
              Go to pending approvals &rarr;
            </a>
          ) : null}
        </div>

        {review.reply_text && (
          <div className="mt-5 border-t border-[var(--color-border)] pt-4">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
              {review.replied_at ? "Your reply" : "Draft reply — not yet posted"}
            </p>
            <p className="text-sm text-[var(--color-text-primary)] bg-[var(--color-surface)] p-4 leading-relaxed">
              {review.reply_text}
            </p>
            {review.replied_at ? (
              <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                Posted {new Date(review.replied_at).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            ) : (
              <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                This hasn&rsquo;t been posted to Google. Subscribe to have replies like this post automatically.
              </p>
            )}
          </div>
        )}
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
        <h1 className="font-heading text-3xl font-semibold text-[var(--color-text-primary)]">Reviews</h1>
        <p className="text-[var(--color-text-secondary)] mt-1">All reviews Propos has handled for you.</p>
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] mb-5">
        Spam reviews are detected automatically and excluded from replies.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
              filter === f
                ? "bg-[var(--color-text-primary)] text-white"
                : "bg-[var(--color-paper)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-[var(--color-paper)] border border-[var(--color-border)]">
        {loading ? (
          <div className="p-8 text-center text-[var(--color-text-secondary)] text-sm">Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-[var(--color-text-secondary)] text-sm">No reviews found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Reviewer</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Rating</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Review</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)] cursor-pointer"
                  onClick={() => setSelected(r)}
                >
                  <td className="px-5 py-4 font-medium text-[var(--color-text-primary)]">
                    {r.reviewer_name || "Anonymous"}
                  </td>
                  <td className="px-5 py-4">
                    <StarRating rating={r.star_rating} />
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-secondary)] max-w-xs">
                    <span className="line-clamp-2">{r.review_text || "No text"}</span>
                  </td>
                  <td className="px-5 py-4 text-[var(--color-text-secondary)] whitespace-nowrap">
                    {new Date(r.received_at).toLocaleDateString("en-AU", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 border text-xs font-medium ${STATUS_COLORS[r.status] || "text-[var(--color-text-secondary)] border-[var(--color-border)]"}`}>
                      {STATUS_LABELS[r.status] || r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-xs text-[var(--color-accent)] font-medium">View</span>
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

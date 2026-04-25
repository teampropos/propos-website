"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Star, ChevronDown, ChevronUp, ExternalLink, RefreshCw } from "lucide-react";

interface PendingReview {
  id: number;
  reviewer_name: string | null;
  star_rating: number;
  review_text: string | null;
  received_at: string;
  status: string;
  routing_reason: string | null;
  reply_text: string | null;
  reply_id: number | null;
}

interface PendingData {
  negative: PendingReview[];
  flagged_four_star: PendingReview[];
  spam: PendingReview[];
  needs_human: PendingReview[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
      ))}
    </div>
  );
}

function ReviewCard({
  review: initialReview,
  onRemove,
  requireEdit = false,
}: {
  review: PendingReview;
  onRemove: (id: number) => void;
  requireEdit?: boolean;
}) {
  const [review, setReview] = useState(initialReview);
  const [editMode, setEditMode] = useState(false);
  const [editedReply, setEditedReply] = useState(initialReview.reply_text || "");
  const [regenerateNote, setRegenerateNote] = useState("");
  const [showRegenerate, setShowRegenerate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasEdited = editMode && editedReply !== review.reply_text;

  async function handleApprove() {
    setLoading(true);
    setError("");
    try {
      await api.post(`/api/pending/${review.id}/approve`, {
        payload: editMode && hasEdited ? editedReply : undefined,
      });
      onRemove(review.id);
    } catch {
      setError("Failed to approve. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDiscard() {
    setLoading(true);
    setError("");
    try {
      await api.post(`/api/pending/${review.id}/discard`, {});
      onRemove(review.id);
    } catch {
      setError("Failed to discard. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegenerate() {
    setLoading(true);
    setError("");
    try {
      const res = await api.post<{ reply_text: string }>(`/api/pending/${review.id}/regenerate`, {
        payload: regenerateNote,
      });
      setReview((prev) => ({ ...prev, reply_text: res.reply_text }));
      setEditedReply(res.reply_text);
      setShowRegenerate(false);
      setRegenerateNote("");
      setEditMode(false);
    } catch {
      setError("Failed to regenerate. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const canApprove = !requireEdit || hasEdited;

  return (
    <div className="border border-[#E5E7EB] rounded-xl p-5 bg-white">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="font-medium text-[#111827]">{review.reviewer_name || "Anonymous"}</p>
          <StarRating rating={review.star_rating} />
        </div>
        <span className="text-xs text-[#6B7280] whitespace-nowrap">
          {new Date(review.received_at).toLocaleDateString("en-AU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {review.review_text && (
        <p className="text-sm text-[#374151] bg-[#F9FAFB] rounded-lg p-3 mb-3 leading-relaxed">
          &ldquo;{review.review_text}&rdquo;
        </p>
      )}

      {review.routing_reason && (
        <p className="text-xs text-[#6B7280] italic mb-3">{review.routing_reason}</p>
      )}

      {review.reply_text && (
        <div className="mb-4">
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1.5">AI Reply</p>
          {editMode ? (
            <textarea
              value={editedReply}
              onChange={(e) => setEditedReply(e.target.value)}
              rows={4}
              className="w-full border border-[#2563EB] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
            />
          ) : (
            <p className="text-sm text-[#374151] border border-[#E5E7EB] rounded-lg p-3 leading-relaxed">
              {review.reply_text}
            </p>
          )}
        </div>
      )}

      {showRegenerate && (
        <div className="mb-3">
          <input
            type="text"
            value={regenerateNote}
            onChange={(e) => setRegenerateNote(e.target.value)}
            placeholder='Optional direction — e.g. "Too formal" or "Mention our new menu"'
            className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
        </div>
      )}

      {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleApprove}
          disabled={loading || !canApprove}
          className="px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg hover:bg-[#1D4ED8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editMode && hasEdited ? "Save & Approve" : "Approve"}
        </button>

        {review.reply_text && (
          <button
            onClick={() => {
              setEditMode(!editMode);
              if (!editMode) setEditedReply(review.reply_text || "");
            }}
            disabled={loading}
            className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#374151] text-sm font-medium rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        )}

        {!showRegenerate ? (
          <button
            onClick={() => setShowRegenerate(true)}
            disabled={loading}
            className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#374151] text-sm font-medium rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={13} />
            Regenerate
          </button>
        ) : (
          <>
            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="px-4 py-2 bg-white border border-[#2563EB] text-[#2563EB] text-sm font-medium rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              {loading ? "Generating..." : "Generate"}
            </button>
            <button
              onClick={() => { setShowRegenerate(false); setRegenerateNote(""); }}
              disabled={loading}
              className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#6B7280] text-sm font-medium rounded-lg hover:text-[#111827] transition-colors"
            >
              Cancel
            </button>
          </>
        )}

        <button
          onClick={handleDiscard}
          disabled={loading}
          className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#6B7280] text-sm font-medium rounded-lg hover:border-red-300 hover:text-red-500 transition-colors"
        >
          Discard
        </button>
      </div>

      {requireEdit && !hasEdited && (
        <p className="text-xs text-orange-600 mt-2">Edit the reply before approving.</p>
      )}
    </div>
  );
}

function Bucket({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3"
      >
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-lg font-bold text-[#111827]">{title}</h2>
          <span className="bg-[#E5E7EB] text-[#374151] text-xs font-medium px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        {open ? <ChevronUp size={18} className="text-[#6B7280]" /> : <ChevronDown size={18} className="text-[#6B7280]" />}
      </button>
      {open && <div className="flex flex-col gap-3">{children}</div>}
    </div>
  );
}

export default function PendingPage() {
  const [data, setData] = useState<PendingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<PendingData>("/api/pending")
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  function handleRemove(reviewId: number) {
    setData((prev) => {
      if (!prev) return prev;
      const remove = (arr: PendingReview[]) => arr.filter((r) => r.id !== reviewId);
      return {
        negative: remove(prev.negative),
        flagged_four_star: remove(prev.flagged_four_star),
        spam: remove(prev.spam),
        needs_human: remove(prev.needs_human),
      };
    });
  }

  const total = data
    ? data.negative.length + data.flagged_four_star.length + data.spam.length + data.needs_human.length
    : 0;

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-[#111827]">Pending Approvals</h1>
        <p className="text-[#6B7280] mt-1">Reviews that need your attention before a reply is posted.</p>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Unanswered reviews can affect how potential customers perceive your business. Negative reviews are always held here — nothing posts without your approval.
        </p>
      </div>

      {loading ? (
        <div className="text-sm text-[#6B7280]">Loading...</div>
      ) : total === 0 ? (
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 text-center">
          <p className="text-[#6B7280]">You&apos;re all caught up. Nothing waiting for approval.</p>
        </div>
      ) : (
        <>
          {data!.negative.length > 0 && (
            <Bucket title="Negative Reviews" count={data!.negative.length}>
              {data!.negative.map((r) => (
                <ReviewCard key={r.id} review={r} onRemove={handleRemove} />
              ))}
            </Bucket>
          )}

          {data!.flagged_four_star.length > 0 && (
            <Bucket title="Flagged 4-Star Reviews" count={data!.flagged_four_star.length}>
              {data!.flagged_four_star.map((r) => (
                <ReviewCard key={r.id} review={r} onRemove={handleRemove} />
              ))}
            </Bucket>
          )}

          {data!.spam.length > 0 && (
            <Bucket title="Spam / Gibberish" count={data!.spam.length}>
              {data!.spam.map((r) => (
                <div key={r.id} className="border border-[#E5E7EB] rounded-xl p-5 bg-white">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-medium text-[#111827]">{r.reviewer_name || "Anonymous"}</p>
                    <StarRating rating={r.star_rating} />
                  </div>
                  {r.review_text && (
                    <p className="text-sm text-[#374151] bg-[#F9FAFB] rounded-lg p-3 mb-3">
                      &ldquo;{r.review_text}&rdquo;
                    </p>
                  )}
                  <a
                    href="https://business.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#2563EB] hover:underline"
                  >
                    Report to Google <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </Bucket>
          )}

          {data!.needs_human.length > 0 && (
            <Bucket title="Needs Human Reply" count={data!.needs_human.length}>
              {data!.needs_human.map((r) => (
                <ReviewCard key={r.id} review={r} onRemove={handleRemove} requireEdit />
              ))}
            </Bucket>
          )}
        </>
      )}
    </div>
  );
}

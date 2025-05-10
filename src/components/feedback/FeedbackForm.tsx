import React, { useState } from "react";
import Button from "../ui/Button";

interface FeedbackFormProps {
  sessionId?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ sessionId = "" }) => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = async () => {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          feedback, 
          rating,
          email: email || undefined,
          sessionId 
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("フィードバック送信エラー:", err);
    }
  };

  // スターアイコン
  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
      stroke="currentColor" className="w-6 h-6" strokeWidth={filled ? "0" : "1.5"}>
      <path strokeLinecap="round" strokeLinejoin="round" 
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );

  return (
    <div className="rounded shadow-md border border-neutral-200 bg-white overflow-hidden">
      <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
        <h2 className="text-lg font-semibold text-neutral-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          フィードバック
        </h2>
      </div>
      
      <div className="p-6">
        {submitted ? (
          <div className="bg-green-50 text-green-700 px-5 py-4 rounded flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p>ありがとうございました！フィードバックを送信しました。</p>
          </div>
        ) : (
          <>
            <p className="mb-6 text-neutral-600">
              生成結果はいかがでしたか？改善点などをお聞かせください。
            </p>
            
            <div className="mb-6">
              <label className="block mb-2 text-neutral-700 font-medium text-sm">評価</label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                      rating >= star
                        ? "bg-primary-500 text-white"
                        : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
                    }`}
                    aria-label={`${star}点`}
                  >
                    <StarIcon filled={rating >= star} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-5">
              <label className="block mb-2 text-neutral-700 font-medium text-sm">
                コメント
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 rounded border border-neutral-300 bg-white 
                focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                transition-all duration-200"
                rows={4}
                placeholder="ご意見・ご感想をお聞かせください"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-neutral-700 font-medium text-sm">
                メールアドレス（任意）
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded border border-neutral-300 bg-white 
                focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                transition-all duration-200"
                placeholder="ご返信が必要な場合はご記入ください"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={submitFeedback} 
                variant="primary"
                disabled={!rating || !feedback}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                }
              >
                送信する
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
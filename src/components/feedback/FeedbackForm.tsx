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

  return (
    <div className="rounded-apple border border-apple-gray-200 bg-white shadow-apple overflow-hidden">
      <div className="bg-apple-gray-50 px-6 py-4 border-b border-apple-gray-200">
        <h2 className="text-lg font-semibold text-apple-gray-500">フィードバック</h2>
      </div>
      
      <div className="p-6">
        {submitted ? (
          <div className="bg-green-50 text-green-700 px-4 py-3 rounded-apple">
            <p>ありがとうございました！フィードバックを送信しました。</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-apple-gray-400">
              生成結果はいかがでしたか？改善点などをお聞かせください。
            </p>
            
            <div className="mb-6">
              <label className="block mb-2 text-apple-gray-500 font-medium">評価</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                      rating >= star
                        ? "bg-apple-blue text-white"
                        : "bg-apple-gray-100 text-apple-gray-400"
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-apple-gray-500 font-medium">
                コメント
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-4 py-3 rounded-apple border border-apple-gray-200 bg-white 
                focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10
                transition-all duration-200"
                rows={3}
                placeholder="ご意見・ご感想をお聞かせください"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-apple-gray-500 font-medium">
                メールアドレス（任意）
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-apple border border-apple-gray-200 bg-white 
                focus:outline-none focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/10
                transition-all duration-200"
                placeholder="ご返信が必要な場合はご記入ください"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={submitFeedback} 
                variant="primary"
                disabled={!rating || !feedback}
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
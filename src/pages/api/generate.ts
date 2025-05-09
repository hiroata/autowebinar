// 販売ファネル生成API（LP・動画・決済ページなど）
// POST: 入力素材を受け取り、AIで成果物を生成
import type { NextApiRequest, NextApiResponse } from "next";
import { generateLPHtml } from "../../templates/lp.html";
import { generateWebinarScript } from "../../templates/webinar-script";
import { generateAdCopy } from "../../templates/ad-copy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  // フォームデータ受け取り
  const data = req.body || {};
  // 仮生成物
  const lpHtml = generateLPHtml({
    title: data.name || "サンプル商品",
    description: data.text || "ここに商品説明が入ります",
    videoUrl: "/sample.mp4",
    ctaUrl: "/checkout",
    reviews: [
      { name: "ユーザーA", comment: "とても良かったです！" },
      { name: "ユーザーB", comment: "簡単に始められました。" },
    ],
  });
  const script = generateWebinarScript({
    topic: data.genre || "サンプルジャンル",
    personality: "熱血",
    duration: 10,
  });
  const adCopy = generateAdCopy({
    product: data.name || "サンプル商品",
    target: data.genre || "ターゲット",
  });
  res.status(200).json({
    lpHtml,
    script,
    adCopy,
  });
}

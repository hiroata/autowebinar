// filepath: /Users/YUKI/Desktop/autowebinar/src/pages/api/feedback.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // リクエストからフィードバックを取得
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({ error: "フィードバック内容が必要です" });
    }

    // フィードバックの保存（ここでは簡易的にファイルに保存）
    const feedbackDir = path.join(process.cwd(), "feedback");
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const fileName = `feedback-${timestamp.replace(/:/g, "-")}.txt`;
    const filePath = path.join(feedbackDir, fileName);

    // フィードバック内容と日時をファイルに保存
    const content = `[${timestamp}]\n${feedback}\n\n`;
    fs.writeFileSync(filePath, content, "utf8");

    // 実運用時にはデータベースに保存したりメール送信することも考えられます

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("フィードバック保存エラー:", error);
    return res
      .status(500)
      .json({ error: "フィードバックの保存に失敗しました" });
  }
}

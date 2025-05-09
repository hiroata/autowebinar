// 要約・パーソナリティ抽出API
// POST: 音声/動画/テキスト素材から要約・パーソナリティタイプを抽出
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  // TODO: AI要約・パーソナリティ抽出処理
  return res.status(200).json({ message: "要約・抽出処理は今後実装予定です" });
}

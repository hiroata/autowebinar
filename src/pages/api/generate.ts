// 販売ファネル生成API（LP・動画・決済ページなど）
// POST: 入力素材を受け取り、AIで成果物を生成
import type { NextApiRequest, NextApiResponse } from "next";
import { generateLPHtml } from "../../templates/generators/lpGenerator";
import { generateWebinarScript } from "../../templates/generators/webinarScriptGenerator";
import { generateAdCopy } from "../../templates/generators/adCopyGenerator";
import { AI_CONFIG } from "../../utils/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    // フォームデータから必要な情報を抽出
    const data = req.body || {};
    const {
      name,
      genre,
      expertise,
      text,
      price,
      aiModel = AI_CONFIG.models.primary,
    } = data;
    
    // ターゲット層をテキストから抽出
    const targetAudience = genre || "一般層";
    
    // 基本情報のバリデーション
    if (!name || !text) {
      return res.status(400).json({ 
        error: "必須項目が不足しています", 
        fields: { 
          name: !name ? "商品名が必要です" : null,
          text: !text ? "説明文が必要です" : null
        }
      });
    }

    // テキストからキーポイントを抽出
    const keyPoints = text
      .split(/[.。]/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 10 && s.length < 100)
      .slice(0, 5);
    
    // ベネフィットを抽出
    const benefits = keyPoints.length > 0 ? keyPoints : [text.substring(0, 100)];

    // 並行して各コンテンツを生成
    const [script, adCopy, lpHtml] = await Promise.all([
      generateWebinarScript({
        topic: name,
        type: 'standard',
        style: 'professional',
        expertise: expertise || genre || "一般",
        targetAudience,
        keyPoints,
        model: aiModel as 'grok' | 'gemini'
      }),
      generateAdCopy({
        product: name,
        target: targetAudience,
        price: price ? parseInt(price.toString(), 10) : undefined,
        benefits,
        model: aiModel as 'grok' | 'gemini'
      }),
      generateLPHtml({
        title: name,
        description: text.substring(0, 200),
        videoUrl: data.videoPath || "/sample.mp4",
        ctaUrl: "/checkout.html",
        benefits,
        price: price ? parseInt(price.toString(), 10) : undefined,
        model: aiModel as 'grok' | 'gemini'
      })
    ]);

    // レスポンスを返す
    return res.status(200).json({
      success: true,
      lpHtml,
      script,
      adCopy,
      sessionId: Date.now().toString()
    });
    
  } catch (error) {
    console.error("生成エラー:", error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : "コンテンツ生成中にエラーが発生しました"
    });
  }
}

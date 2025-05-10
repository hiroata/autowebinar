import { generateAIContent } from '../../utils/aiClient';
import { AI_CONFIG } from '../../utils/config';

interface AdCopyOptions {
  product: string;
  target: string;
  price?: number;
  benefits: string[];
  unique?: string;
  model?: 'grok' | 'gemini';
}

/**
 * AIを使用して広告コピーを生成する
 */
export async function generateAdCopy({
  product,
  target,
  price,
  benefits,
  unique,
  model = AI_CONFIG.models.primary as 'grok' | 'gemini',
}: AdCopyOptions): Promise<{ short: string; long: string }> {
  const prompt = `
以下の条件で商品・サービスの広告コピーを短文と長文の2種類作成してください:

商品名: ${product}
ターゲット顧客: ${target}
${price ? `価格: ${price.toLocaleString()}円` : ''}
メリット:
${benefits.map(b => `- ${b}`).join('\n')}
${unique ? `独自の強み: ${unique}` : ''}

【短文広告】
・50-70文字程度
・目を引くキャッチコピー
・即効性を感じさせる表現

【長文広告】
・400-600文字程度
・具体的なベネフィットを詳述
・行動喚起を含める
・信頼性を高める表現を含める
・感情に訴えかける要素を含める

両方とも日本語で作成し、広告らしい魅力的な表現を使用してください。
`;

  try {
    const result = await generateAIContent({
      model,
      prompt,
      maxTokens: 2000,
      temperature: 0.7
    });
    
    // 結果から短文と長文を抽出
    const shortMatch = result.match(/【短文広告】([\s\S]*?)(?:【長文広告】|$)/);
    const longMatch = result.match(/【長文広告】([\s\S]*?)$/);
    
    return {
      short: shortMatch ? shortMatch[1].trim() : "生成に失敗しました",
      long: longMatch ? longMatch[1].trim() : "生成に失敗しました"
    };
  } catch (error) {
    console.error('広告コピー生成エラー:', error);
    return {
      short: "生成中にエラーが発生しました",
      long: "生成中にエラーが発生しました"
    };
  }
}
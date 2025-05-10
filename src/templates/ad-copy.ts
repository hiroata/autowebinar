// 広告文テンプレート生成（雛形）
// 入力データをもとに広告文（短文・長文）を生成
import { generateAdCopy as newGenerateAdCopy } from './generators/adCopyGenerator';

export async function generateAdCopy({
  product,
  target,
}: {
  product: string;
  target: string;
}): Promise<{ short: string; long: string }> {
  // 新しいジェネレーターを使用し、インターフェースを合わせる
  return await newGenerateAdCopy({
    product,
    target,
    benefits: [`${product}で${target}を改善`],
    model: 'gemini'
  });
}

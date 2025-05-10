// ウェビナー台本生成スクリプト（雛形）
// 入力データをもとにウェビナー台本テキストを生成
import { generateWebinarScript as newGenerateWebinarScript } from './generators/webinarScriptGenerator';

export async function generateWebinarScript({
  topic,
  personality,
  // durationパラメータを削除（未使用のため）
}: {
  topic: string;
  personality: string;
  // duration?: number; // 分（未使用のため削除）
}): Promise<string> {
  // 新しいジェネレーターを使用し、インターフェースを合わせる
  return await newGenerateWebinarScript({
    topic,
    type: 'standard',
    style: 'professional',
    expertise: personality,
    targetAudience: '一般',
    model: 'gemini'
  });
}

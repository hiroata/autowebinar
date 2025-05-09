// ウェビナー台本生成スクリプト（雛形）
// 入力データをもとにウェビナー台本テキストを生成
export function generateWebinarScript({
  topic,
  personality,
  duration = 10,
}: {
  topic: string;
  personality: string;
  duration?: number; // 分
}): string {
  // TODO: AI生成APIと連携し、台本を生成
  return `【ウェビナー台本サンプル】\nタイトル: ${topic}\nパーソナリティ: ${personality}\n想定尺: ${duration}分\n---\nここにAI生成された台本が入ります。`;
}

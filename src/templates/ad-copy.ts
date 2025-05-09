// 広告文テンプレート生成（雛形）
// 入力データをもとに広告文（短文・長文）を生成
export function generateAdCopy({
  product,
  target,
}: {
  product: string;
  target: string;
}): { short: string; long: string } {
  // TODO: AI生成APIと連携し、広告文を生成
  return {
    short: `【短文】${product}で${target}が変わる！今すぐチェック！`,
    long: `【長文】あなたの${target}を劇的に変える新サービス「${product}」が登場。今すぐ詳細をチェックして、変化を体感してください。`,
  };
}

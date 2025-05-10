import { generateAIContent } from '../../utils/aiClient';
import { AI_CONFIG } from '../../utils/config';

interface LPGenerationOptions {
  title: string;
  description: string;
  videoUrl: string;
  ctaUrl: string;
  benefits: string[];
  price?: number;
  testimonials?: { name: string; comment: string }[];
  model?: 'grok' | 'gemini';
}

/**
 * AIを使用してランディングページHTMLを生成する
 */
export async function generateLPHtml({
  title,
  description,
  videoUrl,
  ctaUrl,
  benefits,
  price,
  testimonials = [],
  model = AI_CONFIG.models.primary as 'grok' | 'gemini',
}: LPGenerationOptions): Promise<string> {
  // HTMLの基本構造は既定し、AIには説明文や見出しのテキストのみを生成させる
  try {
    // 商品説明文を生成
    const descriptionPrompt = `
以下の商品・サービスについて、魅力的なランディングページの説明文を3〜5段落で作成してください:

タイトル: ${title}
基本説明: ${description}
主なメリット:
${benefits.map(b => `- ${b}`).join('\n')}
${price ? `価格: ${price.toLocaleString()}円` : ''}

以下のポイントを含めた魅力的な説明文を作成してください:
1. 読者の課題や悩みに共感する導入
2. 商品・サービスがどのように課題を解決するか
3. 具体的なベネフィットの説明
4. 信頼性を高める要素
5. 行動を促す締めくくり

マーケティング的に効果的で、読者の購買意欲を高める表現を使ってください。
`;

    const productDescription = await generateAIContent({
      model,
      prompt: descriptionPrompt,
      maxTokens: 2000,
      temperature: 0.7
    });
    
    // 商品の見出しを生成
    const headlinePrompt = `
以下の商品・サービスについて、ランディングページの魅力的な見出しを3～5個作成してください:

タイトル: ${title}
基本説明: ${description}
主なメリット:
${benefits.map(b => `- ${b}`).join('\n')}

各見出しは30文字程度で、以下のようなフォーマットで作成してください:
1. 「[魅力的な見出し1]」
2. 「[魅力的な見出し2]」
3. 「[魅力的な見出し3]」

読者の注目を集め、興味を引くような魅力的な見出しを作成してください。
`;

    const headlinesResponse = await generateAIContent({
      model,
      prompt: headlinePrompt,
      maxTokens: 1000,
      temperature: 0.7
    });
    
    // 見出しを抽出
    const headlines = headlinesResponse
      .split(/\d+\./)
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 0 && line.includes('「') && line.includes('」'))
      .map((line: string) => {
        const match = line.match(/「([^」]+)」/);
        return match ? match[1] : '';
      })
      .filter((headline: string) => headline.length > 0);

    // HTMLを構築
    return `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-50 text-gray-800">
  <div class="max-w-5xl mx-auto px-4 py-12">
    <!-- ヒーローセクション -->
    <header class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">${title}</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">${description}</p>
    </header>
    
    <!-- ビデオセクション -->
    <div class="mb-16">
      <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
        <video src="${videoUrl}" controls class="w-full"></video>
      </div>
    </div>
    
    <!-- 説明セクション -->
    <div class="prose prose-lg max-w-3xl mx-auto mb-16">
      ${productDescription.split('\n\n').map((p: string) => `<p>${p}</p>`).join('')}
    </div>
    
    <!-- 特徴セクション -->
    <div class="grid md:grid-cols-2 gap-8 mb-16">
      ${headlines.slice(0, 4).map((headline: string, index: number) => `
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-3">${headline}</h2>
        <p>${benefits[index] || benefits[0]}</p>
      </div>
      `).join('')}
    </div>
    
    <!-- 証言セクション -->
    ${testimonials.length > 0 ? `
    <div class="mb-16">
      <h2 class="text-2xl font-semibold text-center mb-8">お客様の声</h2>
      <div class="grid md:grid-cols-2 gap-6">
        ${testimonials.map(t => `
        <div class="bg-white p-6 rounded-lg shadow">
          <p class="italic mb-4">"${t.comment}"</p>
          <p class="font-semibold text-right">— ${t.name}</p>
        </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    
    <!-- CTA セクション -->
    <div class="text-center bg-primary-100 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">今すぐ始めましょう</h2>
      ${price ? `<p class="text-3xl font-bold mb-6">${price.toLocaleString()}円</p>` : ''}
      <a href="${ctaUrl}" class="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg shadow transition duration-300">
        今すぐ申し込む
      </a>
    </div>
    
    <!-- フッター -->
    <footer class="mt-20 pt-8 border-t text-center text-gray-500">
      <p>&copy; ${new Date().getFullYear()} ${title} All rights reserved.</p>
    </footer>
  </div>
</body>
</html>
`;
  } catch (error) {
    console.error('LP HTML生成エラー:', error);
    throw new Error('ランディングページの生成に失敗しました');
  }
}
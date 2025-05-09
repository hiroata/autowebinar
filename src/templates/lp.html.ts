// LPのHTMLテンプレート生成関数（雛形）
// 入力データをもとにLPのHTMLを生成
export function generateLPHtml({
  title,
  description,
  videoUrl,
  ctaUrl,
  reviews = [],
}: {
  title: string;
  description: string;
  videoUrl: string;
  ctaUrl: string;
  reviews?: { name: string; comment: string }[];
}): string {
  // TODO: Tailwind CSSベースのHTMLテンプレートを動的生成
  return `
    <section class="p-8 bg-white rounded shadow">
      <h1 class="text-3xl font-bold mb-4">${title}</h1>
      <p class="mb-4">${description}</p>
      <div class="mb-4">
        <video src="${videoUrl}" controls class="w-full max-w-xl mx-auto"></video>
      </div>
      <div class="flex justify-center mb-6">
        <a href="${ctaUrl}" class="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition">今すぐ購入（決済ページへ）</a>
      </div>
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-2">受講者の声</h2>
        <ul>
          ${reviews
            .map((r) => `<li class='mb-2'><b>${r.name}</b>: ${r.comment}</li>`)
            .join("")}
        </ul>
      </div>
    </section>
  `;
}

// 新しいジェネレーターを使用するようにリダイレクト
import { generateLPHtml as newGenerateLPHtml } from './generators/lpGenerator';

export async function generateLPHtml({
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
}): Promise<string> {
  // 新しいジェネレーターを使用し、インターフェースを合わせる
  return await newGenerateLPHtml({
    title,
    description,
    videoUrl,
    ctaUrl,
    benefits: [description],
    testimonials: reviews,
    model: 'gemini'
  });
}

import { generateAIContent } from '../../utils/aiClient';
import { WEBINAR_TYPES, WRITING_STYLES, AI_CONFIG } from '../../utils/config';

interface WebinarScriptOptions {
  topic: string;
  type: keyof typeof WEBINAR_TYPES;
  style: keyof typeof WRITING_STYLES;
  expertise: string;
  targetAudience: string;
  keyPoints?: string[];
  model?: 'grok' | 'gemini';
}

/**
 * AIを使用してウェビナー台本を生成する
 */
export async function generateWebinarScript({
  topic,
  type = 'standard',
  style = 'professional',
  expertise,
  targetAudience,
  keyPoints = [],
  model = AI_CONFIG.models.primary as 'grok' | 'gemini',
}: WebinarScriptOptions): Promise<string> {
  // ウェビナータイプの情報を取得
  const webinarType = WEBINAR_TYPES[type];
  const writingStyle = WRITING_STYLES[style];
  
  // プロンプトを構築
  const prompt = `
以下の条件でウェビナー台本を作成してください:

テーマ: ${topic}
専門分野: ${expertise}
ターゲット視聴者: ${targetAudience}
ウェビナータイプ: ${webinarType.name}（${webinarType.duration}分）
セクション構成: ${webinarType.sections.join('、')}
文体スタイル: ${writingStyle}

${keyPoints.length > 0 ? `重要ポイント:\n${keyPoints.map(point => `- ${point}`).join('\n')}` : ''}

フォーマット:
1. 各セクションのタイムライン（例: 00:00-02:00 導入）を含めてください
2. 各セクションには具体的な台本内容を含めてください
3. 話し言葉として自然な文体にしてください
4. 視聴者への問いかけを適宜含めてください
5. 専門用語は解説を加えながら使用してください

最も効果的なウェビナー台本を作成し、視聴者を引き込み、記憶に残る内容にしてください。
`;

  try {
    return await generateAIContent({
      model,
      prompt,
      maxTokens: 8000,
      temperature: 0.7
    });
  } catch (error) {
    console.error('ウェビナー台本生成エラー:', error);
    throw new Error('ウェビナー台本の生成に失敗しました');
  }
}
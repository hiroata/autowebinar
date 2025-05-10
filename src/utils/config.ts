// Next.jsでは通常、process.envから直接環境変数を読み込む
// dotenvはサーバーサイドでのみ必要な場合がある

// API設定
export const XAI_API_KEY = process.env.XAI_API_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// API URL設定
export const GROK_API_URL = "https://api.x.ai/v1/chat/completions";
export const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent";

// モデル設定
export const GROK_MODEL = "grok-3-latest";
export const GEMINI_MODEL = "gemini-2.5-pro-preview-03-25";

// AI設定
export const AI_CONFIG = {
  models: {
    primary: process.env.PREFERRED_AI_MODEL || 'gemini',
    available: ['gemini', 'grok', 'openai']
  },
  parameters: {
    temperature: 0.7,
    maxTokens: 4000
  }
};

// ウェビナータイプ設定
export const WEBINAR_TYPES = {
  standard: {
    name: '標準ウェビナー',
    duration: 20, // 分
    sections: ['導入', '本編', 'Q&A', 'クロージング']
  },
  mini: {
    name: 'ミニウェビナー',
    duration: 10,
    sections: ['導入', '本編', 'クロージング']
  },
  premium: {
    name: 'プレミアムウェビナー',
    duration: 45,
    sections: ['導入', '詳細解説', '事例紹介', 'Q&A', '特典紹介', 'クロージング']
  }
};

// 文体スタイル設定
export const WRITING_STYLES = {
  professional: '専門的で信頼感のある文体。業界用語を適切に使い、データに基づいた説明を重視します。',
  casual: 'フレンドリーでカジュアルな文体。親しみやすく、読者との距離感を縮める表現を使います。',
  energetic: '熱量の高い、情熱的な文体。行動を促す力強い表現と、読者の感情に訴えかける表現を使います。',
  storytelling: '物語形式で伝える文体。具体的なストーリーを通して概念を説明し、読者の共感を得ます。',
  academic: '学術的で論理的な文体。根拠を明確に示し、客観的な説明を心がけます。'
};
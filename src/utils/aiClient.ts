import axios from 'axios';

// 環境変数から取得
const XAI_API_KEY = process.env.XAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface AIGenerationOptions {
  model: 'grok' | 'gemini';
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * AIを使用してテキストを生成する
 */
export async function generateAIContent({
  model = 'gemini',
  prompt,
  maxTokens = 4000,
  temperature = 0.7,
}: AIGenerationOptions) {
  try {
    if (model === 'grok') {
      return await generateWithGrok(prompt, maxTokens, temperature);
    } else {
      return await generateWithGemini(prompt, maxTokens, temperature);
    }
  } catch (error) {
    console.error(`AI生成エラー (${model}):`, error);
    throw new Error(`AI生成中にエラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
  }
}

/**
 * Grok (xAI) APIを使用してテキストを生成
 */
async function generateWithGrok(prompt: string, maxTokens: number, temperature: number) {
  const response = await axios.post(
    'https://api.x.ai/v1/chat/completions',
    {
      model: 'grok-3-latest',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: 0.95,
      presence_penalty: 0.5,
      frequency_penalty: 0.3
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`
      }
    }
  );

  return response.data.choices[0].message.content;
}

/**
 * Gemini APIを使用してテキストを生成
 */
async function generateWithGemini(prompt: string, maxTokens: number, temperature: number) {
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent',
    {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: maxTokens,
        temperature: temperature,
        topP: 0.95,
        topK: 40
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GEMINI_API_KEY}`
      }
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}
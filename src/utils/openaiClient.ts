// OpenAI APIラッパー
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callOpenAI({
  prompt,
  model = "gpt-4",
}: {
  prompt: string;
  model?: string;
}) {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return {
      result: response.choices[0].message.content || "",
      status: "success",
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    return {
      result: "",
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

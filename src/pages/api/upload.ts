// 音声/動画/テキストのアップロードAPI
// POST: ファイルやテキスト素材を受け取り、サーバーに保存
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024, // 100MB limit
  });

  return new Promise((resolve) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "ファイルアップロードに失敗しました" });
        return resolve(undefined);
      }

      const fileData = files.file ? files.file[0] : null;
      if (!fileData) {
        res.status(400).json({ error: "ファイルが見つかりません" });
        return resolve(undefined);
      }

      res.status(200).json({
        fileName: fileData.originalFilename,
        filePath: fileData.filepath,
        fileSize: fileData.size,
      });
      return resolve(undefined);
    });
  });
}

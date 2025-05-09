// 音声/動画/テキストのアップロードAPI
// POST: ファイルやテキスト素材を受け取り、サーバーに保存
import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({
    keepExtensions: true,
    maxFileSize: 4 * 1024 * 1024, // 4MB (Vercel等サーバーレス制限)
  });

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: "ファイルアップロードに失敗しました" });
        return resolve(undefined);
      }

      const fileData = files.file ? files.file[0] : null;
      if (!fileData) {
        res.status(400).json({ error: "ファイルが見つかりません" });
        return resolve(undefined);
      }

      try {
        const fileStream = fs.createReadStream(fileData.filepath);
        const s3Key = `${Date.now()}_${fileData.originalFilename}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET!,
            Key: s3Key,
            Body: fileStream,
            ContentType: fileData.mimetype || undefined,
          })
        );
        res.status(200).json({
          fileName: fileData.originalFilename,
          filePath: s3Key,
          fileSize: fileData.size,
        });
      } catch {
        res.status(500).json({ error: "S3へのアップロードに失敗しました" });
      }
      return resolve(undefined);
    });
  });
}

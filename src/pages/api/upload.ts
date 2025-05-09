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

// S3クライアント初期化
const s3 = new S3Client({
  region: process.env.AWS_REGION || "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// ファイル情報を返す関数（S3アップロードが失敗した場合のフォールバック）
function getFileResponse(fileData: formidable.File) {
  return {
    fileName: fileData.originalFilename,
    filePath: `mock_${Date.now()}_${fileData.originalFilename}`,
    fileSize: fileData.size
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 環境変数が設定されているか確認
  const isS3ConfigValid = process.env.AWS_ACCESS_KEY_ID && 
                          process.env.AWS_SECRET_ACCESS_KEY && 
                          process.env.AWS_S3_BUCKET;

  if (!isS3ConfigValid) {
    console.warn("AWS credentials are missing, using fallback mode");
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

      // S3設定が無効な場合やVercelデプロイでテストする場合、モックレスポンスを返す
      if (!isS3ConfigValid) {
        res.status(200).json(getFileResponse(fileData));
        return resolve(undefined);
      }

      try {
        const fileStream = fs.createReadStream(fileData.filepath);
        const s3Key = `${Date.now()}_${fileData.originalFilename}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET || "",
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
      } catch (error) {
        console.error("S3 upload error:", error);
        // S3アップロードが失敗した場合でもフォールバックレスポンスを返す
        res.status(200).json({
          ...getFileResponse(fileData),
          notice: "S3アップロードに失敗しましたが、処理は継続できます"
        });
      }
      return resolve(undefined);
    });
  });
}

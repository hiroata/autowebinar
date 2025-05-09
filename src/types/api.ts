// ファイルアップロードAPIレスポンス型
export type UploadResponse = {
  fileName: string;
  filePath: string;
  fileSize: number;
};

// フィードバックAPIレスポンス型
export type FeedbackResponse =
  | {
      success: boolean;
    }
  | {
      error: string;
    };

import type { InputFormData } from "../types";

export const validateInputForm = (form: InputFormData) => {
  const newErrors: { [key: string]: string } = {};
  if (!form.name) newErrors.name = "名前は必須です";
  if (!form.genre) newErrors.genre = "ジャンルは必須です";
  if (!form.expertise) newErrors.expertise = "専門領域は必須です";
  if (!form.text && !form.audio && !form.video)
    newErrors.text = "テキスト・音声・動画のいずれかは必須です";
  if (form.price <= 0) newErrors.price = "価格は1円以上で入力してください";
  if (form.audio && form.audio.size > 4 * 1024 * 1024)
    newErrors.audio = "音声ファイルは4MB以下にしてください (サーバーレス制限)";
  if (form.video && form.video.size > 4 * 1024 * 1024)
    newErrors.video = "動画ファイルは4MB以下にしてください (サーバーレス制限)";
  return newErrors;
};

// 共通APIクライアント
export async function apiClient<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    let errorMsg = "APIエラー";
    try {
      const data = await res.json();
      errorMsg = data.error || errorMsg;
    } catch (e) {
      // エラー処理を追加
      console.error("Error parsing response JSON", e);
    }
    throw new Error(errorMsg);
  }
  return res.json() as Promise<T>;
}

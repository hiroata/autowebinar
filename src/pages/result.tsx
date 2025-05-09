import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../components/ui/Button";

// SSR無効でコンポーネントをインポート
const LPPreview = dynamic(() => import("../components/preview/LPPreview"), {
  ssr: false,
});
const LoadingSpinner = dynamic(() => import("../components/ui/LoadingSpinner"), {
  ssr: false,
});
const FeedbackForm = dynamic(() => import("../components/feedback/FeedbackForm"), {
  ssr: false,
});

import type { GenerateResult } from "../types";

// 再生成ボタン
const RegenerateButton: React.FC = () => {
  const router = useRouter();

  const handleRegenerate = () => {
    router.push("/");
  };

  return (
    <Button
      onClick={handleRegenerate}
      variant="outline"
    >
      内容を変更して再生成する
    </Button>
  );
};

// ダウンロードボタン
interface DownloadButtonProps {
  onClick: () => void;
  label: string;
  variant?: "primary" | "secondary" | "outline";
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, label, variant = "primary" }) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size="sm"
      className="flex items-center"
    >
      <svg className="mr-1 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </Button>
  );
};

// 結果セクション
interface ResultSectionProps {
  title: string;
  children: React.ReactNode;
  tools?: React.ReactNode;
}

const ResultSection: React.FC<ResultSectionProps> = ({ title, children, tools }) => (
  <div className="rounded-apple border border-apple-gray-200 bg-white shadow-apple overflow-hidden">
    <div className="bg-apple-gray-50 px-6 py-4 border-b border-apple-gray-200 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-apple-gray-500">{title}</h2>
      {tools && <div className="flex space-x-2">{tools}</div>}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

// 生成結果プレビュー画面
const ResultPage: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState<GenerateResult | null>(null);
  const [sessionId] = React.useState(() => Math.random().toString(36).substring(2));

  React.useEffect(() => {
    const data = localStorage.getItem("autowebinar_result");
    if (data) {
      setResult(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  // ダウンロード用関数
  const download = (filename: string, content: string, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>生成結果プレビュー | AIオートウェビナージェネレーター</title>
        <meta name="description" content="AIが生成したウェビナーコンテンツのプレビュー" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-apple-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-apple-gray-500 mb-3">
              生成結果プレビュー
            </h1>
          </header>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" message="プレビューを読み込み中..." />
            </div>
          ) : result ? (
            <div className="space-y-8">
              {/* LPプレビュー */}
              <ResultSection 
                title="ランディングページ" 
                tools={
                  <DownloadButton 
                    onClick={() => download("lp.html", result.lpHtml, "text/html")}
                    label="HTMLをダウンロード"
                  />
                }
              >
                <LPPreview html={result.lpHtml} />
              </ResultSection>

              {/* ウェビナー台本 */}
              <ResultSection 
                title="ウェビナー台本" 
                tools={
                  <DownloadButton 
                    onClick={() => download("webinar-script.txt", result.script)}
                    label="台本をダウンロード"
                    variant="secondary"
                  />
                }
              >
                <pre className="whitespace-pre-wrap bg-apple-gray-50 p-4 rounded-apple text-apple-gray-500 text-sm">
                  {result.script}
                </pre>
              </ResultSection>

              {/* 広告コピー */}
              <ResultSection 
                title="広告コピー" 
                tools={
                  <DownloadButton 
                    onClick={() => download(
                      "ad-copy.txt",
                      result.adCopy.short + "\n\n" + result.adCopy.long
                    )}
                    label="広告文をダウンロード"
                    variant="secondary"
                  />
                }
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-apple-gray-400 mb-2">短文コピー</h3>
                    <div className="bg-apple-gray-50 p-4 rounded-apple">{result.adCopy.short}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-apple-gray-400 mb-2">長文コピー</h3>
                    <div className="bg-apple-gray-50 p-4 rounded-apple">{result.adCopy.long}</div>
                  </div>
                </div>
              </ResultSection>

              {/* 再生成ボタン */}
              <div className="flex justify-center mt-8">
                <RegenerateButton />
              </div>

              {/* フィードバック */}
              <div className="mt-8">
                <FeedbackForm sessionId={sessionId} />
              </div>
            </div>
          ) : (
            <div className="text-center p-10 bg-white rounded-apple shadow-apple text-apple-gray-400">
              生成データがありません。トップページから再度生成をお試しください。
              <div className="mt-4">
                <Button 
                  onClick={() => useRouter().push("/")}
                  variant="primary"
                >
                  トップページへ戻る
                </Button>
              </div>
            </div>
          )}
          
          <footer className="mt-8 text-center text-apple-gray-300 text-sm">
            <p>© {new Date().getFullYear()} AIオートウェビナージェネレーター</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default ResultPage;

import React from "react";
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
      size="md"
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      }
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
      icon={
        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      }
    >
      {label}
    </Button>
  );
};

// 結果セクション
interface ResultSectionProps {
  title: string;
  children: React.ReactNode;
  tools?: React.ReactNode;
  icon?: React.ReactNode;
}

const ResultSection: React.FC<ResultSectionProps> = ({ title, children, tools, icon }) => (
  <div className="rounded shadow-lg border border-neutral-200 bg-white overflow-hidden transition-shadow duration-300 hover:shadow-xl">
    <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary-600">{icon}</div>}
        <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
      </div>
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
  const router = useRouter();

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
      <main className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-neutral-50 py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                生成結果プレビュー
              </span>
            </h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              AIが自動生成したウェビナーコンテンツをプレビューできます。各コンテンツはダウンロードして自由に編集できます。
            </p>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded shadow-md">
              <LoadingSpinner size="lg" text="プレビューを読み込み中..." />
            </div>
          ) : result ? (
            <div className="space-y-8 animate-fade-in">
              {/* LPプレビュー */}
              <ResultSection 
                title="ランディングページ" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                tools={
                  <DownloadButton 
                    onClick={() => download("lp.html", result.lpHtml, "text/html")}
                    label="HTMLをダウンロード"
                  />
                }
              >
                <div className="border border-neutral-200 rounded">
                  <LPPreview html={result.lpHtml} />
                </div>
              </ResultSection>

              {/* ウェビナー台本 */}
              <ResultSection 
                title="ウェビナー台本" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                tools={
                  <DownloadButton 
                    onClick={() => download("webinar-script.txt", result.script)}
                    label="台本をダウンロード"
                    variant="secondary"
                  />
                }
              >
                <pre className="whitespace-pre-wrap bg-neutral-50 p-5 rounded text-neutral-700 text-sm border border-neutral-200 max-h-96 overflow-y-auto">
                  {result.script}
                </pre>
              </ResultSection>

              {/* 広告コピー */}
              <ResultSection 
                title="広告コピー" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                }
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
                    <h3 className="text-md font-semibold text-neutral-700 mb-3">短文コピー</h3>
                    <div className="bg-neutral-50 p-4 rounded border border-neutral-200">{result.adCopy.short}</div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-neutral-700 mb-3">長文コピー</h3>
                    <div className="bg-neutral-50 p-4 rounded border border-neutral-200">{result.adCopy.long}</div>
                  </div>
                </div>
              </ResultSection>

              {/* フィードバック */}
              <div className="mt-12 p-6 bg-white rounded shadow border border-neutral-200">
                <FeedbackForm sessionId={sessionId} />
              </div>

              {/* 再生成ボタン */}
              <div className="flex justify-center mt-10">
                <RegenerateButton />
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded shadow-lg border border-neutral-200 text-neutral-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg mb-6">生成データがありません。トップページから再度生成をお試しください。</p>
              <div>
                <Button 
                  onClick={() => router.push("/")}
                  variant="primary"
                  size="md"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  }
                >
                  トップページへ戻る
                </Button>
              </div>
            </div>
          )}
          
          <footer className="mt-16 text-center text-neutral-500 text-sm">
            <p>© {new Date().getFullYear()} AIオートウェビナージェネレーター</p>
          </footer>
        </div>
      </main>
    </>
  );
};

export default ResultPage;

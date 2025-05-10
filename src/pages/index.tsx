import React, { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useToast } from "../components/ui/Toast";
import Button from "../components/ui/Button";
import Card from "../components/ui/cards/Card";
import Badge from "../components/ui/Badge";

// SSR無効でFormUploaderコンポーネントをインポート
const FormUploader = dynamic(() => import("../components/form/FormUploader"), {
  ssr: false,
});

const HeroIllustration = () => (
  <svg width="320" height="180" viewBox="0 0 320 180" fill="none" className="mx-auto mb-10 animate-float" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="160" cy="150" rx="120" ry="20" fill="#e2e8f0" />
    <rect x="60" y="40" width="200" height="80" rx="16" fill="#fff" className="shadow-lg" />
    <rect x="80" y="60" width="40" height="40" rx="8" fill="#6366f1" fillOpacity="0.15" />
    <rect x="140" y="60" width="40" height="40" rx="8" fill="#14b8a6" fillOpacity="0.15" />
    <rect x="200" y="60" width="40" height="40" rx="8" fill="#f59e0b" fillOpacity="0.15" />
    <circle cx="100" cy="80" r="10" fill="#6366f1" />
    <circle cx="160" cy="80" r="10" fill="#14b8a6" />
    <circle cx="220" cy="80" r="10" fill="#f59e0b" />
  </svg>
);

// トップページ：入力フォームUIを表示
const IndexPage: React.FC = () => {
  const { addToast } = useToast();
  // activeStepはステップ表示のために使用（将来的にマルチステップフォーム実装時にsetActiveStepを使用予定）
  const [activeStep] = useState(1);
  
  // ユーザーにヘルプ情報を表示するための機能
  const showHelp = () => {
    addToast(
      "詳しいヘルプ情報は「よくある質問」セクションをご覧ください。",
      "info",
      5000
    );
  };

  return (
    <>
      <Head>
        <title>AIオートウェビナージェネレーター</title>
        <meta name="description" content="AIを活用したウェビナーコンテンツ生成サービス" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="bg-gradient-to-b from-primary-50 via-white to-neutral-50 min-h-screen dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 font-sans transition-colors">
        <header className="pt-8 pb-6 px-4 bg-white/80 dark:bg-neutral-900/80 shadow-sm backdrop-blur-md">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 tracking-tight drop-shadow-sm">
                  AIオートウェビナー
                </span>
                <Badge className="ml-3" variant="primary">ベータ版</Badge>
              </div>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Button variant="ghost" size="sm" onClick={showHelp} className="hover:text-primary-600 dark:hover:text-primary-400">
                      ヘルプ
                    </Button>
                  </li>
                  <li>
                    <Button variant="primary" size="sm" className="shadow-md hover:scale-105 transition-transform">
                      ログイン
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="py-16 px-4 animate-fade-in">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <HeroIllustration />
              <h1 className="text-5xl md:text-6xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-7 tracking-tight drop-shadow-sm">
                AIの力で<span className="text-primary-600 dark:text-primary-400">ウェビナー作成</span>を効率化
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                簡単な情報入力だけで、プロフェッショナルなウェビナーコンテンツを自動生成。
                素材をアップロードして、AIの力でコンテンツ作成を<span className="text-primary-600 dark:text-primary-400 font-semibold">劇的に効率化</span>しましょう。
              </p>
              <Button variant="primary" size="lg" className="px-10 py-4 text-lg font-bold shadow-lg hover:scale-105 transition-transform">
                今すぐはじめる
              </Button>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card 
                variant="glass" 
                className="mb-14 shadow-2xl animate-slide-up backdrop-blur-lg dark:bg-neutral-900/80"
                padding="lg"
                header={
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">ウェビナーコンテンツ生成</h2>
                    <div className="flex space-x-2">
                      <Badge variant="primary" withDot={activeStep >= 1}>ステップ1</Badge>
                      <Badge variant="secondary" withDot={activeStep >= 2}>ステップ2</Badge>
                      <Badge variant="subtle" withDot={activeStep >= 3}>ステップ3</Badge>
                    </div>
                  </div>
                }
              >
                <FormUploader />
              </Card>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card variant="subtle" className="transition-transform hover:-translate-y-2 hover:shadow-xl duration-200 animate-fade-in dark:bg-neutral-800/80" padding="md">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-neutral-800 dark:text-neutral-100">高速生成</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-base">
                      わずか数分でプロ品質のウェビナーコンテンツを自動生成します
                    </p>
                  </div>
                </Card>
                
                <Card variant="subtle" className="transition-transform hover:-translate-y-2 hover:shadow-xl duration-200 animate-fade-in dark:bg-neutral-800/80" padding="md" style={{ animationDelay: '0.1s' }}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-neutral-800 dark:text-neutral-100">高品質</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-base">
                      最新のAIモデルを活用し、自然で説得力のある内容を生成
                    </p>
                  </div>
                </Card>
                
                <Card variant="subtle" className="transition-transform hover:-translate-y-2 hover:shadow-xl duration-200 animate-fade-in dark:bg-neutral-800/80" padding="md" style={{ animationDelay: '0.2s' }}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-warning/10 dark:bg-accent-warning/20 text-accent-warning rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-neutral-800 dark:text-neutral-100">時間節約</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-base">
                      従来のウェビナー準備と比較して約80%の時間を削減できます
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-12 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="text-primary-600 dark:text-primary-400 font-extrabold text-2xl mb-2">AIオートウェビナー</div>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  © {new Date().getFullYear()} AIオートウェビナージェネレーター
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  プライバシーポリシー
                </a>
                <a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  利用規約
                </a>
                <a href="#" className="text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">
                  お問い合わせ
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default IndexPage;

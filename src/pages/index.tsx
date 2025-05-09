import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// SSR無効でFormUploaderコンポーネントをインポート
const FormUploader = dynamic(() => import("../components/form/FormUploader"), {
  ssr: false,
});

// トップページ：入力フォームUIを表示
const IndexPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>AIオートウェビナージェネレーター</title>
        <meta name="description" content="AIを活用したウェビナーコンテンツ生成サービス" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-apple-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-semibold text-apple-gray-500 mb-3">
              AIオートウェビナージェネレーター
            </h1>
            <p className="text-apple-gray-400 text-lg max-w-2xl mx-auto">
              簡単な情報入力だけで、プロフェッショナルなウェビナーコンテンツを自動生成します。
              素材をアップロードして、AIの力でコンテンツ作成を効率化しましょう。
            </p>
          </header>
          
          <div className="bg-white rounded-apple shadow-apple overflow-hidden">
            <FormUploader />
          </div>
          
          <footer className="mt-8 text-center text-apple-gray-300 text-sm">
            <p>© {new Date().getFullYear()} AIオートウェビナージェネレーター</p>
          </footer>
        </div>
      </main>
    </>
  );
};

// 静的生成（SSG）
export const getStaticProps = async () => ({ props: {} });

export default IndexPage;

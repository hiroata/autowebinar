import React from "react";

interface LPPreviewProps {
  html: string;
  title?: string;
}

const LPPreview: React.FC<LPPreviewProps> = ({ 
  html, 
  title = "LPプレビュー" 
}) => {
  return (
    <div className="border border-apple-gray-200 rounded-apple bg-white shadow-apple overflow-hidden">
      <div className="bg-apple-gray-50 border-b border-apple-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-apple-gray-500">{title}</h2>
      </div>
      <div className="p-6">
        <div 
          className="lp-preview-content" 
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </div>
    </div>
  );
};

export default LPPreview;
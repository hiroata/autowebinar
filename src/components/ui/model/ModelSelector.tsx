import React from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  onChange: (model: string) => void;
  disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel,
  onChange,
  disabled = false
}) => {
  return (
    <div className="mb-6">
      <label className="block text-neutral-700 font-medium mb-2">
        AIモデルを選択
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className={`flex items-center justify-center p-4 rounded border ${
            selectedModel === 'gemini' 
              ? 'border-primary-500 bg-primary-50 text-primary-700' 
              : 'border-neutral-200 bg-white text-neutral-600'
          } transition-colors`}
          onClick={() => onChange('gemini')}
          disabled={disabled}
        >
          <div className="flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 12h3v8h14v-8h3L12 2zM12 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <span className="font-semibold">Google Gemini</span>
            <span className="text-xs mt-1 text-neutral-500">高品質な生成結果</span>
          </div>
        </button>
        
        <button
          type="button"
          className={`flex items-center justify-center p-4 rounded border ${
            selectedModel === 'grok' 
              ? 'border-secondary-500 bg-secondary-50 text-secondary-700' 
              : 'border-neutral-200 bg-white text-neutral-600'
          } transition-colors`}
          onClick={() => onChange('grok')}
          disabled={disabled}
        >
          <div className="flex flex-col items-center text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-10 8H4v-2h7v2zm0-4H4V5h7v2zm0 8H4v-2h7v2zm9-4h-7v-2h7v2zm0-4h-7V5h7v2zm0 8h-7v-2h7v2z"/>
            </svg>
            <span className="font-semibold">xAI Grok</span>
            <span className="text-xs mt-1 text-neutral-500">ユニークな創造性</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModelSelector;
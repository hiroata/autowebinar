// ベースプロパティ
export interface BaseProps {
  className?: string;
  id?: string;
}

// 入力フォームデータ型
export type InputFormData = {
  name: string;
  genre: string;
  expertise: string;
  text: string;
  audio: File | null;
  video: File | null;
  price: number;
  salesPeriod: "limited" | "evergreen";
};

// 生成APIレスポンス型
export type GenerateResult = {
  lpHtml: string;
  script: string;
  adCopy: {
    short: string;
    long: string;
  };
};

// UIコンポーネント型
export interface ButtonProps extends BaseProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export interface InputProps extends BaseProps {
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}

// フィードバック型
export interface FeedbackData {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  email?: string;
  sessionId: string;
}

// API応答共通型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ユーザ設定型
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  autoSubmit: boolean;
  notifications: boolean;
}

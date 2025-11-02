import React from 'react';
import Link from 'next/link';

// ボタンの見た目を切り替えるための型定義
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string; // リンクとして使うためのhref
}

export default function Button({ children, variant = 'secondary', href, ...props }: ButtonProps) {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm";

  // variantごとのスタイル定義
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 shadow-none',
  };

  const className = `${baseClasses} ${variantClasses[variant]} ${props.className || ''}`;
  // hrefが渡された場合はLinkコンポーネントとして、そうでなければbuttonとしてレンダリング
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
}
'use client';

// import Link from 'next/link'; // 不要になるので削除
import { usePathname } from 'next/navigation';
import { CalendarIcon } from '@/components/icons';
import Button from './Button'; // Buttonコンポーネントをインポート

export default function Header() {
  const pathname = usePathname();
  const isUsagePage = pathname === '/usage';

  return (
    <header className="p-4 border-b bg-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="text-blue-500 w-8 h-8" />
          <h1 className="text-xl font-semibold ml-3">
            {isUsagePage ? '使い方ガイド' : 'カレンダーイベント管理'}
          </h1>
        </div>
        {isUsagePage ? (
          <Button href="/" variant="secondary">
            アプリに戻る
          </Button>
        ) : (
          <Button href="/usage" variant="secondary">
            使い方
          </Button>
        )}
      </div>
    </header>
  );
}
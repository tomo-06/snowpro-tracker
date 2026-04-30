// ヘッダーコンポーネント
// アプリタイトルとナビゲーションを表示する

import React from 'react';
import { PageType } from '../../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

// ナビゲーション項目の定義
const NAV_ITEMS: { page: PageType; label: string; icon: string }[] = [
  { page: 'dashboard', label: 'ダッシュボード', icon: '📊' },
  { page: 'topics', label: 'トピック一覧', icon: '📚' },
  { page: 'settings', label: '設定', icon: '⚙️' },
];

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        {/* アプリタイトルとロゴ行 */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              SnowPro Core 学習トラッカー
            </span>
          </div>
        </div>

        {/* ナビゲーション */}
        <nav className="flex border-t border-blue-600">
          {NAV_ITEMS.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`
                flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium
                transition-colors duration-150
                ${
                  currentPage === page
                    ? 'bg-white text-blue-700 border-b-2 border-white'
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }
              `}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

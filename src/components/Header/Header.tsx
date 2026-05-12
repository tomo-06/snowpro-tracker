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
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        {/* アプリタイトルとロゴ行 */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* Snowflakeロゴ風アイコン */}
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-lg leading-none">❄</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight block leading-tight">
                SnowPro Core 学習トラッカー
              </span>
              <span className="text-xs text-blue-200 leading-tight">
                Snowflake認定試験 学習管理アプリ
              </span>
            </div>
          </div>
        </div>

        {/* ナビゲーション */}
        <nav className="flex border-t border-blue-700/50">
          {NAV_ITEMS.map(({ page, label, icon }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`
                flex items-center gap-1.5 px-5 py-3 text-sm font-medium
                transition-all duration-150
                ${
                  currentPage === page
                    ? 'bg-white text-blue-700 shadow-sm -mb-px border-t-2 border-blue-300'
                    : 'text-blue-100 hover:bg-blue-700/50 hover:text-white'
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

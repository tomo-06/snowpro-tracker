// 全体進捗バーコンポーネント
// 全トピックの理解済み割合を大きなプログレスバーで表示する

import React from 'react';

interface OverallProgressBarProps {
  rate: number;      // 進捗率（0〜100）
  completed: number; // 理解済みトピック数
  total: number;     // 全トピック数
}

const OverallProgressBar: React.FC<OverallProgressBarProps> = ({ rate, completed, total }) => {
  // 進捗率に応じてカラーを変更（低い段階はメインの青系で統一感を持たせる）
  const getBarColor = (): string => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 50) return 'bg-blue-500';
    if (rate >= 20) return 'bg-blue-400';
    return 'bg-blue-300';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-700">全体進捗</h2>
        {/* 完了トピック数バッジ */}
        <span className="text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full border border-blue-100">
          {completed} / {total} トピック理解済み
        </span>
      </div>

      {/* 進捗率の大きな数字表示 */}
      <div className="flex items-end gap-2 mb-4">
        <span className="text-6xl font-bold text-blue-700 leading-none">{rate}</span>
        <span className="text-2xl font-semibold text-blue-400 mb-1">%</span>
        <span className="text-sm text-gray-400 mb-2 ml-1">完了</span>
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-700 ease-out ${getBarColor()}`}
          style={{ width: `${rate}%` }}
        />
      </div>

      {/* 進捗段階のラベル */}
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-400">0%</span>
        <span className="text-xs text-gray-400">50%</span>
        <span className="text-xs text-gray-400">100%</span>
      </div>
    </div>
  );
};

export default OverallProgressBar;

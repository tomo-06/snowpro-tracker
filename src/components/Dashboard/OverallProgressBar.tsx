// 全体進捗バーコンポーネント
// 全トピックの理解済み割合を大きなプログレスバーで表示する

import React from 'react';

interface OverallProgressBarProps {
  rate: number;      // 進捗率（0〜100）
  completed: number; // 理解済みトピック数
  total: number;     // 全トピック数
}

const OverallProgressBar: React.FC<OverallProgressBarProps> = ({ rate, completed, total }) => {
  // 進捗率に応じてカラーを変更
  const getBarColor = (): string => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 50) return 'bg-blue-500';
    if (rate >= 20) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">全体進捗</h2>

      {/* 進捗率の大きな数字表示 */}
      <div className="flex items-end gap-3 mb-3">
        <span className="text-5xl font-bold text-gray-800">{rate}</span>
        <span className="text-2xl font-semibold text-gray-500 mb-1">%</span>
        <span className="text-sm text-gray-500 mb-2 ml-1">
          （{completed} / {total} トピック理解済み）
        </span>
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
        <div
          className={`h-5 rounded-full transition-all duration-500 ${getBarColor()}`}
          style={{ width: `${rate}%` }}
        />
      </div>
    </div>
  );
};

export default OverallProgressBar;

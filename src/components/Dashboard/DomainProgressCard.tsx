// 分野別進捗カードコンポーネント
// 1ドメインの進捗をミニプログレスバー付きで表示する

import React from 'react';
import { DomainProgress } from '../../types';

interface DomainProgressCardProps {
  progress: DomainProgress;
}

const DomainProgressCard: React.FC<DomainProgressCardProps> = ({ progress }) => {
  const { domain, progressRate, completedCount, totalCount, inProgressCount } = progress;

  // 進捗率に応じたバーの色
  const getBarColor = (): string => {
    if (progressRate >= 80) return 'bg-green-500';
    if (progressRate >= 50) return 'bg-blue-500';
    if (progressRate >= 20) return 'bg-yellow-400';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow duration-150">
      {/* ドメイン名と出題割合 */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug flex-1 pr-2">
          {domain.name}
        </h3>
        <span className="text-xs text-gray-500 font-medium whitespace-nowrap bg-gray-100 px-1.5 py-0.5 rounded">
          {domain.weight}%
        </span>
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getBarColor()}`}
          style={{ width: `${progressRate}%` }}
        />
      </div>

      {/* 数値サマリー */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          <span className="font-semibold text-gray-700">{progressRate}%</span> 完了
        </span>
        <span>
          {completedCount}/{totalCount}
          {inProgressCount > 0 && (
            <span className="ml-1 text-yellow-600">（学習中 {inProgressCount}）</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default DomainProgressCard;

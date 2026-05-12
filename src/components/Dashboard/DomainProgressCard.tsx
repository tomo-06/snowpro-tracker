// 分野別進捗カードコンポーネント
// 1ドメインの進捗をミニプログレスバー付きで表示する

import React from 'react';
import { DomainProgress } from '../../types';

interface DomainProgressCardProps {
  progress: DomainProgress;
}

const DomainProgressCard: React.FC<DomainProgressCardProps> = ({ progress }) => {
  const { domain, progressRate, completedCount, totalCount, inProgressCount } = progress;

  // 進捗率に応じたバーの色（青系テーマで統一）
  const getBarColor = (): string => {
    if (progressRate >= 80) return 'bg-emerald-500';
    if (progressRate >= 50) return 'bg-blue-500';
    if (progressRate >= 20) return 'bg-blue-400';
    return 'bg-blue-200';
  };

  // 進捗率に応じたテキスト色
  const getRateColor = (): string => {
    if (progressRate >= 80) return 'text-emerald-600';
    if (progressRate >= 50) return 'text-blue-600';
    if (progressRate >= 20) return 'text-blue-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-100 transition-all duration-200">
      {/* ドメイン名と出題割合 */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-800 leading-snug flex-1 pr-2">
          {domain.name}
        </h3>
        <span className="text-xs text-blue-600 font-semibold whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
          出題 {domain.weight}%
        </span>
      </div>

      {/* プログレスバー */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ease-out ${getBarColor()}`}
          style={{ width: `${progressRate}%` }}
        />
      </div>

      {/* 数値サマリー */}
      <div className="flex items-center justify-between">
        <span className={`text-lg font-bold ${getRateColor()}`}>
          {progressRate}%
        </span>
        <div className="text-xs text-gray-500 text-right">
          <span className="font-semibold text-gray-700">{completedCount}</span>
          <span>/{totalCount} 完了</span>
          {inProgressCount > 0 && (
            <span className="ml-1.5 text-amber-600 font-medium">
              ({inProgressCount} 学習中)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainProgressCard;

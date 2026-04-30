// ステータスサマリーコンポーネント
// 未学習/学習中/理解済みの件数をカード表示する

import React from 'react';
import { DashboardStats } from '../../types';

interface StatusSummaryProps {
  stats: DashboardStats;
}

const StatusSummary: React.FC<StatusSummaryProps> = ({ stats }) => {
  // ステータス別のカード設定
  const cards = [
    {
      label: '未学習',
      count: stats.notStartedTopics,
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-700',
      countColor: 'text-gray-800',
      icon: '📋',
    },
    {
      label: '学習中',
      count: stats.inProgressTopics,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      textColor: 'text-yellow-700',
      countColor: 'text-yellow-800',
      icon: '📖',
    },
    {
      label: '理解済み',
      count: stats.completedTopics,
      bg: 'bg-green-50',
      border: 'border-green-200',
      textColor: 'text-green-700',
      countColor: 'text-green-800',
      icon: '✅',
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">ステータス別トピック数</h2>
      <div className="grid grid-cols-3 gap-3">
        {cards.map(({ label, count, bg, border, textColor, countColor, icon }) => (
          <div
            key={label}
            className={`rounded-xl border ${border} ${bg} px-4 py-4 text-center`}
          >
            <div className="text-xl mb-1">{icon}</div>
            <div className={`text-3xl font-bold ${countColor}`}>{count}</div>
            <div className={`text-xs font-medium mt-1 ${textColor}`}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSummary;

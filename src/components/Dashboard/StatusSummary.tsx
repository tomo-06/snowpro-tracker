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
      bg: 'bg-slate-50',
      border: 'border-slate-200',
      textColor: 'text-slate-600',
      countColor: 'text-slate-700',
      icon: '📋',
      iconBg: 'bg-slate-100',
    },
    {
      label: '学習中',
      count: stats.inProgressTopics,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      textColor: 'text-amber-700',
      countColor: 'text-amber-800',
      icon: '📖',
      iconBg: 'bg-amber-100',
    },
    {
      label: '理解済み',
      count: stats.completedTopics,
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      textColor: 'text-emerald-700',
      countColor: 'text-emerald-800',
      icon: '✅',
      iconBg: 'bg-emerald-100',
    },
  ];

  return (
    <div>
      <h2 className="text-base font-bold text-gray-700 mb-3">ステータス別トピック数</h2>
      <div className="grid grid-cols-3 gap-3">
        {cards.map(({ label, count, bg, border, textColor, countColor, icon, iconBg }) => (
          <div
            key={label}
            className={`rounded-2xl border ${border} ${bg} px-4 py-5 text-center shadow-sm`}
          >
            {/* アイコンバッジ */}
            <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <span className="text-lg">{icon}</span>
            </div>
            <div className={`text-4xl font-bold ${countColor}`}>{count}</div>
            <div className={`text-xs font-semibold mt-1.5 ${textColor}`}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSummary;

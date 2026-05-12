// ステータスバッジコンポーネント
// 理解度ステータスを色付きバッジで表示する

import React from 'react';
import { StudyStatus } from '../../types';

interface StatusBadgeProps {
  status: StudyStatus;
  size?: 'sm' | 'md';
}

// ステータスの表示設定（ラベル・スタイル）
const STATUS_CONFIG: Record<StudyStatus, { label: string; classes: string }> = {
  not_started: {
    label: '未学習',
    classes: 'bg-slate-100 text-slate-600 border border-slate-300',
  },
  in_progress: {
    label: '学習中',
    classes: 'bg-amber-100 text-amber-700 border border-amber-300',
  },
  completed: {
    label: '理解済み',
    classes: 'bg-emerald-100 text-emerald-700 border border-emerald-300',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'sm' }) => {
  const config = STATUS_CONFIG[status];
  const sizeClass = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizeClass} ${config.classes}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;

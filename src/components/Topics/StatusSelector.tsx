// ステータス選択コンポーネント
// 3択ボタンで理解度ステータスを切り替える

import React from 'react';
import { StudyStatus } from '../../types';

interface StatusSelectorProps {
  value: StudyStatus;
  onChange: (status: StudyStatus) => void;
}

// ステータスボタンの定義（デザインテーマに合わせたカラー設定）
const STATUS_OPTIONS: { value: StudyStatus; label: string; active: string; inactive: string }[] = [
  {
    value: 'not_started',
    label: '未学習',
    active: 'bg-slate-600 text-white border-slate-600',
    inactive: 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50',
  },
  {
    value: 'in_progress',
    label: '学習中',
    active: 'bg-amber-500 text-white border-amber-500',
    inactive: 'bg-white text-amber-600 border-amber-300 hover:bg-amber-50',
  },
  {
    value: 'completed',
    label: '理解済み',
    active: 'bg-emerald-600 text-white border-emerald-600',
    inactive: 'bg-white text-emerald-600 border-emerald-300 hover:bg-emerald-50',
  },
];

const StatusSelector: React.FC<StatusSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex rounded-xl overflow-hidden border border-gray-200 shadow-sm" role="group">
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            flex-1 px-3 py-2.5 text-sm font-semibold border-r last:border-r-0 transition-colors duration-150
            ${value === option.value ? option.active : option.inactive}
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default StatusSelector;

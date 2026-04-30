// ステータス選択コンポーネント
// 3択ボタンで理解度ステータスを切り替える

import React from 'react';
import { StudyStatus } from '../../types';

interface StatusSelectorProps {
  value: StudyStatus;
  onChange: (status: StudyStatus) => void;
}

// ステータスボタンの定義
const STATUS_OPTIONS: { value: StudyStatus; label: string; active: string; inactive: string }[] = [
  {
    value: 'not_started',
    label: '未学習',
    active: 'bg-gray-600 text-white border-gray-600',
    inactive: 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50',
  },
  {
    value: 'in_progress',
    label: '学習中',
    active: 'bg-yellow-500 text-white border-yellow-500',
    inactive: 'bg-white text-yellow-600 border-yellow-300 hover:bg-yellow-50',
  },
  {
    value: 'completed',
    label: '理解済み',
    active: 'bg-green-600 text-white border-green-600',
    inactive: 'bg-white text-green-600 border-green-300 hover:bg-green-50',
  },
];

const StatusSelector: React.FC<StatusSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200" role="group">
      {STATUS_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            flex-1 px-3 py-2 text-sm font-medium border-r last:border-r-0 transition-colors duration-150
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

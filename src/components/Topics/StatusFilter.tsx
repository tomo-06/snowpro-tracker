// ステータスフィルターコンポーネント
// トピック一覧の理解度ステータス絞り込みフィルターを表示する

import React from 'react';
import { StudyStatus } from '../../types';

interface StatusFilterProps {
  selectedStatus: StudyStatus | null; // null = 全ステータス表示
  onChange: (status: StudyStatus | null) => void;
}

// フィルターボタンの定義
const STATUS_OPTIONS: { value: StudyStatus | null; label: string; activeClass: string }[] = [
  { value: null, label: '全て', activeClass: 'bg-blue-600 text-white' },
  { value: 'not_started', label: '未学習', activeClass: 'bg-gray-600 text-white' },
  { value: 'in_progress', label: '学習中', activeClass: 'bg-yellow-500 text-white' },
  { value: 'completed', label: '理解済み', activeClass: 'bg-green-600 text-white' },
];

const StatusFilter: React.FC<StatusFilterProps> = ({ selectedStatus, onChange }) => {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">
        ステータスで絞り込み
      </label>
      <div className="flex gap-1.5">
        {STATUS_OPTIONS.map(({ value, label, activeClass }) => (
          <button
            key={value ?? 'all'}
            onClick={() => onChange(value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedStatus === value
                ? activeClass
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;

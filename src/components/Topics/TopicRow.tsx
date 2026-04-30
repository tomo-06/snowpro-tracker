// トピック行コンポーネント
// 1トピックの情報とクイックステータス変更・詳細ボタンを表示する

import React from 'react';
import { Topic, StudyStatus } from '../../types';
import StatusBadge from './StatusBadge';

interface TopicRowProps {
  topic: Topic;
  onStatusChange: (topicId: string, newStatus: StudyStatus) => void;
  onOpenDetail: (topic: Topic) => void;
}

// 日付をコンパクトな形式でフォーマットする
const formatDate = (isoString: string | null): string => {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleDateString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return '—';
  }
};

// ステータスを次の状態に切り替える順序
const STATUS_CYCLE: Record<StudyStatus, StudyStatus> = {
  not_started: 'in_progress',
  in_progress: 'completed',
  completed: 'not_started',
};

const TopicRow: React.FC<TopicRowProps> = ({ topic, onStatusChange, onOpenDetail }) => {
  // ワンクリックでステータスを循環させる
  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextStatus = STATUS_CYCLE[topic.status];
    onStatusChange(topic.id, nextStatus);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0">
      {/* トピック名（主要情報） */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-800 truncate">{topic.name}</span>
          {/* メモがある場合のアイコン */}
          {topic.memo && (
            <span
              title="メモあり"
              className="flex-shrink-0 text-blue-400 text-xs"
              aria-label="メモあり"
            >
              📝
            </span>
          )}
        </div>
      </div>

      {/* 最終学習日（モバイルでは非表示） */}
      <div className="hidden sm:block w-16 text-xs text-gray-400 text-center flex-shrink-0">
        {formatDate(topic.lastStudiedAt)}
      </div>

      {/* ステータスバッジ（クリックで切り替え） */}
      <button
        onClick={handleStatusClick}
        title="クリックでステータスを切り替え"
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
      >
        <StatusBadge status={topic.status} />
      </button>

      {/* 詳細ボタン */}
      <button
        onClick={() => onOpenDetail(topic)}
        className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
      >
        詳細
      </button>
    </div>
  );
};

export default TopicRow;

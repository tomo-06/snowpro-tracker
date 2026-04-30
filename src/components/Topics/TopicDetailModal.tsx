// トピック詳細モーダルコンポーネント
// トピックの詳細表示・ステータス変更・メモ編集を行うモーダル

import React, { useState, useEffect, useCallback } from 'react';
import { Topic, StudyStatus } from '../../types';
import StatusSelector from './StatusSelector';
import MemoEditor from './MemoEditor';

interface TopicDetailModalProps {
  topic: Topic;
  onSave: (updatedTopic: Topic) => void;
  onClose: () => void;
}

// 日時を読みやすい形式にフォーマットする
const formatDateTime = (isoString: string | null): string => {
  if (!isoString) return '未学習';
  try {
    return new Date(isoString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '不明';
  }
};

const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, onSave, onClose }) => {
  // 編集用の一時状態（保存前の変更を管理）
  const [editedStatus, setEditedStatus] = useState<StudyStatus>(topic.status);
  const [editedMemo, setEditedMemo] = useState<string>(topic.memo);

  // Escキーでモーダルを閉じる
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 変更を保存する
  const handleSave = () => {
    // ステータス変更に応じてlastStudiedAtを更新
    let newLastStudiedAt = topic.lastStudiedAt;
    if (editedStatus !== topic.status) {
      if (editedStatus === 'not_started') {
        // 未学習に戻したらリセット
        newLastStudiedAt = null;
      } else {
        // not_started以外に変更したら現在時刻を記録
        newLastStudiedAt = new Date().toISOString();
      }
    }

    const updatedTopic: Topic = {
      ...topic,
      status: editedStatus,
      memo: editedMemo,
      lastStudiedAt: newLastStudiedAt,
    };
    onSave(updatedTopic);
    onClose();
  };

  // 変更があるか確認
  const hasChanges = editedStatus !== topic.status || editedMemo !== topic.memo;

  return (
    // オーバーレイ（外クリックで閉じる）
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* モーダルヘッダー */}
        <div className="flex items-start justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 pr-4">{topic.name}</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="閉じる"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* モーダルコンテンツ */}
        <div className="p-5 space-y-5">
          {/* トピック説明 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              出題観点
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
              {topic.description}
            </p>
          </div>

          {/* ステータス選択 */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              理解度ステータス
            </h3>
            <StatusSelector value={editedStatus} onChange={setEditedStatus} />
          </div>

          {/* メモ編集 */}
          <MemoEditor value={editedMemo} onChange={setEditedMemo} />

          {/* 最終学習日時 */}
          <div className="text-xs text-gray-400">
            最終学習日時: {formatDateTime(topic.lastStudiedAt)}
          </div>
        </div>

        {/* フッター（アクションボタン） */}
        <div className="flex gap-2 p-5 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              hasChanges
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailModal;

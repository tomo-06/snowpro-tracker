// 直近学習トピックコンポーネント
// lastStudiedAt降順で上位5件のトピックを表示する

import React from 'react';
import { Topic } from '../../types';

interface RecentStudiedTopicsProps {
  topics: Topic[];
}

// 日時を読みやすい形式にフォーマットする
const formatDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toLocaleString('ja-JP', {
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

const RecentStudiedTopics: React.FC<RecentStudiedTopicsProps> = ({ topics }) => {
  // 学習済みトピックが存在しない場合
  if (topics.length === 0) {
    return (
      <div>
        <h2 className="text-base font-bold text-gray-700 mb-3">直近の学習トピック</h2>
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
          <div className="text-3xl mb-2">📚</div>
          <p className="text-gray-400 text-sm">まだ学習記録がありません。</p>
          <p className="text-gray-400 text-xs mt-1">トピック一覧からステータスを変更してください。</p>
        </div>
      </div>
    );
  }

  // ステータスに応じたスタイルを返す
  const getStatusStyle = (status: Topic['status']): { label: string; classes: string } => {
    if (status === 'completed') {
      return { label: '理解済み', classes: 'bg-emerald-100 text-emerald-700' };
    }
    return { label: '学習中', classes: 'bg-amber-100 text-amber-700' };
  };

  return (
    <div>
      <h2 className="text-base font-bold text-gray-700 mb-3">直近の学習トピック</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-50">
          {topics.map((topic, index) => {
            const statusStyle = getStatusStyle(topic.status);
            return (
              <li key={topic.id} className="px-5 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                {/* 順位バッジ */}
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">
                  {index + 1}
                </span>

                {/* トピック情報 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{topic.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    最終学習: {topic.lastStudiedAt ? formatDate(topic.lastStudiedAt) : '不明'}
                  </p>
                </div>

                {/* ステータスバッジ */}
                <span className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${statusStyle.classes}`}>
                  {statusStyle.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RecentStudiedTopics;

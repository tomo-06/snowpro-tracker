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
        <h2 className="text-lg font-semibold text-gray-700 mb-3">直近の学習トピック</h2>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center text-gray-400 text-sm">
          まだ学習記録がありません。トピック一覧からステータスを変更してください。
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">直近の学習トピック</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-50">
          {topics.map((topic, index) => (
            <li key={topic.id} className="px-4 py-3 flex items-start gap-3 hover:bg-gray-50">
              {/* 順位バッジ */}
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>

              {/* トピック情報 */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{topic.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  最終学習: {topic.lastStudiedAt ? formatDate(topic.lastStudiedAt) : '不明'}
                </p>
              </div>

              {/* ステータスバッジ */}
              <span
                className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                  topic.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {topic.status === 'completed' ? '理解済み' : '学習中'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentStudiedTopics;

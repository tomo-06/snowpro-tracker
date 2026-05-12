// ドメインセクションコンポーネント
// 1ドメイン分のトピック一覧を折りたたみ可能なセクションで表示する

import React, { useState } from 'react';
import { Domain, Topic, StudyStatus } from '../../types';
import TopicRow from './TopicRow';

interface DomainSectionProps {
  domain: Domain;
  topics: Topic[];
  // フィルター前の全トピック（進捗率計算に使用）
  allTopics: Topic[];
  onStatusChange: (topicId: string, newStatus: StudyStatus) => void;
  onOpenDetail: (topic: Topic) => void;
}

const DomainSection: React.FC<DomainSectionProps> = ({
  domain,
  topics,
  allTopics,
  onStatusChange,
  onOpenDetail,
}) => {
  // セクションの折りたたみ状態（デフォルトは展開）
  const [isExpanded, setIsExpanded] = useState(true);

  // ドメインの進捗率はフィルター前の全トピックで計算する
  const completedCount = allTopics.filter((t) => t.status === 'completed').length;
  const progressRate =
    allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : 0;

  // 進捗率に応じたバー色
  const getBarColor = (): string => {
    if (progressRate >= 80) return 'bg-emerald-500';
    if (progressRate >= 50) return 'bg-blue-500';
    if (progressRate >= 20) return 'bg-blue-400';
    return 'bg-gray-300';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* ドメインヘッダー（クリックで折りたたみ） */}
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
      >
        {/* 折りたたみアイコン */}
        <span
          className={`flex-shrink-0 text-blue-400 transition-transform duration-200 ${
            isExpanded ? 'rotate-90' : 'rotate-0'
          }`}
        >
          ▶
        </span>

        {/* ドメイン名と出題割合 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-800">{domain.name}</h2>
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold border border-blue-100">
              {domain.weight}%
            </span>
          </div>
        </div>

        {/* 進捗情報 */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* ミニプログレスバー（モバイルでは非表示） */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-28 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${getBarColor()}`}
                style={{ width: `${progressRate}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-gray-600 w-10 text-right">{progressRate}%</span>
          </div>
          <span className="text-xs text-gray-400">
            {completedCount}/{allTopics.length}
          </span>
        </div>
      </button>

      {/* トピック一覧（折りたたみ時は非表示） */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* 列ヘッダー */}
          <div className="flex items-center gap-3 px-5 py-2 bg-slate-50 border-b border-gray-100">
            <div className="flex-1 text-xs text-gray-400 font-medium">トピック名</div>
            <div className="hidden sm:block w-16 text-xs text-gray-400 text-center">最終学習</div>
            <div className="w-20 text-xs text-gray-400 text-center">ステータス</div>
            <div className="w-12"></div>
          </div>

          {topics.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">
              このドメインにはトピックがありません
            </div>
          ) : (
            topics.map((topic) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                onStatusChange={onStatusChange}
                onOpenDetail={onOpenDetail}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DomainSection;

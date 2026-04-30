// トピック一覧画面コンポーネント
// ドメイン・ステータスフィルター付きのトピック一覧と詳細モーダルを管理する

import React, { useState, useCallback } from 'react';
import { AppData, Topic, StudyStatus, Domain } from '../../types';
import DomainFilter from './DomainFilter';
import StatusFilter from './StatusFilter';
import DomainSection from './DomainSection';
import TopicDetailModal from './TopicDetailModal';

interface TopicsPageProps {
  appData: AppData;
  onUpdateTopic: (updatedTopic: Topic) => void;
}

const TopicsPage: React.FC<TopicsPageProps> = ({ appData, onUpdateTopic }) => {
  // フィルター状態
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<StudyStatus | null>(null);
  // 詳細モーダルで表示するトピック
  const [modalTopic, setModalTopic] = useState<Topic | null>(null);

  // ワンクリックステータス変更の処理
  const handleStatusChange = useCallback(
    (topicId: string, newStatus: StudyStatus) => {
      const topic = appData.topics.find((t) => t.id === topicId);
      if (!topic) return;

      // lastStudiedAtの更新ロジック
      const newLastStudiedAt =
        newStatus === 'not_started' ? null : new Date().toISOString();

      onUpdateTopic({
        ...topic,
        status: newStatus,
        lastStudiedAt: newLastStudiedAt,
      });
    },
    [appData.topics, onUpdateTopic]
  );

  // 詳細モーダルを開く
  const handleOpenDetail = useCallback((topic: Topic) => {
    setModalTopic(topic);
  }, []);

  // 詳細モーダルで保存
  const handleSaveTopic = useCallback(
    (updatedTopic: Topic) => {
      onUpdateTopic(updatedTopic);
    },
    [onUpdateTopic]
  );

  // フィルタリングされたドメインを取得（表示順でソート）
  const filteredDomains: Domain[] = [...appData.domains]
    .sort((a, b) => a.order - b.order)
    .filter((d) => selectedDomainId === null || d.id === selectedDomainId);

  // 各ドメインに紐付くフィルタリング済みトピックを取得
  const getFilteredTopicsForDomain = (domainId: string): Topic[] => {
    return appData.topics.filter((t) => {
      if (t.domainId !== domainId) return false;
      if (selectedStatus !== null && t.status !== selectedStatus) return false;
      return true;
    });
  };

  // フィルター適用後の総トピック数
  const totalFilteredCount = filteredDomains.reduce(
    (sum, d) => sum + getFilteredTopicsForDomain(d.id).length,
    0
  );

  return (
    <div className="space-y-5">
      {/* ページタイトル */}
      <h1 className="text-2xl font-bold text-gray-800">トピック一覧</h1>

      {/* フィルターパネル */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
        <DomainFilter
          domains={appData.domains}
          selectedDomainId={selectedDomainId}
          onChange={setSelectedDomainId}
        />
        <StatusFilter selectedStatus={selectedStatus} onChange={setSelectedStatus} />
      </div>

      {/* フィルター結果の件数表示 */}
      <p className="text-sm text-gray-500">
        {totalFilteredCount} 件のトピックが表示されています
      </p>

      {/* ドメインセクション一覧 */}
      <div className="space-y-3">
        {filteredDomains.map((domain) => {
          const topics = getFilteredTopicsForDomain(domain.id);
          // フィルター前の全トピック（進捗率計算用）
          const allTopics = appData.topics.filter((t) => t.domainId === domain.id);
          return (
            <DomainSection
              key={domain.id}
              domain={domain}
              topics={topics}
              allTopics={allTopics}
              onStatusChange={handleStatusChange}
              onOpenDetail={handleOpenDetail}
            />
          );
        })}
      </div>

      {/* トピック詳細モーダル（keyでトピック変更時に確実に再マウント） */}
      {modalTopic && (
        <TopicDetailModal
          key={modalTopic.id}
          topic={modalTopic}
          onSave={handleSaveTopic}
          onClose={() => setModalTopic(null)}
        />
      )}
    </div>
  );
};

export default TopicsPage;

// ダッシュボード画面コンポーネント
// 全体進捗・ステータスサマリー・分野別進捗・直近学習トピックを表示する

import React from 'react';
import { DashboardStats } from '../../types';
import OverallProgressBar from './OverallProgressBar';
import ExamCountdown from './ExamCountdown';
import StatusSummary from './StatusSummary';
import DomainProgressList from './DomainProgressList';
import RecentStudiedTopics from './RecentStudiedTopics';

interface DashboardPageProps {
  stats: DashboardStats;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ stats }) => {
  return (
    <div className="space-y-6">
      {/* ページタイトル */}
      <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>

      {/* 試験日カウントダウン（試験日設定済みの場合のみ表示） */}
      {stats.daysUntilExam !== null && (
        <ExamCountdown daysUntilExam={stats.daysUntilExam} />
      )}

      {/* 全体進捗バー */}
      <OverallProgressBar
        rate={stats.overallProgressRate}
        completed={stats.completedTopics}
        total={stats.totalTopics}
      />

      {/* ステータス別件数サマリー */}
      <StatusSummary stats={stats} />

      {/* 分野別進捗カード一覧 */}
      <DomainProgressList domainProgresses={stats.domainProgresses} />

      {/* 直近学習トピック */}
      <RecentStudiedTopics topics={stats.recentStudiedTopics} />
    </div>
  );
};

export default DashboardPage;

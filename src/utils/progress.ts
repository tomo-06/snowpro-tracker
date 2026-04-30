// 進捗率計算ユーティリティ
// ドメインおよび全体の進捗集計ロジック

import { AppData, Domain, DomainProgress, DashboardStats, Topic } from '../types';

// 特定ドメインの進捗情報を計算する
export const calcDomainProgress = (domain: Domain, topics: Topic[]): DomainProgress => {
  const domainTopics = topics.filter((t) => t.domainId === domain.id);
  const totalCount = domainTopics.length;
  const completedCount = domainTopics.filter((t) => t.status === 'completed').length;
  const inProgressCount = domainTopics.filter((t) => t.status === 'in_progress').length;
  const notStartedCount = domainTopics.filter((t) => t.status === 'not_started').length;
  // 進捗率（小数1桁まで、0件の場合は0）
  const progressRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 1000) / 10 : 0;

  return {
    domain,
    topics: domainTopics,
    totalCount,
    completedCount,
    inProgressCount,
    notStartedCount,
    progressRate,
  };
};

// 全体および分野別の進捗統計を計算する
export const calcDashboardStats = (appData: AppData): DashboardStats => {
  const { domains, topics, settings } = appData;

  // 全体カウント集計
  const totalTopics = topics.length;
  const completedTopics = topics.filter((t) => t.status === 'completed').length;
  const inProgressTopics = topics.filter((t) => t.status === 'in_progress').length;
  const notStartedTopics = topics.filter((t) => t.status === 'not_started').length;

  // 全体進捗率（小数1桁まで）
  const overallProgressRate =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 1000) / 10 : 0;

  // 試験日までの残り日数を計算
  const daysUntilExam = calcDaysUntilExam(settings.examDate);

  // ドメインごとの進捗集計（表示順でソート）
  const sortedDomains = [...domains].sort((a, b) => a.order - b.order);
  const domainProgresses = sortedDomains.map((domain) =>
    calcDomainProgress(domain, topics)
  );

  // 直近で学習したトピック（lastStudiedAt降順・上位5件）
  const recentStudiedTopics = [...topics]
    .filter((t) => t.lastStudiedAt !== null)
    .sort((a, b) => {
      // null チェック済みなので安全にキャスト
      const dateA = new Date(a.lastStudiedAt as string).getTime();
      const dateB = new Date(b.lastStudiedAt as string).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return {
    totalTopics,
    completedTopics,
    inProgressTopics,
    notStartedTopics,
    overallProgressRate,
    daysUntilExam,
    domainProgresses,
    recentStudiedTopics,
  };
};

// 試験日までの残り日数を計算する（未設定の場合はnullを返す）
export const calcDaysUntilExam = (examDate: string | null): number | null => {
  if (!examDate) return null;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(examDate);
    exam.setHours(0, 0, 0, 0);
    const diffMs = exam.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  } catch {
    return null;
  }
};

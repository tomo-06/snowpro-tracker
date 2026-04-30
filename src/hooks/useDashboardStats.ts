// ダッシュボード集計フック
// AppDataからDashboardStatsを計算してメモ化する

import { useMemo } from 'react';
import { AppData, DashboardStats } from '../types';
import { calcDashboardStats } from '../utils/progress';

// AppDataを受け取ってダッシュボード用の統計データを返すフック
export const useDashboardStats = (appData: AppData): DashboardStats => {
  // AppDataが変わった時のみ再計算する（パフォーマンス最適化）
  const stats = useMemo(() => calcDashboardStats(appData), [appData]);
  return stats;
};

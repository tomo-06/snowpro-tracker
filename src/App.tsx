// アプリルートコンポーネント
// ルーティング・グローバル状態管理・LocalStorage I/Oを担当する

import React, { useState } from 'react';
import { PageType } from './types';
import { useAppData } from './hooks/useAppData';
import { useDashboardStats } from './hooks/useDashboardStats';
import Header from './components/Header/Header';
import DashboardPage from './components/Dashboard/DashboardPage';
import TopicsPage from './components/Topics/TopicsPage';
import SettingsPage from './components/Settings/SettingsPage';

const App: React.FC = () => {
  // 現在表示中のページ
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  // アプリデータ管理（LocalStorage連動）
  const { appData, updateTopic, updateSettings, importData, resetData } = useAppData();

  // ダッシュボード集計統計（メモ化済み）
  const dashboardStats = useDashboardStats(appData);

  // ページに応じたコンテンツをレンダリングする
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage stats={dashboardStats} />;
      case 'topics':
        return (
          <TopicsPage
            appData={appData}
            onUpdateTopic={updateTopic}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            appData={appData}
            onSaveSettings={updateSettings}
            onImport={importData}
            onReset={resetData}
          />
        );
      default:
        return <DashboardPage stats={dashboardStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー・ナビゲーション */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;

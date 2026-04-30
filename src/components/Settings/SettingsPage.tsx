// 設定画面コンポーネント
// 試験日設定とデータ管理（エクスポート/インポート/リセット）を提供する

import React from 'react';
import { AppData, AppSettings } from '../../types';
import ExamDateForm from './ExamDateForm';
import DataManagement from './DataManagement';

interface SettingsPageProps {
  appData: AppData;
  onSaveSettings: (settings: AppSettings) => void;
  onImport: (newData: AppData) => void;
  onReset: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  appData,
  onSaveSettings,
  onImport,
  onReset,
}) => {
  // 試験日が変更された時の処理
  const handleExamDateSave = (examDate: string | null) => {
    onSaveSettings({
      ...appData.settings,
      examDate,
      lastUpdatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-5 max-w-2xl">
      {/* ページタイトル */}
      <h1 className="text-2xl font-bold text-gray-800">設定</h1>

      {/* 試験日設定フォーム */}
      <ExamDateForm
        examDate={appData.settings.examDate}
        onSave={handleExamDateSave}
      />

      {/* データ管理 */}
      <DataManagement
        appData={appData}
        onImport={onImport}
        onReset={onReset}
      />
    </div>
  );
};

export default SettingsPage;

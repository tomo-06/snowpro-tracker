// アプリデータ管理フック
// LocalStorage I/Oとグローバル状態管理を担当する

import { useState, useCallback } from 'react';
import { AppData, Topic, AppSettings } from '../types';
import { loadAppData, saveAppData, createInitialAppData } from '../utils/storage';

// フックの返り値型
interface UseAppDataReturn {
  appData: AppData;
  updateTopic: (updatedTopic: Topic) => void;
  updateSettings: (settings: AppSettings) => void;
  importData: (newData: AppData) => void;
  resetData: () => void;
}

// LocalStorageと連動したアプリデータ管理フック
export const useAppData = (): UseAppDataReturn => {
  // 初期化時にLocalStorageからデータをロード
  const [appData, setAppData] = useState<AppData>(() => loadAppData());

  // データを更新してLocalStorageに保存するヘルパー
  const updateAndSave = useCallback((newData: AppData) => {
    try {
      saveAppData(newData);
      setAppData(newData);
    } catch (error) {
      console.error('データの保存に失敗しました:', error);
      // エラーが発生してもUI状態は更新する
      setAppData(newData);
    }
  }, []);

  // 特定のトピックを更新する
  const updateTopic = useCallback(
    (updatedTopic: Topic) => {
      const newData: AppData = {
        ...appData,
        topics: appData.topics.map((t) =>
          t.id === updatedTopic.id ? updatedTopic : t
        ),
      };
      updateAndSave(newData);
    },
    [appData, updateAndSave]
  );

  // アプリ設定を更新する
  const updateSettings = useCallback(
    (settings: AppSettings) => {
      const newData: AppData = {
        ...appData,
        settings,
      };
      updateAndSave(newData);
    },
    [appData, updateAndSave]
  );

  // インポートデータでアプリデータ全体を置き換える
  const importData = useCallback(
    (newData: AppData) => {
      updateAndSave(newData);
    },
    [updateAndSave]
  );

  // アプリデータを初期状態にリセットする
  const resetData = useCallback(() => {
    const initialData = createInitialAppData();
    updateAndSave(initialData);
  }, [updateAndSave]);

  return { appData, updateTopic, updateSettings, importData, resetData };
};

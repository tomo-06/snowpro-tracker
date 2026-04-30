// LocalStorage操作ユーティリティ
// データの保存・読み込みとエラーハンドリングを集約する

import { AppData } from '../types';
import { INITIAL_DOMAINS, INITIAL_TOPICS } from '../data/initialData';

// LocalStorageのキー定数
export const STORAGE_KEY = 'snowpro-tracker-data';

// データスキーマバージョン
export const DATA_VERSION = '1.0.0';

// LocalStorageからアプリデータを読み込む
// データが存在しない場合は初期データを返す
export const loadAppData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // 初回起動時は初期データを返す
      return createInitialAppData();
    }
    const parsed = JSON.parse(stored) as AppData;
    // バージョン確認（将来のマイグレーション対応）
    if (!parsed.version) {
      console.warn('データバージョンが不明です。初期データを使用します。');
      return createInitialAppData();
    }
    return parsed;
  } catch (error) {
    console.error('LocalStorageの読み込みに失敗しました:', error);
    return createInitialAppData();
  }
};

// LocalStorageにアプリデータを保存する
export const saveAppData = (data: AppData): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('LocalStorageへの保存に失敗しました:', error);
    // ストレージ容量超過などのエラーをユーザーに通知する場合はここで処理
    throw new Error('データの保存に失敗しました。ストレージ容量を確認してください。');
  }
};

// 初期AppDataを生成する
export const createInitialAppData = (): AppData => {
  return {
    version: DATA_VERSION,
    settings: {
      examDate: null,
      lastUpdatedAt: new Date().toISOString(),
    },
    domains: INITIAL_DOMAINS,
    topics: INITIAL_TOPICS,
  };
};

// LocalStorageのデータをクリアする（リセット用）
export const clearAppData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('LocalStorageのクリアに失敗しました:', error);
  }
};

// JSONエクスポート/インポートユーティリティ
// LocalStorageデータのバックアップと復元機能

import { AppData } from '../types';
import { DATA_VERSION } from './storage';

// アプリデータをJSONファイルとしてダウンロードする
export const exportAppData = (appData: AppData): void => {
  try {
    const json = JSON.stringify(appData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // ダウンロード用の一時リンクを作成してクリック
    const link = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    link.href = url;
    link.download = `snowpro-tracker-backup-${timestamp}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('エクスポートに失敗しました:', error);
    throw new Error('データのエクスポートに失敗しました。');
  }
};

// JSONファイルからアプリデータを読み込む（バリデーション付き）
export const importAppData = (file: File): Promise<AppData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== 'string') {
          reject(new Error('ファイルの読み込みに失敗しました。'));
          return;
        }

        const parsed = JSON.parse(text);

        // データスキーマのバリデーション
        const validationError = validateAppData(parsed);
        if (validationError) {
          reject(new Error(`不正なデータ形式です: ${validationError}`));
          return;
        }

        resolve(parsed as AppData);
      } catch (error) {
        if (error instanceof SyntaxError) {
          reject(new Error('無効なJSONファイルです。ファイル形式を確認してください。'));
        } else {
          reject(new Error('データの読み込みに失敗しました。'));
        }
      }
    };

    reader.onerror = () => {
      reject(new Error('ファイルの読み込み中にエラーが発生しました。'));
    };

    reader.readAsText(file, 'utf-8');
  });
};

// AppDataスキーマのバリデーション
// エラーがある場合はエラーメッセージを返し、問題なければnullを返す
const validateAppData = (data: unknown): string | null => {
  if (typeof data !== 'object' || data === null) {
    return 'データがオブジェクト形式ではありません';
  }

  const obj = data as Record<string, unknown>;

  // versionフィールドの確認
  if (typeof obj.version !== 'string') {
    return 'versionフィールドが不正です';
  }

  // settingsフィールドの確認
  if (typeof obj.settings !== 'object' || obj.settings === null) {
    return 'settingsフィールドが不正です';
  }
  const settings = obj.settings as Record<string, unknown>;
  if (settings.examDate !== null && typeof settings.examDate !== 'string') {
    return 'settings.examDateフィールドが不正です';
  }

  // domainsフィールドの確認
  if (!Array.isArray(obj.domains)) {
    return 'domainsフィールドが配列ではありません';
  }

  // topicsフィールドの確認
  if (!Array.isArray(obj.topics)) {
    return 'topicsフィールドが配列ではありません';
  }

  // 各トピックの基本フィールド確認
  for (const topic of obj.topics) {
    if (typeof topic !== 'object' || topic === null) {
      return 'topicsの要素が不正です';
    }
    const t = topic as Record<string, unknown>;
    if (typeof t.id !== 'string' || typeof t.name !== 'string') {
      return 'topicのid/nameフィールドが不正です';
    }
    if (!['not_started', 'in_progress', 'completed'].includes(t.status as string)) {
      return `topicのstatusが不正です: ${t.status}`;
    }
  }

  // バージョン互換性チェック（メジャーバージョンが一致するか確認）
  const importedMajor = (obj.version as string).split('.')[0];
  const currentMajor = DATA_VERSION.split('.')[0];
  if (importedMajor !== currentMajor) {
    return `データバージョンが互換性のない形式です（インポート: ${obj.version}, 現在: ${DATA_VERSION}）`;
  }

  return null;
};

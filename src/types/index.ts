// SnowPro Core 学習トラッカー - 全TypeScript型定義

// 理解度ステータス（3段階）
export type StudyStatus = 'not_started' | 'in_progress' | 'completed';

// トピック（学習単位）
export interface Topic {
  id: string;                    // 一意ID（例: "topic_domain1_001"）
  domainId: string;              // 所属ドメインID
  name: string;                  // トピック名
  description: string;           // 説明（試験での出題観点）
  status: StudyStatus;           // 理解度ステータス
  memo: string;                  // 学習メモ（空文字可）
  lastStudiedAt: string | null;  // 最終学習日時（ISO 8601）
  createdAt: string;             // レコード作成日時（ISO 8601）
}

// ドメイン（試験分野）
export interface Domain {
  id: string;          // 一意ID（例: "domain_1"）
  name: string;        // ドメイン名
  description: string; // ドメイン説明
  weight: number;      // 出題割合（パーセント整数、例: 25）
  order: number;       // 表示順
}

// アプリ全体の設定
export interface AppSettings {
  examDate: string | null;       // 試験予定日（YYYY-MM-DD形式）
  lastUpdatedAt: string;         // 設定最終更新日時（ISO 8601）
}

// LocalStorageに保存するルートデータ構造
export interface AppData {
  version: string;               // データスキーマバージョン（例: "1.0.0"）
  settings: AppSettings;
  domains: Domain[];
  topics: Topic[];
}

// ドメインと進捗集計の結合型（UIでの表示用）
export interface DomainProgress {
  domain: Domain;
  topics: Topic[];
  totalCount: number;
  completedCount: number;
  inProgressCount: number;
  notStartedCount: number;
  progressRate: number;          // 0〜100の数値
}

// ダッシュボード用集計データ
export interface DashboardStats {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  notStartedTopics: number;
  overallProgressRate: number;   // 0〜100の数値
  daysUntilExam: number | null;  // null = 試験日未設定
  domainProgresses: DomainProgress[];
  recentStudiedTopics: Topic[];  // lastStudiedAt降順の上位5件
}

// ページ識別子
export type PageType = 'dashboard' | 'topics' | 'settings';

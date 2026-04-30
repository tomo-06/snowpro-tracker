# SnowPro Core 学習トラッカー 仕様書

## アプリ概要

SnowPro Core認定試験の合格を目指す学習者が、試験ドメイン別にトピックの理解度・進捗を管理し、効率的に学習できるWebアプリケーション。

- **技術スタック**: React + TypeScript + Tailwind CSS
- **データ永続化**: LocalStorage
- **言語**: 日本語UI

---

## 機能仕様

### 機能一覧と優先度

| 優先度 | 機能 | 説明 |
|--------|------|------|
| P0 | ドメイン・トピック一覧表示 | 試験ドメインとトピックを階層表示 |
| P0 | 理解度ステータス管理 | 各トピックに未学習/学習中/理解済みを設定 |
| P0 | 分野別進捗率表示 | ドメインごとの理解済み割合をパーセンテージで表示 |
| P0 | 全体進捗ダッシュボード | 全トピックの進捗サマリーを可視化 |
| P1 | トピックへのメモ追加 | 各トピックに自由記述メモを保存 |
| P1 | 最終学習日時の自動記録 | ステータス変更時に日時を自動記録 |
| P1 | 試験日カウントダウン | 任意で試験日を設定し、残り日数を表示 |
| P2 | ローカルデータのエクスポート/インポート | JSON形式でデータをバックアップ・復元 |

---

### 機能詳細

#### 1. ドメイン・トピック管理（P0）

SnowPro Core試験の公式ドメイン構成に準拠したトピックを初期データとして保持する。

**試験ドメイン一覧（初期データ）**

| ドメインID | ドメイン名 | 出題割合（参考） |
|-----------|-----------|----------------|
| `domain_1` | Snowflakeの概要とアーキテクチャ | 25% |
| `domain_2` | アカウントアクセスとセキュリティ | 20% |
| `domain_3` | パフォーマンスの概念 | 15% |
| `domain_4` | データローディング | 15% |
| `domain_5` | データ変換 | 15% |
| `domain_6` | データ保護とデータ共有 | 10% |

**各ドメインのトピック例**

- `domain_1`: マルチクラスター共有データアーキテクチャ、仮想ウェアハウス、マイクロパーティション、クラウドサービスレイヤー、ストレージレイヤー、コンピューティングレイヤー
- `domain_2`: ロールと権限、ユーザー管理、MFA、ネットワークポリシー、SSO/SCIM、列レベルセキュリティ、行アクセスポリシー
- `domain_3`: 仮想ウェアハウスのサイジング、クエリプロファイル、キャッシュの種類（結果/メタデータ/ウェアハウス）、クラスタリングキー
- `domain_4`: COPY INTO、Snowpipe、ステージの種類、ファイルフォーマット、変換オプション
- `domain_5`: DML操作、ストリーム、タスク、動的テーブル、ストアドプロシージャ、UDF
- `domain_6`: Time Travel、Fail-safe、データ共有、Marketplace、レプリケーション

#### 2. 理解度ステータス管理（P0）

各トピックに対し、以下3段階のステータスを設定できる。

| ステータスキー | 表示名 | カラー |
|--------------|--------|--------|
| `not_started` | 未学習 | グレー |
| `in_progress` | 学習中 | 黄色 |
| `completed` | 理解済み | 緑 |

- トピック一覧画面でステータスをワンクリックで切り替え可能
- ステータス変更時に `lastStudiedAt` を自動更新

#### 3. 進捗率表示（P0）

- 各ドメインの進捗率 = `completed` なトピック数 / ドメイン内トピック総数 × 100
- 全体進捗率 = 全 `completed` 数 / 全トピック総数 × 100
- プログレスバー（Tailwind CSSで実装）で視覚的に表示

#### 4. ダッシュボード（P0）

- 全体進捗率（円グラフまたは大きなプログレスバー）
- 分野別進捗率カード（ドメインごとのミニプログレスバー付きカード）
- ステータス別トピック数サマリー（未学習/学習中/理解済みの件数）
- 試験日カウントダウン（設定済みの場合のみ表示）
- 直近で学習したトピック（`lastStudiedAt` 降順で上位5件）

#### 5. メモ機能（P1）

- 各トピック詳細モーダルからメモを入力・編集
- 最大1000文字
- メモが存在するトピックは一覧でアイコン表示

#### 6. 最終学習日時（P1）

- ステータスを `not_started` 以外に変更した時点で `lastStudiedAt` を `Date.toISOString()` で記録
- `not_started` に戻した場合は `null` にリセット

#### 7. 試験日カウントダウン（P1）

- 設定画面（または専用フォーム）から試験日（日付のみ）を入力
- ダッシュボードに「試験まであとN日」を表示
- 試験日が未設定の場合は非表示

#### 8. データエクスポート/インポート（P2）

- 現在のLocalStorageデータをJSON形式でダウンロード
- JSONファイルをアップロードしてデータを上書き復元
- インポート時にデータスキーマのバリデーションを実施

---

## データモデル（TypeScript型定義）

```typescript
// 理解度ステータス
type StudyStatus = 'not_started' | 'in_progress' | 'completed';

// トピック（学習単位）
interface Topic {
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
interface Domain {
  id: string;          // 一意ID（例: "domain_1"）
  name: string;        // ドメイン名
  description: string; // ドメイン説明
  weight: number;      // 出題割合（パーセント整数、例: 25）
  order: number;       // 表示順
}

// アプリ全体の設定
interface AppSettings {
  examDate: string | null;       // 試験予定日（YYYY-MM-DD形式）
  lastUpdatedAt: string;         // 設定最終更新日時（ISO 8601）
}

// LocalStorageに保存するルートデータ構造
interface AppData {
  version: string;               // データスキーマバージョン（例: "1.0.0"）
  settings: AppSettings;
  domains: Domain[];
  topics: Topic[];
}

// ドメインと進捗集計の結合型（UIでの表示用）
interface DomainProgress {
  domain: Domain;
  topics: Topic[];
  totalCount: number;
  completedCount: number;
  inProgressCount: number;
  notStartedCount: number;
  progressRate: number;          // 0〜100の数値
}

// ダッシュボード用集計データ
interface DashboardStats {
  totalTopics: number;
  completedTopics: number;
  inProgressTopics: number;
  notStartedTopics: number;
  overallProgressRate: number;   // 0〜100の数値
  daysUntilExam: number | null;  // null = 試験日未設定
  domainProgresses: DomainProgress[];
  recentStudiedTopics: Topic[];  // lastStudiedAt降順の上位5件
}
```

---

## コンポーネント設計

### 画面構成

```
アプリ全体 (App)
├── ヘッダー (Header)
│   ├── アプリタイトル
│   └── ナビゲーション（ダッシュボード / トピック一覧 / 設定）
├── ダッシュボード画面 (DashboardPage)
│   ├── 全体進捗バー (OverallProgressBar)
│   ├── 試験カウントダウン (ExamCountdown)  ※試験日設定時のみ
│   ├── ステータスサマリー (StatusSummary)
│   ├── 分野別進捗カード一覧 (DomainProgressList)
│   │   └── 分野別進捗カード (DomainProgressCard) × N
│   └── 直近学習トピック (RecentStudiedTopics)
├── トピック一覧画面 (TopicsPage)
│   ├── ドメインフィルター (DomainFilter)
│   ├── ステータスフィルター (StatusFilter)
│   ├── ドメインセクション (DomainSection) × N
│   │   ├── ドメインヘッダー（名前・進捗率）
│   │   └── トピック行 (TopicRow) × N
│   │       ├── トピック名
│   │       ├── ステータスバッジ (StatusBadge)
│   │       ├── 最終学習日
│   │       ├── メモアイコン（メモあり時）
│   │       └── 詳細ボタン
│   └── トピック詳細モーダル (TopicDetailModal)
│       ├── トピック名・説明
│       ├── ステータス選択 (StatusSelector)
│       ├── メモ入力 (MemoEditor)
│       └── 最終学習日表示
└── 設定画面 (SettingsPage)
    ├── 試験日設定フォーム (ExamDateForm)
    └── データ管理 (DataManagement)
        ├── エクスポートボタン
        └── インポートフォーム
```

### コンポーネント詳細

| コンポーネント | 責務 | Props / 主な状態 |
|--------------|------|-----------------|
| `App` | ルーティング、グローバル状態管理、LocalStorage I/O | `appData: AppData` |
| `Header` | ナビゲーション | `currentPage`, `onNavigate` |
| `DashboardPage` | ダッシュボード全体 | `stats: DashboardStats` |
| `OverallProgressBar` | 全体進捗の大きなバー表示 | `rate: number`, `completed: number`, `total: number` |
| `ExamCountdown` | 試験日カウントダウン | `daysUntilExam: number` |
| `StatusSummary` | ステータス別件数カード | `stats: DashboardStats` |
| `DomainProgressCard` | 分野別進捗ミニカード | `progress: DomainProgress` |
| `RecentStudiedTopics` | 直近学習リスト | `topics: Topic[]` |
| `TopicsPage` | トピック一覧・フィルター | `appData: AppData`, `onUpdateTopic` |
| `DomainSection` | 1ドメイン分の折りたたみセクション | `domain: Domain`, `topics: Topic[]`, `onUpdateTopic` |
| `TopicRow` | 1トピック行 | `topic: Topic`, `onStatusChange`, `onOpenDetail` |
| `StatusBadge` | ステータスを色付きバッジで表示 | `status: StudyStatus` |
| `TopicDetailModal` | トピック詳細・編集モーダル | `topic: Topic`, `onSave`, `onClose` |
| `StatusSelector` | ステータス3択ボタン | `value: StudyStatus`, `onChange` |
| `MemoEditor` | テキストエリアによるメモ編集 | `value: string`, `onChange` |
| `SettingsPage` | 設定画面 | `settings: AppSettings`, `onSave` |
| `ExamDateForm` | 試験日入力フォーム | `examDate: string \| null`, `onSave` |
| `DataManagement` | エクスポート/インポート | `appData: AppData`, `onImport` |

---

## ファイル構成

```
snowpro-tracker/
├── docs/
│   └── spec.md                        # 本仕様書
├── public/
│   └── index.html
├── src/
│   ├── index.tsx                      # エントリポイント
│   ├── App.tsx                        # ルーティング・グローバル状態
│   ├── types/
│   │   └── index.ts                   # 全TypeScript型定義
│   ├── data/
│   │   └── initialData.ts             # 初期ドメイン・トピックデータ
│   ├── hooks/
│   │   ├── useAppData.ts              # LocalStorage I/O フック
│   │   └── useDashboardStats.ts       # ダッシュボード集計フック
│   ├── utils/
│   │   ├── storage.ts                 # LocalStorage操作ユーティリティ
│   │   ├── progress.ts                # 進捗率計算ユーティリティ
│   │   └── exportImport.ts            # JSON エクスポート/インポート
│   ├── components/
│   │   ├── Header/
│   │   │   └── Header.tsx
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── OverallProgressBar.tsx
│   │   │   ├── ExamCountdown.tsx
│   │   │   ├── StatusSummary.tsx
│   │   │   ├── DomainProgressCard.tsx
│   │   │   ├── DomainProgressList.tsx
│   │   │   └── RecentStudiedTopics.tsx
│   │   ├── Topics/
│   │   │   ├── TopicsPage.tsx
│   │   │   ├── DomainFilter.tsx
│   │   │   ├── StatusFilter.tsx
│   │   │   ├── DomainSection.tsx
│   │   │   ├── TopicRow.tsx
│   │   │   ├── TopicDetailModal.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── StatusSelector.tsx
│   │   │   └── MemoEditor.tsx
│   │   └── Settings/
│   │       ├── SettingsPage.tsx
│   │       ├── ExamDateForm.tsx
│   │       └── DataManagement.tsx
│   └── styles/
│       └── index.css                  # Tailwind CSSディレクティブ
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── CLAUDE.md
```

---

## 完了条件チェックリスト（Evaluator用）

### 機能要件

#### ドメイン・トピック管理
- [ ] 6つの試験ドメインが初期データとして表示される
- [ ] 各ドメインに複数のトピックが紐付いている
- [ ] トピック総数が30件以上存在する
- [ ] 各ドメインにはID・名前・出題割合・説明が設定されている
- [ ] 各トピックにはID・ドメインID・名前・説明が設定されている

#### 理解度ステータス管理
- [ ] 各トピックに「未学習/学習中/理解済み」の3段階ステータスが設定できる
- [ ] ステータス変更がLocalStorageに即時保存される
- [ ] ステータスを未学習以外に変更すると `lastStudiedAt` が更新される
- [ ] ステータスを未学習に戻すと `lastStudiedAt` が `null` になる
- [ ] ステータスは視覚的に区別できる色で表示される

#### 進捗率表示
- [ ] 各ドメインの進捗率が正しく計算され表示される（完了数/総数×100）
- [ ] 全体進捗率が正しく計算される
- [ ] プログレスバーが進捗率に応じて伸縮する
- [ ] 進捗率は0〜100%の整数または小数1桁で表示される

#### ダッシュボード
- [ ] 全体進捗率が大きく表示される
- [ ] ステータス別のトピック件数（未学習/学習中/理解済み）が表示される
- [ ] 全6ドメインの進捗カードが表示される
- [ ] 直近で学習したトピックが最大5件表示される

#### メモ機能
- [ ] トピック詳細モーダルからメモを入力・保存できる
- [ ] 保存したメモが再表示時も保持される
- [ ] メモが存在するトピックにアイコンが表示される
- [ ] メモ欄の文字数が表示される（最大1000文字）

#### 試験日カウントダウン
- [ ] 設定画面から試験日を日付ピッカーで入力できる
- [ ] 試験日が設定されるとダッシュボードにカウントダウンが表示される
- [ ] 試験日が未設定の場合はカウントダウンが非表示
- [ ] 残り日数が正しく計算される（今日との差分）

#### データエクスポート/インポート
- [ ] エクスポートボタン押下でJSONファイルがダウンロードされる
- [ ] インポートでJSONファイルを選択するとデータが復元される
- [ ] インポート時に不正なJSONに対してエラーメッセージが表示される

### 非機能要件

#### データ永続化
- [ ] LocalStorageキー `snowpro-tracker-data` にデータが保存される
- [ ] ページリロード後もデータが維持される
- [ ] LocalStorageにデータが存在しない場合、初期データが正しくロードされる

#### UI/UX
- [ ] モバイル（375px）・タブレット（768px）・デスクトップ（1024px以上）でレイアウトが崩れない
- [ ] 日本語でUIが表示される
- [ ] トピック詳細モーダルが開閉できる
- [ ] モーダル外クリックでモーダルが閉じる
- [ ] ドメインセクションが折りたたみ可能（任意）

#### コード品質
- [ ] TypeScriptの型定義が `src/types/index.ts` に集約されている
- [ ] `any` 型が使用されていない
- [ ] LocalStorage操作が `src/utils/storage.ts` に集約されている
- [ ] エラーハンドリングが実装されている（LocalStorage読み書き、インポート処理）
- [ ] 日本語コメントがコンポーネントおよびユーティリティに含まれている
- [ ] 各コンポーネントが機能単位で分割されている（1ファイル1責務）

#### 型整合性
- [ ] `AppData` 型の `version` フィールドが存在する
- [ ] `Topic.status` が `StudyStatus` 型（リテラルユニオン）で定義されている
- [ ] `AppSettings.examDate` が `string | null` 型である
- [ ] 日時フィールドはすべて ISO 8601 形式の文字列で保存される

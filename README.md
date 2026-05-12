
# 完成したアプリケーション
https://github.com/user-attachments/assets/5593e533-4c98-4728-a8a2-2004af5a208f

# SnowPro Core 学習トラッカー

SnowPro Core 認定試験の学習進捗を分野別に管理するWebアプリです。
**Claude Code のハーネスエンジニアリング（Planner / Generator / Evaluator）を使って設計から実装まで自動生成しました。**

---

## 画面イメージ

| ダッシュボード | トピック一覧 |
|---|---|
| 全体進捗・分野別進捗を表示 | トピックのステータスを管理 |

---

## 機能

- 分野別の学習進捗をパーセンテージで可視化
- トピックごとに「未学習 / 学習中 / 理解済み」のステータス管理
- ダッシュボードで全体進捗をひと目で確認
- データはLocalStorageに保存（アカウント不要）

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| データ永続化 | LocalStorage |
| 実行環境 | WSL2 + Ubuntu |

---

## セットアップ

### 前提条件

- Node.js v18以上
- npm

### インストールと起動

```bash
# リポジトリをクローン
git clone https://github.com/あなたのユーザー名/snowpro-tracker.git
cd snowpro-tracker

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm start
```

ブラウザで `http://localhost:3000` を開くと起動します。

---

## ハーネスエンジニアリングによる開発の流れ

このプロジェクトは Claude Code の3つのサブエージェントを使って開発しました。

```
① Planner  →  要件を受け取り、仕様書（docs/spec.md）を生成
      ↓
② Generator  →  spec.md を読んでコードを実装
      ↓
③ Evaluator  →  実装コードを spec.md の完了条件でレビュー・修正
```

### 各フェーズの実行コマンド

```bash
# Planner（設計）
claude --dangerously-skip-permissions "@planner SnowPro Coreの試験範囲を分野別に管理し、理解度と進捗を記録できる学習トラッカーを設計してください"

# Generator（実装）
claude --dangerously-skip-permissions "@generator docs/spec.mdの仕様に従って実装してください"

# Evaluator（レビュー）
claude --dangerously-skip-permissions "@evaluator 実装されたコードをdocs/spec.mdの完了条件でレビューしてください"
```

### エージェント定義ファイルの場所

```
.claude/
└── agents/
    ├── planner.md    # 設計エージェントの役割定義
    ├── generator.md  # 実装エージェントの役割定義
    └── evaluator.md  # レビューエージェントの役割定義
```

---

## プロジェクト構成

```
snowpro-tracker/
├── CLAUDE.md                 # Claude Code プロジェクトルール
├── docs/
│   └── spec.md               # Plannerが生成した仕様書
├── .claude/
│   └── agents/               # サブエージェント定義
├── src/
│   ├── components/           # Reactコンポーネント
│   ├── types/                # TypeScript型定義
│   └── App.tsx
└── README.md
```

---

## 実行環境の準備

Claude Code を使って同じ手順を試したい場合は以下を参照してください。

```bash
# Claude Code インストール
npm install -g @anthropic-ai/claude-code

# 起動（Claudeアカウントでログイン）
claude
```

Claude Pro プランで実行しました。各フェーズのトークン消費の目安は以下の通りです。

| フェーズ | トークン消費 | 所要時間 |
|---|---|---|
| Planner | 9.8k | 約4分 |
| Generator | 29.2k | 約4分 |
| Evaluator | - | - |

---

## 参考

- [Claude Code 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code)
- [SnowPro Core 試験ガイド](https://www.snowflake.com/certifications/)

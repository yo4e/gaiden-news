# AGENTS.md

このリポジトリで作業するAI・自動実装エージェント向けの入口です。

## テーマ・デザイン作業を始める前に

必ず [`docs/THEME_IMPLEMENTATION_RULES.md`](docs/THEME_IMPLEMENTATION_RULES.md) を最優先で読んでください。

あわせて次を確認してください。

- `src/content/pages/gaiden.md`
- `src/config/themes.ts`
- `src/layouts/DocumentShell.astro`
- `src/layouts/PlainLayout.astro`
- 既存テーマのレイアウトとCSS

## ハードルール

- お着替えテーマの実装は `main` へ直接コミットせず、**最新の `main` から専用の作業ブランチを作って進めます**。
- 実装後はPRを作成し、Previewを**人間が実際に目視確認してOKを出した場合にのみ `main` へマージ**します。AIや自動実装者だけの判断でマージしません。
- `src/content/pages/gaiden.md` は掲載内容の唯一の正本です。デザイン都合で書き換えません。
- 新しいデザインは既存テーマの上書きではなく、**新しいテーマIDとして追加**します。
- `PlainLayout.astro` と `plain.css` は安全地帯です。お着替えテーマに合わせて再設計しません。
- リポジトリ直下の `index.html` はAstro障害時の最終静的フォールバックです。通常のテーマ作業では変更しません。
- 過去テーマは原則として残します。新テーマ追加と同時に削除しません。
- 実験的・先進的なWeb表現は歓迎しますが、主要本文をJavaScriptや外部アセットの成功に依存させません。
- 新テーマを実装しただけではProductionの既定テーマへ昇格しません。Preview確認と承認を経て切り替えます。
- 問題が起きたら、まず `plain` へ退避して情報公開を維持します。

詳細・チェックリスト・ロールバック順序は `docs/THEME_IMPLEMENTATION_RULES.md` を正本とします。

# 外電通信

外電通信（Gaiden News Network）の公式サイト用リポジトリです。

- 公開ドメイン: https://gaiden.news/
- 運営媒体: [AI外電](https://ai.gaiden.news/)

## 現在の公開構成

サイトはAstroで静的ビルドし、Cloudflare Pagesから公開しています。

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 22.12.0以上
- 現在の既定テーマ: `plain`
- 常設の簡素版確認URL: `/plain/`（noindex）

`editorial-2026` は既存の代替テーマとしてリポジトリに保持しています。

## 構成方針

掲載内容とデザインを分離し、本文は `src/content/pages/gaiden.md` を唯一の正本とします。

- 掲載内容の正本: `src/content/pages/gaiden.md`
- 共通HTML/SEO: `src/layouts/DocumentShell.astro`
- 現在の既定表示: `src/layouts/PlainLayout.astro`
- 保持中の編集デザイン: `src/layouts/EditorialLayout.astro`
- テーマ選択: `src/config/themes.ts`
- Plain用ファビコン: `public/favicon.png`

設計思想と着せ替え手順は [`docs/DESIGN_ARCHITECTURE.md`](docs/DESIGN_ARCHITECTURE.md) を参照してください。

## 掲載内容の更新

本文、沿革、役職、リンクなどは `src/content/pages/gaiden.md` を編集します。

GitHub上から直接編集して `main` にコミットして構いません。冒頭のFront Matter（`---` で囲まれた `title`、`description`、`tagline`、`eyebrow`、`canonical`）の形式は維持してください。

`main` の更新後はGitHub ActionsでAstroビルドを検証し、Cloudflare PagesがProduction Deploymentを行います。

## ローカル開発

Node.js 22.12.0以上を使用します。

```bash
npm install
npm run dev
```

ビルド確認:

```bash
npm run build
```

テーマを明示して確認する場合:

```bash
PUBLIC_GAIDEN_THEME=plain npm run dev
PUBLIC_GAIDEN_THEME=editorial-2026 npm run dev
```

## テーマ切り替え

既定テーマは `src/config/themes.ts` の `DEFAULT_THEME` で決まります。現在は `plain` です。

必要に応じてCloudflare Pagesの環境変数 `PUBLIC_GAIDEN_THEME` を設定すると、コード上の既定値を変更せずビルド時にテーマを切り替えられます。

- `plain`: 白地・黒文字の簡素デザイン
- `editorial-2026`: 保持中の編集デザイン

## 静的フォールバック

リポジトリ直下の `index.html` は、Astroの公開成果物には含まれません。現在のProductionは `dist` を配信しているため、通常のサイト表示には使用されません。

このファイルは、Astro/ビルド系の障害時にCloudflare Pagesを一時的に静的公開へ戻す場合の最小フォールバックとして保持しています。

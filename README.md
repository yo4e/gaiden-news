# 外電通信

外電通信（Gaiden News Network）の公式サイト用リポジトリです。

- 公開ドメイン: https://gaiden.news/
- 運営媒体: [AI外電](https://ai.gaiden.news/)

## 構成方針

掲載内容とデザインを分離し、本文は `src/content/pages/gaiden.md` を唯一の正本とします。

- 通常表示: `EditorialLayout.astro`
- 非常用表示: `PlainLayout.astro`
- 常設の簡素版確認URL: `/plain/`
- テーマ選択: `src/config/themes.ts`

設計思想と半年ごとの着せ替え手順は [`docs/DESIGN_ARCHITECTURE.md`](docs/DESIGN_ARCHITECTURE.md) を参照してください。

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

非常用のPlainLayoutをトップへ適用して確認:

```bash
PUBLIC_GAIDEN_THEME=plain npm run dev
```

## Cloudflare Pages

Astro版へ移行する際は、Cloudflare Pagesの設定を次へ変更します。

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

必要に応じて環境変数 `PUBLIC_GAIDEN_THEME` を設定します。

- `editorial-2026`: 通常デザイン
- `plain`: 白地・黒文字の非常用デザイン

リポジトリ直下の `index.html` は、Cloudflareをビルドなしで公開している現行構成の退避用として当面残しています。Cloudflareのビルド設定を切り替えるまでは、現在のサイト表示に影響しません。

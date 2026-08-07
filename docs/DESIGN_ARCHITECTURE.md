# 外電通信サイト：コンテンツとデザインの分離方針

## 目的

外電通信サイトは、掲載情報が少ない一枚構成の公式サイトである。一方で、組織の看板として長期間維持しながら、必要に応じて外観を大胆に変更できることを重視する。

このため、**内容を不変の正本として管理し、デザインを交換可能な衣装として扱う**。

## 基本原則

1. **文章の正本はMarkdownに一つだけ置く**  
   本文、役職、沿革、リンク等は `src/content/pages/gaiden.md` で管理する。レイアウトやCSSへ本文を複製しない。

2. **レイアウトは内容を変更しない**  
   レイアウトの責務は、ヘッダー、余白、タイポグラフィ、色、装飾、フッター等の表示に限定する。掲載事実や文章はMarkdown側で変更する。

3. **URLと意味構造を固定する**  
   デザインを変更しても、トップURL、ページタイトル、見出し階層、主要リンク、SEO情報は原則として維持する。

4. **PlainLayoutを常設する**  
   白地・黒文字・JavaScript不要の `PlainLayout.astro` を常設する。通常テーマとしても非常用としても使用でき、大胆な改装が破綻した場合でも内容を失わず即時に簡素な表示へ戻せるようにする。

5. **テーマは追加し、旧テーマをすぐ削除しない**  
   改装では既存テーマを直接破壊せず、新しいレイアウトとCSSを追加する。公開後に安定を確認してから旧テーマの整理を判断する。

## 現在の公開状態

2026年8月7日にCloudflare PagesをAstroビルドへ切り替えた。Productionは `main` を `npm run build` でビルドし、`dist` を配信している。

現在の `DEFAULT_THEME` は `plain` で、トップ `/` もPlainLayoutを使用する。`/plain/` は同じPlainLayoutを常設確認用として生成し、検索登録を避けるため `noindex` とする。

`editorial-2026` は削除せず、既存の代替テーマとして保持する。

## ディレクトリの役割

```text
src/content/pages/gaiden.md          掲載内容の正本
src/layouts/DocumentShell.astro      SEO・HTML文書の共通基盤
src/layouts/PlainLayout.astro        現在の既定・非常用の簡素デザイン
src/layouts/EditorialLayout.astro    保持中の編集デザイン
src/styles/plain.css                 PlainLayout専用CSS
src/styles/themes/                   代替・将来テーマのCSS
src/config/themes.ts                 使用テーマの選択
src/pages/index.astro                正本とテーマを結合する入口
src/pages/plain.astro                PlainLayoutの常設確認ページ
public/favicon.png                   Plainテーマ用ファビコン
index.html                           Astro障害時の最小静的フォールバック
```

## テーマの契約

新しいテーマは、次の入力を受け取れるAstroレイアウトとして実装する。

- `title`
- `description`
- `tagline`
- `eyebrow`
- `canonical`
- 本文を受け取る既定の `<slot />`

本文は必ずスロットから表示し、テーマ内へコピーしない。

## テーマの切り替え

既定テーマは `src/config/themes.ts` の `DEFAULT_THEME` で決める。現在は `plain`。

ビルド時に環境変数を指定すれば、コードを変更せず切り替えられる。

```bash
PUBLIC_GAIDEN_THEME=plain npm run build
PUBLIC_GAIDEN_THEME=editorial-2026 npm run build
```

Cloudflare Pages側でも `PUBLIC_GAIDEN_THEME` を設定して再デプロイすれば、コード上の既定値を変更せず公開テーマを切り替えられる。環境変数を設定しない場合は `DEFAULT_THEME` を使う。

`/plain/` は常にPlainLayoutで生成し、公開テーマを切り替える前の確認に使う。重複ページとして検索登録されないよう `noindex` を指定する。

## デザイン変更手順

1. Figma等で新デザインを作る。
2. 新しい `○○Layout.astro` とテーマCSSを追加する。
3. Markdown本文を一切変更せず、新テーマで全内容が読めることを確認する。
4. モバイル、キーボード操作、文字拡大、リンク、見出し階層を確認する。
5. Preview環境で確認後、テーマ登録と既定値を変更する。
6. 公開後に問題があれば `plain` へ即時退避する。

## Figmaへの依頼条件

Figmaには、文章を書き換えるのではなく、既存の意味構造へ新しい視覚表現を与えるよう依頼する。

- 見出しと本文の順序は原則として維持する
- デスクトップとモバイルの両方を作る
- 色、文字サイズ、余白、罫線、角丸等をデザイントークンとして整理する
- hover、focus、リンク等の状態を示す
- 本文が増減しても破綻しない可変レイアウトにする
- 外部フォントや画像が取得できなくても本文を読める設計にする
- JavaScriptを必須にしない

## ロールバック方針

新しいテーマで問題が起きた場合は、修正を急いで継ぎ足すより、まずPlainLayoutへ戻して情報公開を維持する。

1. `PUBLIC_GAIDEN_THEME=plain` を設定して再デプロイする、または `DEFAULT_THEME` を `plain` に戻す。
2. 新テーマを修正する。
3. Previewで確認後、必要に応じて通常テーマへ戻す。

現在はすでに `plain` が既定なので、この状態自体が安全側のベースラインになる。

サイトの役割は情報を公開し続けることであり、装飾を維持することではない。

## 静的HTMLフォールバック

リポジトリ直下の `index.html` は、現在のAstro Productionでは配信されない。Cloudflare Pagesは `dist` を公開しているため、通常表示の正本は `src/content/pages/gaiden.md` と `src/pages/index.astro` である。

ルート `index.html` は、Astroまたはビルド系の障害時にCloudflare Pagesを一時的に静的公開へ戻す場合の最小フォールバックとして保持する。掲載情報を二重管理しないため、詳細本文は持たせない。

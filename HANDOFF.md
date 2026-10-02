# GENSO サイト 引継ぎ資料

## プロジェクト概要

**GENSO**（SNSマーケティング・映像制作会社）のコーポレートサイト。  
完全静的HTML（サーバー不要）。7ページ構成。

---

## ファイル構成

```
index.html          トップページ
about.html          GENSOについて
contact.html        お問い合わせフォーム
service-sns.html    サービス詳細：SNSアカウント運用
service-short.html  サービス詳細：縦型ショート動画
service-film.html   サービス詳細：本格的な横型映像
shiryou.html        資料請求
shared.js           ナビ・フッター・アニメーション共通JS

fashion.jpg         ブランドカード：ILOKE用
furniture.jpg       ブランドカード：omonma用
gimbal.jpg          CEOセクション・サービス詳細用
hotdog.jpg          ブランドカード：PLAY GOD用
phone-video.jpg     service-short ヒーロー背景
podcast.jpg         service-sns ヒーロー背景・写真
studio.jpg          indexヒーロー・about・service-film用
```

---

## デザイン仕様

| 要素 | 値 |
|---|---|
| メインカラー（ダーク） | `#071828` |
| アクセントカラー（シアン） | `#00CCFF` |
| 背景 | `#FFFFFF` |
| ルール線 | `#C0D8F0` |
| 見出しフォント | Archivo Black |
| 本文フォント | Archivo (300/400/500) |
| モバイルブレーク | 700px |

---

## shared.js の仕組み

- `inject()` でナビ・フッターを全ページに動的挿入
  - `isIndex`フラグ：`#services`要素があるかで判定
- `initAnimations()` でスクロールフェードイン（IntersectionObserver）
  - CSSクラス `.gsn` / `.gsn-in` を動的注入
  - ナビ・フッター・スクリプトタグはスキップ（重要）
- ロゴ名は現在 `GENSO` / `GENS<O>` のスタイル

---

## 実装済みの主な機能

- [x] スクロールフェードインアニメーション（translateY/X + opacity）
- [x] ティッカーループ（window.load後にピクセル幅計算で再計算→ずれ防止）
- [x] ナビ：スクロール時に背景色付与
- [x] ブランドカードから外部サイトへリンク（target="_blank"）
  - ILOKE → https://iloke.jp/
  - omonma → https://omonma.jp/
  - PLAY GOD → https://play-god.jp/
- [x] お問い合わせフォーム（送信後サンクスメッセージ表示）
- [x] レスポンシブ対応（700px以下）
- [x] 資料ダウンロードページ（shiryou.html）

---

## 既知のバグ（修正済み）

1. **ティッカーのずれ** → `translateX(-50%)`をCSS固定値ではなく`scrollWidth/2`のピクセル値で動的計算
2. **navのnullエラー** → `var nav = document.querySelector('nav'); if(nav)`でnullチェック
3. **script/style要素へのアニメーション適用エラー** → タグ名フィルターで除外

---

## 今後の追加候補

- [ ] 実際の資料PDF（shiryou.htmlのDLボタンにリンク）
- [ ] お問い合わせフォームのバックエンド連携
- [ ] OGP / meta description
- [ ] Google Analytics
- [ ] カバー画像の差し替え

---

## 新チャットへの引継ぎプロンプト

```
GENSOというSNSマーケティング・映像制作会社のコーポレートサイトを制作中です。
添付のzipを解凍した全ファイルが現在のサイト一式です。

【技術スタック】
- 完全静的HTML（7ページ）+ shared.js（ナビ・フッター・アニメーション共通）
- Google Fonts: Archivo Black / Archivo
- カラー: #071828（ダーク）/ #00CCFF（アクセント）/ #FFFFFF（背景）

【shared.jsの重要ルール】
- inject()でナビ・フッターを動的挿入（isIndex = #servicesの有無で判定）
- initAnimations()でIntersectionObserverによるフェードイン
- NAV/FOOTER/SCRIPT/STYLE/LINKタグは必ずスキップ
- ティッカーはwindow.load後にscrollWidthピクセル値で@keyframes再計算

今回お願いしたいこと：
（ここに具体的な修正・追加内容を書く）
```

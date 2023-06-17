# ShopClient

# 概要
## 店舗向けWeb画面

## 機能

- ログイン
- 累計利用ポイント表示
- QRコード読み込み
- 利用履歴一覧表示

## 技術要素

- node 19.7.0
- npm 9.5.0
- Nuxt3
- Typescript
- Vuetify
- firebase
- vue-qrcode-reader
  - release版がまだVue3対応していない。
  - Vue3対応されているPre-release版を利用。

### for Deploy

- Vercel

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup


.env

```
FIREBASE_API_KEY=認証用のFirebase APIキー
FIREBASE_AUTH_DOMAIN=認証ドメイン
FIREBASE_PROJECT_ID=FirebaseプロジェクトID
API_ENDPOINT=APIのエンドポイント
```

Make sure to install the dependencies:

```bash
# npm
npm install

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Deploy

- Vercel Pro
  - moripo Team
  - mainブランチ

# ユーザー新規登録

[service-backend](https://github.com/mori-po/service-backend/blob/develop/README.md)を参照

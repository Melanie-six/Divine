# Divine — 甜點電商網站

一個以 React 打造的甜點品牌電商網站，提供完整的前台購物流程與後台管理功能。

## 線上預覽

[https://melanielin.github.io/Divine/](https://melanielin.github.io/Divine/)

## 功能特色

**前台**
- 首頁：品牌展示、精選商品輪播（Swiper）、AOS 進場動畫
- 商品列表：分類篩選、切換載入動畫、商品圖片可點擊進入詳細頁
- 商品詳細頁：標籤徽章、星等評分、保存說明、數量選擇、同系列商品推薦（含加入購物車）
- 購物車：數量增減、刪除商品、推薦商品輪播
- 訂單表單：表單驗證、送出訂單
- 我的訂單：卡片式訂單列表、點擊展開品項明細、付款功能
- 關於我們頁面

**後台**（需登入）
- 商品管理：新增、編輯、刪除商品
- 訂單管理：查看、編輯、刪除訂單

## 技術堆疊

| 類別 | 套件 |
|------|------|
| 框架 | React 19 |
| 建構工具 | Vite 7 |
| 路由 | React Router 7 |
| 狀態管理 | Redux Toolkit + React Redux |
| UI 框架 | Bootstrap 5 + Bootstrap Icons |
| 表單驗證 | React Hook Form |
| HTTP 請求 | Axios |
| 動畫 | AOS (Animate On Scroll) |
| 輪播 | Swiper |
| 部署 | GitHub Pages (gh-pages) |

## 專案結構

```
src/
├── assets/         # 全域樣式 (CSS)
├── components/     # 共用元件 (Header、Footer、Modal、Toast 等)
├── hooks/          # 自訂 Hook
├── layout/         # 前台 / 後台 Layout
├── routes/         # 路由設定
├── slice/          # Redux Slices (cart、message、app)
├── store/          # Redux Store
└── views/
    ├── admin/      # 後台頁面 (AdminProduct、AdminOrder)
    └── frontend/   # 前台頁面 (Home、Products、Cart、OrderForm 等)
```

## 路由一覽

| 路徑 | 頁面 |
|------|------|
| `/` | 首頁 |
| `/about` | 關於我們 |
| `/products` | 商品列表 |
| `/product/:id` | 商品詳細頁 |
| `/cart` | 購物車 |
| `/order` | 訂單表單 |
| `/pay` | 我的訂單 |
| `/login` | 後台登入 |
| `/admin/products` | 後台商品管理 |
| `/admin/orders` | 後台訂單管理 |

## 安裝與執行

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建構正式版本
npm run build

# 預覽建構結果
npm run preview

# 部署至 GitHub Pages
npm run deploy
```

## 環境設定

於專案根目錄建立 `.env` 檔案，填入 API 相關設定：

```env
VITE_API_BASE=你的_API_BASE_URL
VITE_API_PATH=你的_API_PATH
```

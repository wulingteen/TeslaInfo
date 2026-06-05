# Tesla 車主筆記

給台灣特斯拉車主看的用車筆記：把充電規格、轉接頭、耗電、保養、購車推薦碼與長途檢查整理在同一頁。

![Tesla 車主筆記主視覺](assets/model-y-juniper-hero.webp)

## 這個專案給誰

這個 repo 的主要受眾是特斯拉車主，尤其是：

- 正在評估 Model 3 / Model Y / Cybertruck 等車款的準車主
- 想知道一年用車成本、充電成本和油車差多少的車主
- 會跑長途、需要判斷家充和快充比例的使用者
- 想追蹤 OTA、電池健康、保值與維修體驗的人
- 也想順手查 TSLA 股價，但清楚知道這只是附加功能的人

## 專案頁面

| 頁面 | 檔案 | 車主用途 |
| --- | --- | --- |
| Tesla 車主筆記 | [`index.html`](index.html) | 主頁，聚焦充電、耗電、電池、OTA、維修保值與用車成本 |
| 新手全須知 | [`beginner-guide.html`](beginner-guide.html) | 新手頁，把 Tesla 台灣官網、支援頁與車主手冊按購車到交車後第一年整理 |
| 配件與接頭圖鑑 | [`accessories.html`](accessories.html) | 圖片化整理 Type 2、CCS2、TPC、J1772、家充、旅充、轉接頭與交車配件 |
| 相關企業附錄 | [`musk-empire.html`](musk-empire.html) | 附加頁，整理 Tesla 以外的相關企業訊號 |
| 股價附錄 | [`stock-analysis.html`](stock-analysis.html) | 附加頁，用免費資料源追蹤 TSLA 與相關代理標的 |

## 車主會用到的核心功能

### 主視覺

首頁和車型配對使用原本那組車型視覺資產。前台文案以車主查資料、核對規格和試算成本為主。

### 新手全須知

[`beginner-guide.html`](beginner-guide.html) 是給準車主與剛交車車主看的官方資訊索引。它不複製 Tesla 官網全文，而是把 Tesla 台灣官網、支援頁、線上商店與車主手冊整理成新手順序：

- 購車前：試駕、下訂、付款、登記、保險、充電條件
- 交車：交付前準備、交付當日、交車後第一週
- 充電：家充、超充、第三方快充、目的地充電、轉接頭
- 保養與保固：保養週期、輪胎、濾網、電池與驅動單元保固
- 服務與救援：App 預約、行動服務、道路救援、客戶服務
- 軟體與帳戶：Tesla App、OTA、升級、所有權轉移
- 官方來源：每個主題都連回 Tesla 官方頁面核對原文

### 年度用車成本試算

在主頁可以調整：

- 年行駛里程
- 家充比例
- 每年輪胎與耗材
- 家充單價
- 外部快充單價
- 95 無鉛油價
- 對照油車油耗

頁面會即時計算：

- 年耗電量
- 估算充電電費
- 與油車燃料成本的差額
- 電費加耗材的年度總額

試算器的預設耗電採 FuelEconomy.gov 2026 Tesla Model Y Long Range AWD 車輛資料換算為 17.1 kWh/100 km。電價、快充費率與油價都應在使用前依自己的所在地和最新公告更新。

### 有來源的車主資料

主頁目前放入幾類可核對資料：

- EPA / FuelEconomy.gov：2026 Model 3 / Model Y 的 MPGe、kWh/100mi、EPA 續航與車輛 ID
- Tesla 台灣車輛保固：基本保固、電池與驅動單元保固、70% 電池容量門檻
- Tesla 台灣車輛保養：車廂空氣濾網、輪胎換位、煞車油檢測週期
- Tesla 台灣超級充電站費用：擁堵費條件、台灣每分鐘費用與寬限時間
- 台灣電力公司電價表：住宅用電與表燈時間電價
- 台灣中油：汽柴油參考零售價格公告

### 配件與充電接頭圖鑑

[`accessories.html`](accessories.html) 新增圖片化配件頁：

- Type 2、CCS2、TPC、J1772、CHAdeMO / CCS1 規格表
- Tesla Type 2 壁掛座、TPC 壁掛座、Type 2 旅充、CCS2 轉接頭、J1772 轉接器
- JOWUA Model Y 後廂墊 / 收納組、Model 3/Y 螢幕保護貼
- Tesla Air Compressor + Tire Repair Kit 3.0
- 每張產品卡包含圖片、用途、規格限制、官方或商店連結
- 圖片轉成 WebP 放在 `assets/accessories/`

這一段引用 Tesla 台灣家用充電、Tesla 充電產品與轉接器指南、經濟部標準檢驗局充電設備規範，以及 ARTC 電動車充電介面資料。

### 導購與推薦碼

主頁新增購車與配件導購區：

- Tesla 推薦連結：`https://ts.la/wulingteen795928`
- 導購揭露：Tesla referral 可能提供購車優惠或推薦回饋
- 配件商入口：JOWUA、EVANNEX、Abstract Ocean
- 分潤揭露：配件商目前列出商店與分潤申請入口；實際分潤依商店核准帳號與追蹤連結為準

配件清單先聚焦車主最常需要的品類：腳踏墊 / 後廂墊、螢幕保護貼、充電線材收納、補胎與胎壓工具、轉接頭相容性確認。

### 車主檢查清單

主頁把車主真正會在意的訊號拆成幾個面向：

- 充電可靠度：不只看快充速度，也看空樁率、路線規劃和尖離峰成本
- 電池健康：快充頻率、高電量停放、氣候和輪胎設定
- OTA 變化：續航估算、雨刷、輔助駕駛、車機反應和安全提醒
- 維修保值：服務中心等待、料件可得性、二手殘值和保險成本

## 附加價值：免費股價追蹤

股價查詢不是這個 repo 的主服務，只是給車主順手查 TSLA 和相關代理標的的附加工具。它支援免費追蹤模式，不需要付費 API key。

資料來源：

- Stooq 免費 CSV
- 本機 Node proxy：[`stock-proxy.js`](stock-proxy.js)
- 每 60 秒自動刷新
- 手動刷新按鈕
- 若資料源或網路失敗，保留頁面內建快照

目前追蹤標的：

- TSLA
- RKLB, ASTS, IRDM, GSAT
- NVDA, GOOGL, MSFT, META
- RIVN, LCID

注意：免費資料源通常不是交易所官方付費 real-time feed，可能有延遲；適合附加研究追蹤，不適合直接當下單報價。

## 如何在本機預覽

### 只看靜態網頁

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

打開：

```text
http://127.0.0.1:4173/
```

### 開啟免費股價自動追蹤

```bash
node stock-proxy.js
```

打開：

```text
http://127.0.0.1:4174/stock-analysis.html
```

## GitHub Pages 部署建議

如果只部署靜態頁面，GitHub Pages 可以直接使用：

- `index.html`
- `accessories.html`
- `beginner-guide.html`
- `musk-empire.html`
- `stock-analysis.html`
- `styles.css`
- `script.js`
- `musk.js`
- `stocks.js`
- `assets/`

但 GitHub Pages 不能執行 `stock-proxy.js`。因此股票頁在純 GitHub Pages 上會優先嘗試直接連免費資料源，若受 CORS 或網路限制，會顯示內建快照。要穩定自動刷新股價，需要把 `stock-proxy.js` 放在能跑 Node 的免費服務上，例如 Render、Railway、Fly.io 或自己的本機。

## 專案結構

```text
.
├── assets/
│   ├── accessories/
│   ├── vehicles/
│   ├── tesla-info-og.jpg
│   └── musk-empire-hero.png
├── accessories.html
├── beginner-guide.html
├── index.html
├── musk-empire.html
├── stock-analysis.html
├── script.js
├── musk.js
├── stocks.js
├── stock-proxy.js
├── styles.css
└── README.md
```

## 車主回報可以怎麼貢獻

如果要把這個 repo 做成長期車主情報站，最有價值的是真實用車資料：

- 車型與年份
- 輪圈尺寸與輪胎
- 城市 / 高速 / 長途比例
- 家充與快充比例
- 每月 kWh 與電費
- 維修等待時間
- OTA 後的明顯改善或退步
- 二手估價或保險費變化

建議開 issue 時使用這種格式：

```text
車型：
年份：
地區：
年行駛里程：
家充比例：
快充比例：
最近一次 OTA：
想回報的重點：
```

## 聲明

這是車主資訊與研究工具，不是 Tesla 官方網站，也不是個人化投資建議。所有股價、財務與公司資料都應在使用前重新查核官方來源與最新資料。

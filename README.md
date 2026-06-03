# Tesla 車主工具箱

給特斯拉車主看的用車情報室：把充電、耗電、電池習慣、OTA 更新、維修保值與長途規劃整理成一個可以直接使用的網頁工具。

![Tesla Signal Room hero](assets/tesla-radar-hero.png)

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
| Tesla 車主工具箱 | [`index.html`](index.html) | 主頁，聚焦充電、耗電、電池、OTA、維修保值與用車成本 |
| 相關企業附錄 | [`musk-empire.html`](musk-empire.html) | 附加頁，整理 Tesla 以外的相關企業訊號 |
| 股價附錄 | [`stock-analysis.html`](stock-analysis.html) | 附加頁，用免費資料源追蹤 TSLA 與相關代理標的 |

## 車主會用到的核心功能

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

### 充電標準與轉接頭

主頁新增台灣車主常見的充電入門：

- Type 2 慢充：家用壁掛式充電座、目的地充電與停車場慢充
- CCS2 快充：第三方快充與部分新式快充站可能遇到的規格
- TPC：早期 Tesla 台灣車主需要特別確認的 Tesla 專用規格
- J1772 / CCS1 / CHAdeMO：進口車、舊站點或多規格站點可能遇到
- 轉接頭判斷：先確認車端規格、慢充或快充用途，以及是否使用原廠或合格設備
- 台灣充電情境：有固定車位、沒有家充、長途旅行三種使用情境

這一段引用 Tesla 台灣家用充電、Tesla 充電產品與轉接器指南、經濟部標準檢驗局充電設備規範，以及 ARTC 電動車充電介面資料。

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
│   ├── tesla-radar-hero.png
│   └── musk-empire-hero.png
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

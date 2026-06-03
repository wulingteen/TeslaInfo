const stockFilterButtons = document.querySelectorAll(".stock-filter-button");
const stockRows = document.querySelectorAll("[data-stock-row]");
const stockCards = document.querySelectorAll("[data-stock-card]");
const quoteStatus = document.querySelector("#quoteStatus");
const quoteSource = document.querySelector("#quoteSource");
const quoteUpdatedAt = document.querySelector("#quoteUpdatedAt");
const heroQuoteDate = document.querySelector("#heroQuoteDate");
const refreshQuotesButton = document.querySelector("#refreshQuotes");
const quoteSymbols = [...stockRows].map((row) => row.dataset.symbol).filter(Boolean);
const quoteEndpoint = `/api/quotes?symbols=${quoteSymbols.join(",")}`;
const directQuoteEndpoint = `https://stooq.com/q/l/?s=${quoteSymbols.map((symbol) => symbol.toLowerCase()).join("+")}&f=sd2t2ohlcv&h&e=csv`;
const quoteRefreshMs = 60_000;

function formatPrice(value) {
  const number = Number(value);
  return Number.isFinite(number) ? `$${number.toFixed(2)}` : "--";
}

function formatVolume(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "--";
  if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1)}M`;
  if (number >= 1_000) return `${(number / 1_000).toFixed(1)}K`;
  return `${Math.round(number)}`;
}

function formatOpenCloseChange(open, close) {
  const openNumber = Number(open);
  const closeNumber = Number(close);

  if (!Number.isFinite(openNumber) || !Number.isFinite(closeNumber) || openNumber === 0) {
    return { className: "", value: "--" };
  }

  const percent = ((closeNumber - openNumber) / openNumber) * 100;
  const sign = percent > 0 ? "+" : "";

  return {
    className: percent >= 0 ? "positive" : "negative",
    value: `${sign}${percent.toFixed(2)}%`
  };
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (const character of line) {
    if (character === "\"") {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += character;
    }
  }

  values.push(current);
  return values;
}

function parseQuoteCsv(csv) {
  const lines = csv.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines.shift() || "");

  return lines
    .map((line) => {
      const values = parseCsvLine(line);
      return headers.reduce((row, header, index) => {
        row[header] = values[index];
        return row;
      }, {});
    })
    .filter((row) => row.Symbol && row.Close && row.Close !== "N/D");
}

function setQuoteStatus(text) {
  quoteStatus.textContent = text;
}

function updateQuoteTable(quotes) {
  let latestDate = "";
  let latestTime = "";

  quotes.forEach((quote) => {
    const row = document.querySelector(`[data-symbol="${quote.Symbol}"]`);
    if (!row) return;

    const change = formatOpenCloseChange(quote.Open, quote.Close);
    const closeCell = row.querySelector('[data-quote-field="close"]');
    const changeCell = row.querySelector('[data-quote-field="change"]');
    const volumeCell = row.querySelector('[data-quote-field="volume"]');
    const timeCell = row.querySelector('[data-quote-field="time"]');

    closeCell.textContent = formatPrice(quote.Close);
    changeCell.textContent = change.value;
    changeCell.classList.remove("positive", "negative");
    if (change.className) changeCell.classList.add(change.className);
    volumeCell.textContent = formatVolume(quote.Volume);
    timeCell.textContent = `${quote.Date} ${quote.Time.slice(0, 5)}`;

    latestDate = quote.Date;
    latestTime = quote.Time.slice(0, 5);
  });

  if (latestDate) {
    heroQuoteDate.textContent = `${latestDate} ${latestTime}`;
  }
}

async function fetchQuoteCsv() {
  if (typeof fetch !== "function") {
    throw new Error("This browser cannot run fetch");
  }

  const sameOriginResponse = await fetch(quoteEndpoint, { cache: "no-store" });

  if (sameOriginResponse.ok) {
    quoteSource.textContent = "Stooq 免費 CSV（本機代理）";
    return sameOriginResponse.text();
  }

  const directResponse = await fetch(directQuoteEndpoint, { cache: "no-store" });

  if (!directResponse.ok) {
    throw new Error(`Quote feed returned ${directResponse.status}`);
  }

  quoteSource.textContent = "Stooq 免費 CSV（直接連線）";
  return directResponse.text();
}

async function refreshQuotes() {
  refreshQuotesButton.disabled = true;
  setQuoteStatus("更新中");

  try {
    const csv = await fetchQuoteCsv();
    const quotes = parseQuoteCsv(csv);

    if (!quotes.length) {
      throw new Error("Quote feed returned no valid rows");
    }

    updateQuoteTable(quotes);
    quoteUpdatedAt.textContent = new Date().toLocaleString("zh-TW", {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    setQuoteStatus(`已更新 ${quotes.length} 檔`);
  } catch (error) {
    quoteSource.textContent = "內建快照 fallback";
    setQuoteStatus("免費資料源暫不可用");
    quoteUpdatedAt.textContent = "保留頁面內建快照";
  } finally {
    refreshQuotesButton.disabled = false;
  }
}

stockFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.stockFilter;

    stockFilterButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    stockRows.forEach((row) => {
      const isVisible = filter === "all" || row.dataset.stockRow === filter;
      row.classList.toggle("is-hidden", !isVisible);
    });

    stockCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.stockCard === filter;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

const scenarioInputs = {
  margin: document.querySelector("#marginStress"),
  fsd: document.querySelector("#fsdConfidence"),
  space: document.querySelector("#spaceRisk"),
  ai: document.querySelector("#aiHeat"),
  regulation: document.querySelector("#regDiscount")
};

const scenarioOutputs = {
  margin: document.querySelector("#marginStressValue"),
  fsd: document.querySelector("#fsdConfidenceValue"),
  space: document.querySelector("#spaceRiskValue"),
  ai: document.querySelector("#aiHeatValue"),
  regulation: document.querySelector("#regDiscountValue")
};

const scenarioMeters = {
  tesla: document.querySelector("#teslaScoreMeter"),
  space: document.querySelector("#spaceScoreMeter"),
  ai: document.querySelector("#aiScoreMeter"),
  defense: document.querySelector("#defenseScoreMeter")
};

const scenarioTitle = document.querySelector("#scenarioTitle");
const scenarioCopy = document.querySelector("#scenarioCopy");

function percentage(value) {
  return `${Math.round(value)}%`;
}

function bounded(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function updateScenarioDesk() {
  const margin = Number(scenarioInputs.margin.value);
  const fsd = Number(scenarioInputs.fsd.value);
  const space = Number(scenarioInputs.space.value);
  const ai = Number(scenarioInputs.ai.value);
  const regulation = Number(scenarioInputs.regulation.value);

  scenarioOutputs.margin.textContent = percentage(margin);
  scenarioOutputs.fsd.textContent = percentage(fsd);
  scenarioOutputs.space.textContent = percentage(space);
  scenarioOutputs.ai.textContent = percentage(ai);
  scenarioOutputs.regulation.textContent = percentage(regulation);

  const teslaScore = bounded(fsd * 0.58 + (100 - margin) * 0.32 + ai * 0.1 - regulation * 0.08);
  const spaceScore = bounded(space * 0.72 + (100 - regulation) * 0.18 + ai * 0.1);
  const aiScore = bounded(ai * 0.78 + fsd * 0.08 + (100 - regulation) * 0.14);
  const defenseScore = bounded(margin * 0.36 + regulation * 0.42 + (100 - space) * 0.12 + (100 - ai) * 0.1);

  scenarioMeters.tesla.value = teslaScore;
  scenarioMeters.space.value = spaceScore;
  scenarioMeters.ai.value = aiScore;
  scenarioMeters.defense.value = defenseScore;

  if (margin >= 75 && fsd < 50) {
    scenarioTitle.textContent = "TSLA 估值溢價需要降槓桿看待";
    scenarioCopy.textContent = "當汽車毛利壓力高且 FSD 信心不足，研究重點應回到交付、價格、成本下降與 Energy 是否能補位。";
    return;
  }

  if (space >= 80 && regulation <= 55) {
    scenarioTitle.textContent = "太空衛星 proxy 進入高 beta 區";
    scenarioCopy.textContent = "市場風險偏好強時，RKLB/ASTS 類標的彈性較高，但要用 IRDM/GSAT 監控成熟通訊與頻譜風險。";
    return;
  }

  if (ai >= 85 && regulation < 70) {
    scenarioTitle.textContent = "AI 現金流籃子優先";
    scenarioCopy.textContent = "xAI 未上市時，NVDA、MSFT、GOOGL、META 是比較可交易的 AI 讀法，重點是 capex 能否轉成收入與毛利。";
    return;
  }

  if (regulation >= 80) {
    scenarioTitle.textContent = "監管折價主導估值";
    scenarioCopy.textContent = "當監管折價升高，FSD、衛星頻譜、醫療植入與城市基建都需要更高風險溢酬，策略上應降低純敘事權重。";
    return;
  }

  scenarioTitle.textContent = "Barbell：TSLA 敘事 + AI 現金流";
  scenarioCopy.textContent = "在 AI 熱度高、FSD 信心中等時，市場通常用 TSLA 買選擇權，用 NVDA/MSFT/GOOGL/META 買已驗證現金流。";
}

Object.values(scenarioInputs).forEach((input) => {
  input.addEventListener("input", updateScenarioDesk);
});

refreshQuotesButton.addEventListener("click", refreshQuotes);
refreshQuotes();
setInterval(refreshQuotes, quoteRefreshMs);

updateScenarioDesk();

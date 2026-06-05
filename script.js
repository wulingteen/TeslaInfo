const formatter = new Intl.NumberFormat("zh-TW");

function formatTwd(value) {
  return `NT$${formatter.format(Math.round(value))}`;
}

const modeButtons = document.querySelectorAll(".mode-button");
const signalCards = document.querySelectorAll(".signal-card");

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;

    modeButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    signalCards.forEach((card) => {
      const isVisible = mode === "all" || card.dataset.audience === mode;
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

const revealTargets = document.querySelectorAll(".motion-reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.24 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const modelFitData = {
  "y-juniper": {
    name: "Model Y 煥新版",
    generation: "2025+ / RWD 外觀",
    hero: "assets/vehicles/model-y-rwd.png",
    heroAlt: "Model Y 煥新版 RWD 完整車身去背圖",
    heroFit: "vehicle",
    summary: "Type 2 慢充、第三方 CCS2 快充需看車端適配，外觀與後廂配件需看 2025+ 或 Juniper 標示。",
    slow: "Type 2 壁掛式充電座，家充、公司車位、目的地充電先看電容量與槍頭。",
    fast: "第三方 CCS2 快充先分車端可直接插槍或需轉接；有轉接需求時，用 Tesla 帳戶確認產品適配。",
    starter: "Type 2 壁掛座、螢幕保護貼、補胎打氣組、2025+ 後廂墊。",
    avoid: "後廂墊、遮陽、收納和椅背墊需看 2025+ 或 Juniper 標示。",
    linkText: "看 Model Y 配件",
    linkHref: "accessories.html#owner-accessories",
    visuals: [
      ["慢充", "Type 2 壁掛座", "assets/accessories/type2-wall-connector.webp", "Type 2 壁掛式充電座"],
      ["快充", "CCS2 站點核對", "assets/accessories/ccs2-adapter.webp", "CCS2 轉接頭"],
      ["配件", "2025+ 後廂墊", "assets/accessories/trunk-liner.webp", "Model Y 後廂墊與收納組"],
      ["防護", "螢幕保護貼", "assets/accessories/screen-protector.webp", "中控螢幕保護貼"]
    ]
  },
  "y-legacy": {
    name: "Model Y",
    generation: "2021-2024",
    hero: "assets/vehicles/model-y-legacy.png",
    heroAlt: "2021-2024 Model Y 完整車身去背圖",
    heroFit: "vehicle",
    summary: "Type 2 慢充是主要家充方向，配件需看 2021-2024 標示，避免直接套用煥新版尺寸。",
    slow: "Tesla Type 2 壁掛座官方備註寫明，Type 2 充電規格適用於 2021.08.01 後交付之新車。",
    fast: "第三方快充先核對 CCS2 槍頭、付款 App、站點功率與車端適配。",
    starter: "Type 2 壁掛座、螢幕保護貼、補胎打氣組、2021-2024 後廂墊。",
    avoid: "後廂墊、前廂收納、遮陽和椅背墊需看 2021-2024 標示。",
    linkText: "看配件年份提醒",
    linkHref: "accessories.html#owner-accessories",
    visuals: [
      ["慢充", "Type 2 壁掛座", "assets/accessories/type2-wall-connector.webp", "Type 2 壁掛式充電座"],
      ["旅充", "Type 2 旅充套件", "assets/accessories/mobile-connector.webp", "第二代旅行用 Type 2 充電座套件"],
      ["配件", "2021-2024 後廂墊", "assets/accessories/trunk-liner.webp", "Model Y 後廂墊與收納組"],
      ["輪胎", "補胎打氣組", "assets/accessories/tire-repair-kit.webp", "Tesla 補胎打氣組"]
    ]
  },
  "model3-highland": {
    name: "Model 3",
    generation: "2024+ / Highland",
    hero: "assets/vehicles/model-3-highland.png",
    heroAlt: "Model 3 Highland 完整車身去背圖",
    heroFit: "vehicle",
    summary: "家充先看 Type 2，公共慢充與第三方快充分開判斷，內裝配件需看 Highland 或 2024+ 標示。",
    slow: "Type 2 慢充用於家充、目的地充電、公司車位；安裝前先看電容量、管委會和施工條件。",
    fast: "第三方 CCS2 快充需看車端適配、站點功率、付款 App 與停車費。",
    starter: "螢幕保護貼、補胎打氣組、旅充備援、適用 2024+ 的內裝收納。",
    avoid: "中控周邊、遮陽、腳踏墊和收納配件需看 Highland 或 2024+ 標示。",
    linkText: "看充電產品",
    linkHref: "accessories.html#charging-products",
    visuals: [
      ["慢充", "Type 2 壁掛座", "assets/accessories/type2-wall-connector.webp", "Type 2 壁掛式充電座"],
      ["快充", "CCS2 快充核對", "assets/accessories/ccs2-adapter.webp", "CCS2 轉接頭"],
      ["防護", "螢幕保護貼", "assets/accessories/screen-protector.webp", "中控螢幕保護貼"],
      ["輪胎", "補胎打氣組", "assets/accessories/tire-repair-kit.webp", "Tesla 補胎打氣組"]
    ]
  },
  "tpc-early": {
    name: "早期 Model S / 3 / X",
    generation: "2021-08-01 前交付",
    hero: "assets/vehicles/model-3-tpc-legacy.png",
    heroAlt: "早期 Tesla TPC 車端參考車完整去背圖",
    heroFit: "vehicle",
    summary: "先看車端 TPC 規格，再分開判斷 J1772 慢充與 CCS2 快充轉接需求。",
    slow: "TPC 車主使用第三方 J1772 慢充站時，需看 J1772 轉接器；Tesla 台灣標示最高 19.2 kW。",
    fast: "CCS2 轉接頭官方列出適用區間：2013-09 至 2020-11 Model S、2019-04 至 2021-06-30 Model 3、2017-03 至 2020-11 Model X。",
    starter: "TPC 壁掛座或旅充、J1772 轉接器、CCS2 轉接頭適配確認、補胎打氣組。",
    avoid: "高電流轉接頭先看原廠適配與改裝需求，第三方站點價格和規範由營運商制定。",
    linkText: "看接頭規格",
    linkHref: "accessories.html#connector-specs",
    visuals: [
      ["慢充", "TPC 壁掛座", "assets/accessories/tpc-wall-connector.webp", "TPC 壁掛式充電座"],
      ["轉接", "J1772 慢充", "assets/accessories/j1772-adapter.webp", "SAE J1772 充電轉接器"],
      ["快充", "CCS2 轉接頭", "assets/accessories/ccs2-adapter.webp", "CCS2 轉接頭"],
      ["輪胎", "補胎打氣組", "assets/accessories/tire-repair-kit.webp", "Tesla 補胎打氣組"]
    ]
  }
};

const modelButtons = document.querySelectorAll(".model-button");
const modelStage = document.querySelector(".model-fit-stage");
const modelHeroFrame = document.querySelector(".model-hero-frame");
const modelHeroImage = document.querySelector("#modelHeroImage");
const modelName = document.querySelector("#modelName");
const modelGeneration = document.querySelector("#modelGeneration");
const modelSummary = document.querySelector("#modelSummary");
const modelSlow = document.querySelector("#modelSlow");
const modelFast = document.querySelector("#modelFast");
const modelStarter = document.querySelector("#modelStarter");
const modelAvoid = document.querySelector("#modelAvoid");
const modelPrimaryLink = document.querySelector("#modelPrimaryLink");
const fitSlots = [0, 1, 2, 3].map((index) => ({
  image: document.querySelector(`#fitImage${index}`),
  tag: document.querySelector(`#fitTag${index}`),
  title: document.querySelector(`#fitTitle${index}`)
}));
let modelSwitchTimer;

function applyModelFit(modelKey) {
  const model = modelFitData[modelKey];

  if (!model || !modelStage) {
    return;
  }

  window.clearTimeout(modelSwitchTimer);
  modelStage.classList.add("is-switching");

  modelSwitchTimer = window.setTimeout(() => {
    modelHeroImage.src = model.hero;
    modelHeroImage.alt = model.heroAlt;
    modelHeroImage.dataset.fit = model.heroFit;
    modelHeroFrame.dataset.fit = model.heroFit;
    modelName.textContent = model.name;
    modelGeneration.textContent = model.generation;
    modelSummary.textContent = model.summary;
    modelSlow.textContent = model.slow;
    modelFast.textContent = model.fast;
    modelStarter.textContent = model.starter;
    modelAvoid.textContent = model.avoid;
    modelPrimaryLink.textContent = model.linkText;
    modelPrimaryLink.href = model.linkHref;

    fitSlots.forEach((slot, index) => {
      const visual = model.visuals[index];
      slot.tag.textContent = visual[0];
      slot.title.textContent = visual[1];
      slot.image.src = visual[2];
      slot.image.alt = visual[3];
    });

    modelStage.classList.remove("is-switching");
  }, 140);
}

modelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modelKey = button.dataset.model;

    modelButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    applyModelFit(modelKey);
  });
});

const annualKm = document.querySelector("#annualKm");
const homeShare = document.querySelector("#homeShare");
const serviceBudget = document.querySelector("#serviceBudget");
const homeRate = document.querySelector("#homeRate");
const fastRate = document.querySelector("#fastRate");
const fuelPrice = document.querySelector("#fuelPrice");
const fuelEfficiency = document.querySelector("#fuelEfficiency");
const kmValue = document.querySelector("#kmValue");
const homeValue = document.querySelector("#homeValue");
const serviceValue = document.querySelector("#serviceValue");
const energyUse = document.querySelector("#energyUse");
const chargeCost = document.querySelector("#chargeCost");
const fuelDelta = document.querySelector("#fuelDelta");
const ownerTotal = document.querySelector("#ownerTotal");
const epaModelYLongRangeAwdKwhPer100Km = 17.1;

function readNumber(input, fallback) {
  const value = Number(input.value);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function updateOwnerCalculator() {
  const km = Number(annualKm.value);
  const home = Number(homeShare.value) / 100;
  const service = Number(serviceBudget.value);
  const homePrice = readNumber(homeRate, 2.06);
  const fastPrice = readNumber(fastRate, 12);
  const gasPrice = readNumber(fuelPrice, 33.9);
  const gasEfficiency = Math.max(readNumber(fuelEfficiency, 12), 1);
  const kwh = (km / 100) * epaModelYLongRangeAwdKwhPer100Km;
  const electricityCost = kwh * home * homePrice + kwh * (1 - home) * fastPrice;
  const fuelCost = (km / gasEfficiency) * gasPrice;
  const delta = fuelCost - electricityCost;

  kmValue.textContent = `${formatter.format(km)} km`;
  homeValue.textContent = `${Math.round(home * 100)}%`;
  serviceValue.textContent = formatTwd(service);
  energyUse.textContent = `${formatter.format(Math.round(kwh))} kWh`;
  chargeCost.textContent = formatTwd(electricityCost);
  fuelDelta.textContent = delta >= 0 ? `省 ${formatTwd(delta)}` : `多 ${formatTwd(Math.abs(delta))}`;
  ownerTotal.textContent = formatTwd(electricityCost + service);
}

[annualKm, homeShare, serviceBudget, homeRate, fastRate, fuelPrice, fuelEfficiency].forEach((input) => {
  input.addEventListener("input", updateOwnerCalculator);
});

updateOwnerCalculator();

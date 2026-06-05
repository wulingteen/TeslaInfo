const formatter = new Intl.NumberFormat("zh-TW");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function formatTwd(value) {
  return `NT$${formatter.format(Math.round(value))}`;
}

const autoRevealSelectors = [
  ".answer-strip article",
  ".metric-card",
  ".warranty-panel",
  ".charging-card",
  ".affiliate-card",
  ".signal-card",
  ".tool-card",
  ".faq-card",
  ".source-list li"
];

document
  .querySelectorAll(autoRevealSelectors.join(", "))
  .forEach((element) => element.classList.add("motion-reveal"));

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

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
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

const heroSection = document.querySelector(".hero");
const scrollMotionSections = [
  document.querySelector(".answer-band"),
  document.querySelector(".model-match-band"),
  document.querySelector(".pulse-band"),
  document.querySelector(".charging-band"),
  document.querySelector(".tools-band")
].filter(Boolean);
let scrollMotionFrame = 0;

function clampMotion(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smoothMotion(value) {
  const progress = clampMotion(value);
  return progress * progress * (3 - 2 * progress);
}

function updateScrollMotion() {
  scrollMotionFrame = 0;

  if (prefersReducedMotion.matches) {
    return;
  }

  const viewportHeight = window.innerHeight || 1;

  if (heroSection) {
    const rect = heroSection.getBoundingClientRect();
    const progress = smoothMotion((-rect.top) / Math.max(rect.height * 0.92, 1));
    heroSection.style.setProperty("--hero-media-x", `${-42 * progress}px`);
    heroSection.style.setProperty("--hero-media-y", `${-28 * progress}px`);
    heroSection.style.setProperty("--hero-media-scale", (1 + progress * 0.045).toFixed(3));
    heroSection.style.setProperty("--hero-media-opacity", (1 - progress * 0.24).toFixed(3));
    heroSection.style.setProperty("--hero-copy-y", `${-22 * progress}px`);
    heroSection.style.setProperty("--hero-copy-opacity", (1 - progress * 0.16).toFixed(3));
  }

  scrollMotionSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const raw = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const progress = smoothMotion(raw);
    const stageProgress = smoothMotion((viewportHeight - rect.top) / Math.max(viewportHeight * 0.95, 1));
    section.style.setProperty("--section-progress", progress.toFixed(3));
    section.style.setProperty("--stage-y", `${34 * (1 - stageProgress)}px`);
    section.style.setProperty("--stage-scale", (0.985 + stageProgress * 0.015).toFixed(3));
    section.style.setProperty("--stage-opacity", (0.78 + stageProgress * 0.22).toFixed(3));
    section.style.setProperty("--section-glow-y", `${-18 * progress}px`);
    section.style.setProperty("--vehicle-x", `${26 * (0.5 - progress)}px`);
    section.style.setProperty("--vehicle-y", `${14 * progress}px`);
    section.style.setProperty("--vehicle-scale", (1 + progress * 0.014).toFixed(3));
  });
}

function requestScrollMotion() {
  if (!scrollMotionFrame) {
    scrollMotionFrame = window.requestAnimationFrame(updateScrollMotion);
  }
}

if (!prefersReducedMotion.matches) {
  document.documentElement.classList.add("has-scroll-motion");
  requestScrollMotion();
  window.addEventListener("scroll", requestScrollMotion, { passive: true });
  window.addEventListener("resize", requestScrollMotion);
}

const modelFitData = {
  "y-juniper": {
    name: "Model Y 煥新版",
    generation: "2025+ / RWD 外觀",
    hero: "assets/vehicles/model-y-rwd.png?v=20260605-license",
    heroAlt: "Model Y 煥新版 RWD 完整車身去背圖",
    heroFit: "vehicle",
    summary: "2025+ Model Y 煥新版配件看 Juniper 或 2025+ 標示；慢充用 Type 2，第三方快充看 CCS2 車端適配。",
    slow: "家充或公司車位用 Type 2 壁掛座；安裝前確認電容量、管委會流程和施工報價。",
    fast: "CCS2 快充先看車端可否直插、站點功率和付款 App；轉接需求用 Tesla 帳戶核對適配。",
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
    hero: "assets/vehicles/model-y-legacy.png?v=20260605-license",
    heroAlt: "2021-2024 Model Y 完整車身去背圖",
    heroFit: "vehicle",
    summary: "2021-2024 Model Y 不套用煥新版後廂、遮陽和收納尺寸；充電孔仍需實車核對。",
    slow: "Tesla Type 2 壁掛座官方備註寫明，Type 2 充電規格適用於 2021.08.01 後交付新車。",
    fast: "第三方快充先核對 CCS2 槍頭、付款 App、停車費、站點功率與車端適配。",
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
    hero: "assets/vehicles/model-3-highland.png?v=20260605-license",
    heroAlt: "Model 3 Highland 完整車身去背圖",
    heroFit: "vehicle",
    summary: "Model 3 Highland 內裝周邊、腳踏墊、遮陽和收納需看 2024+ 標示；家充看 Type 2。",
    slow: "Type 2 慢充用於家充、目的地充電、公司車位；安裝前確認電容量、管委會和施工條件。",
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
    hero: "assets/vehicles/model-3-tpc-legacy.png?v=20260605-license",
    heroAlt: "早期 Tesla TPC 車端參考車完整去背圖",
    heroFit: "vehicle",
    summary: "2021-08-01 前交付車先看充電孔。TPC 車可能需要 J1772 慢充轉接器或 CCS2 快充轉接頭。",
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

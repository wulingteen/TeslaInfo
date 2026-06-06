const formatter = new Intl.NumberFormat("zh-TW");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function formatTwd(value) {
  return `NT$${formatter.format(Math.round(value))}`;
}

const autoRevealSelectors = [
  ".answer-strip article",
  ".vehicle-strip article",
  ".dense-table-wrap",
  ".beginner-stats article",
  ".metric-card",
  ".warranty-panel",
  ".charging-card",
  ".connector-gallery article",
  ".product-card",
  ".affiliate-card",
  ".affiliate-hero-card",
  ".owner-board article",
  ".tool-card",
  ".faq-card",
  ".source-list li"
];

document
  .querySelectorAll(autoRevealSelectors.join(", "))
  .forEach((element) => element.classList.add("motion-reveal"));

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
    { threshold: 0.2 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const heroSection = document.querySelector(".hero");
const scrollMotionSections = [
  ".answer-band",
  ".model-match-band",
  "#owner-setup",
  ".pulse-band",
  ".charging-band",
  "#accessory-guide",
  ".radar-band",
  ".tools-band",
  "#market-appendix"
].map((selector) => document.querySelector(selector)).filter(Boolean);
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
const calculatorInputs = [annualKm, homeShare, serviceBudget, homeRate, fastRate, fuelPrice, fuelEfficiency];
const calculatorOutputs = [kmValue, homeValue, serviceValue, energyUse, chargeCost, fuelDelta, ownerTotal];
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

if (calculatorInputs.every(Boolean) && calculatorOutputs.every(Boolean)) {
  calculatorInputs.forEach((input) => {
    input.addEventListener("input", updateOwnerCalculator);
  });

  updateOwnerCalculator();
}

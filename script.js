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

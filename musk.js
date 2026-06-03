const empireButtons = document.querySelectorAll(".empire-mode-button");
const empireCards = document.querySelectorAll(".empire-card");

empireButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const track = button.dataset.track;

    empireButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    empireCards.forEach((card) => {
      const tracks = card.dataset.track.split(" ");
      const isVisible = track === "all" || tracks.includes(track);
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});

const riskInputs = {
  auto: document.querySelector("#autoPressure"),
  space: document.querySelector("#spaceCadence"),
  compute: document.querySelector("#computeRace"),
  regulation: document.querySelector("#regulatoryDrag")
};

const riskOutputs = {
  auto: document.querySelector("#autoPressureValue"),
  space: document.querySelector("#spaceCadenceValue"),
  compute: document.querySelector("#computeRaceValue"),
  regulation: document.querySelector("#regulatoryDragValue")
};

const meters = {
  tesla: document.querySelector("#teslaMeter"),
  space: document.querySelector("#spaceMeter"),
  ai: document.querySelector("#aiMeter"),
  regulated: document.querySelector("#regulatedMeter")
};

const attentionTitle = document.querySelector("#attentionTitle");
const attentionCopy = document.querySelector("#attentionCopy");

function percent(value) {
  return `${Math.round(value)}%`;
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function updateEmpireRisk() {
  const auto = Number(riskInputs.auto.value);
  const space = Number(riskInputs.space.value);
  const compute = Number(riskInputs.compute.value);
  const regulation = Number(riskInputs.regulation.value);

  riskOutputs.auto.textContent = percent(auto);
  riskOutputs.space.textContent = percent(space);
  riskOutputs.compute.textContent = percent(compute);
  riskOutputs.regulation.textContent = percent(regulation);

  const teslaScore = clamp(auto * 0.72 + compute * 0.18 + regulation * 0.1);
  const spaceScore = clamp(space * 0.72 + regulation * 0.2 + compute * 0.08);
  const aiScore = clamp(compute * 0.78 + auto * 0.08 + regulation * 0.14);
  const regulatedScore = clamp(regulation * 0.76 + space * 0.12 + compute * 0.12);

  meters.tesla.value = teslaScore;
  meters.space.value = spaceScore;
  meters.ai.value = aiScore;
  meters.regulated.value = regulatedScore;

  if (auto >= 75 && regulation >= 70) {
    attentionTitle.textContent = "Tesla 與監管風險優先";
    attentionCopy.textContent = "汽車需求壓力加上監管摩擦時，市場會先看 Tesla 現金流、車價、FSD 安全與公開財報。";
    return;
  }

  if (space >= 75 && regulation < 60) {
    attentionTitle.textContent = "SpaceX / Starlink 是主線";
    attentionCopy.textContent = "發射與衛星節奏若維持高檔，最該追 Starship 測試、Starlink 覆蓋、政府合約與頻譜政策。";
    return;
  }

  if (compute >= 85) {
    attentionTitle.textContent = "AI 算力競賽主導敘事";
    attentionCopy.textContent = "xAI/Grok 的模型能力、API 採用、X Premium+ 分發與資料治理會成為整個帝國最敏感訊號。";
    return;
  }

  if (regulation >= 80) {
    attentionTitle.textContent = "醫療與城市基建需要降噪追蹤";
    attentionCopy.textContent = "Neuralink 與 Boring Company 的進度不能只看願景，必須回到臨床、施工、審批與責任歸屬。";
    return;
  }

  attentionTitle.textContent = "AI 與基建同時升溫";
  attentionCopy.textContent = "xAI/Grok、Starlink 與 SpaceX 的節奏會互相牽動，Tesla 仍是現金流與市場情緒的錨點。";
}

Object.values(riskInputs).forEach((input) => {
  input.addEventListener("input", updateEmpireRisk);
});

updateEmpireRisk();

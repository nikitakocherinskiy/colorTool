const hexInput = document.querySelector("#hexInput");
const inputColor = document.querySelector("#inputColor");
const alteredColor = document.querySelector("#alteredColor");
const alteredColorText = document.querySelector("#alteredColorText");
const sliderText = document.querySelector("#sliderText");
const slider = document.querySelector("#slider");
const lightenText = document.querySelector("#lightenText");
const darkenText = document.querySelector("#darkenText");
const toggleBtn = document.querySelector("#toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (!lightenText.classList.contains("unselected")) {
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
    toggleBtn.classList.add("toggled");
  } else {
    darkenText.classList.add("unselected");
    lightenText.classList.remove("unselected");
    toggleBtn.classList.remove("toggled");
  }
  reset();
});

hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  console.log(hex);
  if (!checkHex(hex)) return;

  const strippedHEx = hex.replace("#", "");

  inputColor.style.backgroundColor = "#" + strippedHEx;
  reset();
});

const checkHex = (hex) => {
  if (!hex) return true;

  const strippedHEx = hex.replace("#", "");
  return strippedHEx.length === 3 || strippedHEx.length === 6;
};

const convertHexToRGB = (hex) => {
  if (!checkHex(hex)) return null;
  let strippedHex = hex.replace("#", "");
  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

const convertRGBToHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
};

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);

  const amount = Math.floor((percentage / 100) * 255);

  const newR = belowOrAboveRange(r, amount);
  const newG = belowOrAboveRange(g, amount);
  const newB = belowOrAboveRange(b, amount);
  return convertRGBToHex(newR, newG, newB);
};

const belowOrAboveRange = (hex, amount) => {
  // const newHex = hex + amount;
  // if (newHex > 255) return 255;
  // if (newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
};

alterColor("#fff", 10);

slider.addEventListener("input", () => {
  if (!checkHex(hexInput.value)) return;

  sliderText.textContent = `${slider.value}%`;
  const valueAddition = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;

  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

const reset = () => {
  slider.value = 0;
  sliderText.textContent = `${slider.value}%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};

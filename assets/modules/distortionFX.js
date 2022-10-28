let distortionLevelSlider = document.getElementById("distortion-level");
let distortionLevelValue = document.getElementById("distortion-level-value");
distortionLevelValue.innerHTML = distortionLevelSlider.value;

let bitCrusherLevelSlider = document.getElementById("bitcrusher-level");
let bitCrusherLevelValue = document.getElementById("bitcrusher-level-value");
bitCrusherLevelValue.innerHTML = bitCrusherLevelSlider.value;

const dist = new Tone.Distortion(distortionLevelSlider.value).toDestination();
const crusher = new Tone.BitCrusher(bitCrusherLevelSlider.value).toDestination();

distortionLevelSlider.oninput = function () {
  distortionLevelValue.innerHTML = this.value;
  console.log("Slider value: ", distortionLevelValue.innerHTML);
  updateDistortionSliders();
};

bitCrusherLevelSlider.oninput = function () {
  bitCrusherLevelValue.innerHTML = this.value;
  console.log("Slider value: ", bitCrusherLevelValue.innerHTML);
  updateDistortionSliders();
};

function updateDistortionSliders() {
  dist.distortion = distortionLevelValue.innerHTML;
  crusher.bits = bitCrusherLevelValue.innerHTML;
}

// export { dist, crusher };
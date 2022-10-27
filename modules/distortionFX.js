let distortionLevelSlider = document.getElementById("distortion-level");
let distortionLevelValue = document.getElementById("distortion-level-value");
distortionLevelValue.innerHTML = distortionLevelSlider.value;

const dist = new Tone.Distortion(distortionLevelSlider.value).toDestination();

distortionLevelSlider.oninput = function () {
  distortionLevelValue.innerHTML = this.value;
  console.log("Slider value: ", distortionLevelValue.innerHTML);
  updateDistortionSlider();
};

function updateDistortionSlider() {
  dist.distortion = distortionLevelValue.innerHTML;
}
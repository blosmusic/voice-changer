let chorusFrequencySlider = document.getElementById("chorus-frequency");
let chorusFrequencyValue = document.getElementById("chorus-frequency-value");
chorusFrequencyValue.innerHTML = chorusFrequencySlider.value;

let chorusDelaySlider = document.getElementById("chorus-delay");
let chorusDelayValue = document.getElementById("chorus-delay-value");
chorusDelayValue.innerHTML = chorusDelaySlider.value;

let chorusDepthSlider = document.getElementById("chorus-depth");
let chorusDepthValue = document.getElementById("chorus-depth-value");
chorusDepthValue.innerHTML = chorusDepthSlider.value;

const chorus = new Tone.Chorus(
  chorusFrequencySlider.value,
  chorusDelaySlider.value,
  chorusDepthSlider.value
)
  .toDestination()
  .start();

chorusFrequencySlider.oninput = function () {
  chorusFrequencyValue.innerHTML = this.value;
  console.log("Slider value: ", chorusFrequencyValue.innerHTML);
  updateChorusSliders();
};

chorusDelaySlider.oninput = function () {
  chorusDelayValue.innerHTML = this.value;
  console.log("Slider value: ", chorusDelayValue.innerHTML);
  updateChorusSliders();
};

chorusDepthSlider.oninput = function () {
  chorusDepthValue.innerHTML = this.value;
  console.log("Slider value: ", chorusDepthValue.innerHTML);
  updateChorusSliders();
};

function updateChorusSliders() {
  chorus.frequency = chorusFrequencyValue.innerHTML;
  chorus.delayTime = chorusDelayValue.innerHTML;
  chorus.depth = chorusDepthValue.innerHTML;
}

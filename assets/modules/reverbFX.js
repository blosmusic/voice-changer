let reverbDecaySlider = document.getElementById("reverb-level");
let reverbDecayValue = document.getElementById("reverb-level-value");
reverbDecayValue.innerHTML = reverbDecaySlider.value;

const reverb = new Tone.Reverb(reverbDecaySlider.value).toDestination();

reverbDecaySlider.oninput = function () {
  reverbDecayValue.innerHTML = this.value;
  console.log("Slider value: ", reverbDecayValue.innerHTML);
  updateReverbSliders();
};

function updateReverbSliders() {
  reverb.decay = reverbDecayValue.innerHTML;
}

let reverbSizeSlider = document.getElementById("reverb-size");
let reverbSizeValue = document.getElementById("reverb-size-value");
reverbSizeValue.innerHTML = reverbSizeSlider.value;

const reverb = new Tone.JCReverb(reverbSizeSlider.value).toDestination();

reverbSizeSlider.oninput = function () {
  reverbSizeValue.innerHTML = this.value;
  console.log("Slider value: ", reverbSizeValue.innerHTML);
  updateReverbSliders();
};

function updateReverbSliders() {
  reverb.roomSize = reverbSizeValue.innerHTML;
}

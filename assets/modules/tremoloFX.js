let tremoloFrequencySlider = document.getElementById("tremolo-frequency");
let tremoloFrequencyValue = document.getElementById("tremolo-frequency-value");
tremoloFrequencyValue.innerHTML = tremoloFrequencySlider.value;

let tremoloDepthSlider = document.getElementById("tremolo-depth");
let tremoloDepthValue = document.getElementById("tremolo-depth-value");
tremoloDepthValue.innerHTML = tremoloDepthSlider.value;

const tremolo = new Tone.Tremolo(
  tremoloFrequencySlider.value,
  tremoloDepthSlider.value
)
  .toDestination()
  .start();

  tremoloFrequencySlider.oninput = function () {
    tremoloFrequencyValue.innerHTML = this.value;
    console.log("Slider value: ", tremoloFrequencyValue.innerHTML);
    updateTremoloSliders();
  };

  tremoloDepthSlider.oninput = function () {
    tremoloDepthValue.innerHTML = this.value;
    console.log("Slider value: ", tremoloDepthValue.innerHTML);
    updateTremoloSliders();
  };

  function updateTremoloSliders() {
    tremolo.frequency = tremoloFrequencyValue.innerHTML;
    tremolo.depth = tremoloDepthValue.innerHTML;
  }

//  export { tremolo };
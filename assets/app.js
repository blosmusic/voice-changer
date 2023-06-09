document.querySelector("h4").addEventListener("click", async () => {
  await Tone.start();
  document.querySelector("h4").innerText = "Permission Granted";
  console.log("audio is ready");
});

let voiceStartToggle = document.getElementById("voice-start-toggle");
let micIndicator = document.getElementById("mic-indication");
// get microphone input
const meter = new Tone.Meter(0.8);
const micFFT = new Tone.FFT(32);
let inputLevelValueRead = null;
const destination = Tone.Destination;
const mic = new Tone.UserMedia();

// read input level - check if mic is open
function processAudioInputLevel() {
  console.log("processAudioInputLevel called");
  inputLevelValueRead = meter.getValue().toFixed(2);
  // print the incoming mic levels in decibels
  console.log("The Decibel level is:", inputLevelValueRead, "dB");
}

// toggle mic on/off
voiceStartToggle.addEventListener("click", () => {
  if (voiceStartToggle.innerText === "START") {
    startVoiceChanger();
  } else if (voiceStartToggle.innerText === "STOP") {
    stopVoiceChanger();
  }
});

function startVoiceChanger() {
  voiceStartToggle.innerText = "STOP";
  console.log("mic started");
  micIndicator.style.backgroundColor = "red";
  micIndicator.style.boxShadow = "0 0 0 1.5px red";
  mic
    .open()
    .then(() => {
      // promise resolves when input is available
      console.log("mic open");
      // what to do when the mic is open
      mic
        .chain(
          shift,
          dist,
          crusher,
          chorus,
          tremolo,
          feedbackDelay,
          reverb,
          meter,
          destination
        )
        .start();
      // check input levels
      // setInterval(processAudioInputLevel, 1000);
    })
    .catch((e) => {
      // promise is rejected when the user doesn't have or allow mic access
      console.log("mic not open");
    });
}

function stopVoiceChanger() {
  voiceStartToggle.innerText = "START";
  console.log("mic stopped");
  micIndicator.style.backgroundColor = "darkred";
  micIndicator.style.boxShadow = "0 0 0 0 #333";
  mic.close();
}

// Pitch Shifter
let pitchShifterSlider = document.getElementById("pitch-level");
let pitchShifterValue = document.getElementById("pitch-level-value");
pitchShifterValue.innerHTML = pitchShifterSlider.value;

const shift = new Tone.FrequencyShifter(pitchShifterSlider.value);

pitchShifterSlider.oninput = function () {
  pitchShifterValue.innerHTML = this.value;
  console.log("Slider value: ", pitchShifterValue.innerHTML);
  updatePitchSliders();
};

function updatePitchSliders() {
  shift.frequency = pitchShifterValue.innerHTML;
}

// Distortion
let distortionLevelSlider = document.getElementById("distortion-level");
let distortionLevelValue = document.getElementById("distortion-level-value");
distortionLevelValue.innerHTML = distortionLevelSlider.value;

let bitCrusherLevelSlider = document.getElementById("bitcrusher-level");
let bitCrusherLevelValue = document.getElementById("bitcrusher-level-value");
bitCrusherLevelValue.innerHTML = bitCrusherLevelSlider.value;

const dist = new Tone.Distortion(distortionLevelSlider.value);
const crusher = new Tone.BitCrusher(bitCrusherLevelSlider.value);

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

// Chorus
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
);

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

// Tremolo
let tremoloFrequencySlider = document.getElementById("tremolo-frequency");
let tremoloFrequencyValue = document.getElementById("tremolo-frequency-value");
tremoloFrequencyValue.innerHTML = tremoloFrequencySlider.value;

let tremoloDepthSlider = document.getElementById("tremolo-depth");
let tremoloDepthValue = document.getElementById("tremolo-depth-value");
tremoloDepthValue.innerHTML = tremoloDepthSlider.value;

const tremolo = new Tone.Tremolo(
  tremoloFrequencySlider.value,
  tremoloDepthSlider.value
);

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

// Delay
let delayTimeSlider = document.getElementById("delay-time");
let delayTimeValue = document.getElementById("delay-time-value");
delayTimeValue.innerHTML = delayTimeSlider.value;

let delayFeedbackSlider = document.getElementById("delay-feedback");
let delayFeedbackValue = document.getElementById("delay-feedback-value");
delayFeedbackValue.innerHTML = delayFeedbackSlider.value;

const feedbackDelay = new Tone.FeedbackDelay(
  delayTimeSlider.value,
  delayFeedbackSlider.value
);

delayTimeSlider.oninput = function () {
  delayTimeValue.innerHTML = this.value;
  console.log("Slider value: ", delayTimeValue.innerHTML);
  updateDelaySliders();
};

delayFeedbackSlider.oninput = function () {
  delayFeedbackValue.innerHTML = this.value;
  console.log("Slider value: ", delayFeedbackValue.innerHTML);
  updateDelaySliders();
};

function updateDelaySliders() {
  feedbackDelay.delayTime = delayFeedbackValue.innerHTML;
  feedbackDelay.feedback = delayTimeValue.innerHTML;
}

// Reverb
let reverbSizeSlider = document.getElementById("reverb-size");
let reverbSizeValue = document.getElementById("reverb-size-value");
reverbSizeValue.innerHTML = reverbSizeSlider.value;

const reverb = new Tone.JCReverb(reverbSizeSlider.value);

reverbSizeSlider.oninput = function () {
  reverbSizeValue.innerHTML = this.value;
  console.log("Slider value: ", reverbSizeValue.innerHTML);
  updateReverbSliders();
};

function updateReverbSliders() {
  reverb.roomSize = reverbSizeValue.innerHTML;
}

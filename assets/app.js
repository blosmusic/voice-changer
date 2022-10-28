// import FX modules
// todo figure out importing modules
// import { dist } from "./modules/distortionFX.js";
// import { crusher } from "./modules/distortionFX.js";
// import { chorus } from "./modules/chorusFX.js";
// import { tremolo } from "./modules/tremoloFX.js";
// import { feedbackDelay } from "./modules/delayFX.js";

document.querySelector("body").addEventListener("click", async () => {
  await Tone.start();
  console.log("context started");
});

let voiceStartToggle = document.getElementById("voice-start-toggle");
let micIndicator = document.getElementById("mic-indication");
// get microphone input
const meter = new Tone.Meter(0.8);
const micFFT = new Tone.FFT(32);
let inputLevelValueRead = null;

const mic = new Tone.UserMedia().chain(micFFT, meter);

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
      mic.chain(shift, dist, chorus, tremolo, feedbackDelay, reverb).start();
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

// import FX modules
// todo figure out importing modules
// import { dist } from "./modules/distortionFX.js";
// import { crusher } from "./modules/distortionFX.js";
// import { chorus } from "./modules/chorusFX.js";
// import { tremolo } from "./modules/tremoloFX.js";
// import { feedbackDelay } from "./modules/delayFX.js";


let voiceStartToggle = document.getElementById("voice-start-toggle");
let micIndicator = document.getElementById("mic-indication");
// get microphone input
const meter = new Tone.Meter(0.8);
const micFFT = new Tone.FFT(32);
let inputLevelValueRead = null;

const mic = new Tone.UserMedia();//.chain(micFFT, meter);

// const dist = new Tone.Distortion(0.8).toDestination();
// const crusher = new Tone.BitCrusher(4).toDestination();
// const chorus = new Tone.Chorus(10, 0.5, 0.6).toDestination().start();
// const tremolo = new Tone.Tremolo(8, 0.4).toDestination().start();
// const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

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
      //todo - add a visual indicator that the mic is open
      
      //chain the mic to the voice changer
      mic.chain(dist, crusher, chorus, tremolo, feedbackDelay).start();
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

let delayTimeSlider = document.getElementById("delay-time");
let delayTimeValue = document.getElementById("delay-time-value");
delayTimeValue.innerHTML = delayTimeSlider.value;

let delayFeedbackSlider = document.getElementById("delay-feedback");
let delayFeedbackValue = document.getElementById("delay-feedback-value");
delayFeedbackValue.innerHTML = delayFeedbackSlider.value;

const feedbackDelay = new Tone.FeedbackDelay(
  delayTimeSlider.value,
  delayFeedbackSlider.value
).toDestination();

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

// export { feedbackDelay };
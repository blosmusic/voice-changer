let delayTimeSlider = document.getElementById("delay-time");
let delayTimeValue = document.getElementById("delay-time-value");
delayTimeValue.innerHTML = delayTimeSlider.value;

let delayFeedbackSlider = document.getElementById("delay-feedback");
let delayFeedbackValue = document.getElementById("delay-feedback-value");
delayFeedbackValue.innerHTML = delayDelaySlider.value;

const feedbackDelay = new Tone.FeedbackDelay(
  delayTimeSlider.value,
  delayDelaySlider.value
).toDestination();

delayTimeSlider.oninput = function () {
  delayTimeValue.innerHTML = this.value;
  console.log("Slider value: ", delayTimeValue.innerHTML);
  updateDelaySliders();
};

delayDelaySlider.oninput = function () {
  delayFeedbackValue.innerHTML = this.value;
  console.log("Slider value: ", delayFeedbackValue.innerHTML);
  updateDelaySliders();
};

function updateDelaySliders() {
  delay.delayTime = delayFeedbackValue.innerHTML;
  delay.feedback = delayTimeValue.innerHTML;
}

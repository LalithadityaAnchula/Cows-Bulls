var attempts = 10;
var attempt = 0;
var answer = "";
var digits = 0;
var num = 0;
var success = $(".alert-success");
var failure = $(".alert-warning");
var myInput = $("#validationInput");
var myChoice = $('#validation-choice');
var prompt = $(".digits");
var progressBar = $(".life");
var validate = $(".validate-button");
var submit = $(".submit-button");

myChoice.change(function() {
  digits = Number($(this).children("option:selected").val());
  myChoice.slideUp("fast");
  $(".play").slideDown();
  progressBar.slideDown();
  prompt.text("Try to guess the " + digits + " digit number, you have " + attempts + " attempts");
  validate.slideDown();
  submit.slideDown();
  startGame(digits);
});

function startGame(n) {
  while (answer.length < n) {
    var randomDigit = getRandomNumber();
    if (answer.includes(randomDigit) == false)
      answer += String(randomDigit);
  }
  myInput.attr("placeholder", n+" digit number");
}

function getRandomNumber() {
  return String(1 + Math.floor(Math.random() * 9));
}

//Adding Event Listeners to buttons..
validate.click(
  function() {
    if (attempts <= 0) failAnimation();
    if (checkInput() == false){
      bounce(myInput);
      myInput.addClass("is-invalid");
      prompt.text("Please enter valid input");
    }
    else {
      myInput.removeClass("is-invalid");
      myInput.addClass("is-valid");
      validate_input(num);
    }
  });

submit.click(function() {
    location.reload();
  });

//Evaluating input & giving feedback

function checkInput() {
  if (attempts <= 4) {
    progressBar.addClass("bg-danger");
    setInterval(function() {
      progressBar.fadeToggle(1000);
    }, 600);
  }
  num = String(myInput.val());
  if ($.isNumeric(num) && num.length <= digits) return true;
  else return false;
}

function validate_input(num) {
  if (answer == num) won();
  else {
    giveFeedback();
    updateProgressBar();
  }
}

function giveFeedback(){
  bulls = getBulls(num);
  cows = getCows(num);
  if (cows >= bulls)
    cows = cows - bulls;
  attempt = attempt + 1;
  attempts = attempts - 1;
  prompt.text(cows + " cows & " + bulls + " bulls");
}

//Getting Cows and BUlls..

function getCows(num) {
  num = String(num);
  ans = String(answer);
  cows = 0;
  for (i = 0; i < digits; i++) {
    for (j = 0; j < digits; j++) {
      if (num[i] == ans[j])
        cows = cows + 1;
    }
  }
  return cows;
}

function getBulls(num) {
  bulls = 0;
  num = String(num);
  ans = String(answer);

  for (i = 0; i < digits; i++) {
    if (num[i] == ans[i])
      bulls = bulls + 1;
  }
  return bulls;
}

//Animations using Jquery..

function updateProgressBar(){
  progressValue = attempts * 10;
  progressBar.css('width', progressValue + "%");
  progressBar.attr('aria-valuenow', progressValue);
}

function bounce(thing) {
  var interval = 100;
  var distance = 20;
  var times = 6;
  var damping = 0.8;

  for (var i = 0; i < (times + 1); i++) {
    var amt = Math.pow(-1, i) * distance / (i * damping);
    $(thing).animate({
      top: amt
    }, 100);
  }
  $(thing).animate({
    top: 0
  }, interval);
}

function failAnimation() {
  bounce($(".progress"));
  $(".progress").fadeOut();
  prompt.slideUp();
  validate.slideUp();
  failure.text("You gave your best , " + answer + " was the answer");
  failure.slideDown();
}

function won() {
  prompt.text("You are amaizing !")
  success.slideDown();
  validate.slideUp("fast");
  feedback.slideUp();
}

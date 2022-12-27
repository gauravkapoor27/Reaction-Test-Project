mainBox = document.querySelector(".container");
let clickedEarly = false;

let startTime;
let reactionTime;
let colorTimeout;

let startGame = () => {
  let timeDelay = (Math.random() * 5 + 2) * 1000;
  // let timeDelay = 2000;
  mainBox.innerText = "";
  mainBox.style.backgroundColor = "rgb(100, 100, 100)";

  clearTimeout(colorTimeout);
  colorTimeout = setTimeout(colorShow, timeDelay);

  mainBox.addEventListener("click", earlyClick);
};

let earlyClick = () => {
  mainBox.innerText = "You clicked too early!";
  mainBox.style.backgroundColor = "red";
  clearTimeout(colorTimeout);
  mainBox.removeEventListener("click", earlyClick);
};

mainBox.addEventListener("click", startGame);

let colorShow = () => {
  if (mainBox.style.backgroundColor != "red") {
    mainBox.style.backgroundColor = "green";
    startTime = new Date();
    mainBox.removeEventListener("click", earlyClick);
    mainBox.removeEventListener("click", startGame);
    mainBox.addEventListener("click", reactionClick);
  }
};

let reactionClick = () => {
  reactionTime = new Date() - startTime;
  mainBox.innerText = "Your reaction time is " + reactionTime + "ms";
  mainBox.removeEventListener("click", reactionClick);
  mainBox.removeEventListener("click", earlyClick);
  mainBox.addEventListener("click", startGame);
};

mainBox = document.querySelector(".container");
historyBox = document.querySelector(".history-box");
meanButton = document.createElement("button");
meanButton.classList.add("mean-btn");
meanButton.style.left = "-5000px";
historyBox.appendChild(meanButton);

let average;
let scoresArray = [];
let clickedEarly = false;
let startTime;
let reactionTime;
let colorTimeout;

let startGame = () => {
  let timeDelay = (Math.random() * 3 + 2) * 1000;
  // let timeDelay = 2000;
  mainBox.innerText = "";
  mainBox.style.backgroundColor = "red";
  clickedEarly = false;

  clearTimeout(colorTimeout);
  colorTimeout = setTimeout(colorShow, timeDelay);

  mainBox.addEventListener("mousedown", earlyClick);
};

let earlyClick = () => {
  mainBox.innerText = "You clicked too early!\nClick this box to start again.";
  mainBox.style.backgroundColor = "red";
  clickedEarly = true;
  clearTimeout(colorTimeout);
  mainBox.removeEventListener("mousedown", earlyClick);
};

mainBox.addEventListener("mousedown", startGame);

let colorShow = () => {
  if (!clickedEarly) {
    startTime = new Date();
    mainBox.style.backgroundColor = "green";
    mainBox.removeEventListener("mousedown", earlyClick);
    mainBox.removeEventListener("mousedown", startGame);
    mainBox.addEventListener("mousedown", reactionClick);
  }
};

let reactionClick = () => {
  reactionTime = new Date() - startTime;
  mainBox.innerText = `Your reaction time was ${reactionTime} ms.\nClick this box to start again.`;
  if (reactionTime >= 150 && reactionTime <= 350) {
    newScore = document.createElement("button");
    newScore.classList.add("btn");
    newScore.innerText = `${reactionTime}`;

    let scorePercent = (reactionTime - 150) / 2;

    newScore.style.left = `${scorePercent}%`;
    newScore.style.transform = `translateX(-50%)`;
    historyBox.appendChild(newScore);

    scoresArray.push(reactionTime);
    average = scoresArray.reduce((a, b) => a + b) / scoresArray.length;

    meanButton.style.left = `${(average - 150) / 2}%`;
    meanButton.style.transform = `translateX(-50%)`;
    meanButton.innerText = `${Math.round(average)}`;
  }
  mainBox.removeEventListener("mousedown", reactionClick);
  mainBox.removeEventListener("mousedown", earlyClick);
  mainBox.addEventListener("mousedown", startGame);
};

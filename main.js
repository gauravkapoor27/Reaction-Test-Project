// access main containers
mainBox = document.querySelector(".container");
historyBox = document.querySelector(".history-box");

// prevent right click on main box
mainBox.addEventListener("contextmenu", (e) => e.preventDefault());

// create mean button
meanButton = document.createElement("button");
meanButton.classList.add("mean-btn");
meanButton.style.left = "-5000px";
historyBox.appendChild(meanButton);

// instantiate variables
let average;
let scoresArray = [];
let startTime;
let reactionTime;
let colorTimeout;

// create start game function
let startGame = () => {
  let timeDelay = (Math.random() * 3 + 2) * 1000;
  mainBox.innerText = "";
  mainBox.style.backgroundColor = "#480000";

  clearTimeout(colorTimeout);
  colorTimeout = setTimeout(colorShow, timeDelay);

  mainBox.removeEventListener("mousedown", startGame);
  mainBox.addEventListener("mousedown", earlyClick);
};

// create early click function
let earlyClick = () => {
  mainBox.innerText = "You clicked too early!\nClick this box to start again.";
  mainBox.style.backgroundColor = "#480000";
  clearTimeout(colorTimeout);
  mainBox.removeEventListener("mousedown", earlyClick);
  mainBox.addEventListener("mousedown", startGame);
};

// create color show function
let colorShow = () => {
  startTime = new Date();
  mainBox.style.backgroundColor = "#066E00";
  mainBox.removeEventListener("mousedown", earlyClick);
  mainBox.addEventListener("mousedown", reactionClick);
};

// create reaction click function
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
  mainBox.addEventListener("mousedown", startGame);
};

// start game
mainBox.addEventListener("mousedown", startGame);

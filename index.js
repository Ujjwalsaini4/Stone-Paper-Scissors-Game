let userCount = 0;
let compCount = 0;
let drowCount = 0;
const choices = document.querySelectorAll(".icon");
const audio = document.querySelector(".tap-audio");
const video = document.querySelector("#win");

const userName = prompt("Please enter your name: ");
document.querySelector('#userName').innerText = userName + ' Win:';

const genComChoice = () => {
  const options = ["stone", "paper", "scissors"];
  const idxVal = Math.floor(Math.random() * 3);
  return options[idxVal];
};

function drowGame() {
  drowCount++;
  document.getElementById("drow").innerText = drowCount;
  document.querySelector(".loseVideo").style.display = "none";
  document.querySelector(".winVideo").style.display = "none";
  const drowAudio = document.querySelector('#drawAudio');
  drowAudio.currentTime = 0;
  drowAudio.play();
}

function playWinSound() {
  const winSound = document.querySelector("#winAudio");
  winSound.currentTime = 0; //Reset sound to start
  winSound.play();
  winSound.volume = 0.3;
  document.querySelector(".winVideo").style.display = "block";
  video.play();
  document.querySelector(".loseVideo").style.display = "none";
}

function loseGame() {
  const loseAudio = document.querySelector('#loseAudio');
  loseAudio.currentTime = 0;
  loseAudio.play();
  loseAudio.volume = 0.3;
  document.querySelector(".loseVideo").style.display = "flex";
  document.querySelector("#lose").play();
}

const showResult = (userWin) => {
  if (userWin) {
    userCount++;
    document.getElementById("user").innerText = userCount;
    playWinSound();
  } else {
    compCount++;
    document.getElementById("computer").innerText = compCount;
    document.querySelector(".winVideo").style.display = "none";
    loseGame();
  }
};

const playGame = (userChoice) => {
  //Generate computer choice
  const comChoice = genComChoice();

  document.getElementById("userOption").innerText = userChoice;  //user choice
  document.getElementById("compOption").innerText = comChoice;   //computer choice

  if (userChoice === comChoice) {
    drowGame();
  } else {
    let userWin = true;
    if (userChoice === "stone") {
      // paper , scissor
      userWin = comChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = comChoice === "scissors" ? false : true;
    } else {
      userWin = comChoice === "stone" ? false : true;
    }
    showResult(userWin);
  }
};

choices.forEach((value) => {
  value.addEventListener("click", () => {
    audio.play();
    audio.volume = 0.3;
    const userChoice = value.getAttribute("id");
    playGame(userChoice);
  });
});

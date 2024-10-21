const gameData = {
  showing: false,
  generatedSequence: [],
  inputSequence: [],
  level: 0,
  levelColors: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-brown-500",
    "bg-cyan-500",
    "bg-magenta-500",
  ],
  gameStarted: false,
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const generateSequence = (level) => {
  const sequence = [];
  for (let i = 0; i < level; i++) {
    sequence.push(Math.floor(Math.random() * 8));
  }
  gameData.generatedSequence = sequence;
  return sequence;
};

const showSequence = async (sequence) => {
  gameData.showing = true;
  setShowing();
  for (let i = 0; i < sequence.length; i++) {
    // console.log(sequence[i]);
    fillColor(sequence[i]);
    await delay(1000);
    removeColor(sequence[i]);
    await delay(200);
  }
  gameData.showing = false;
  setShowing();
};

const pulse = (index) => {
  fillColor(index);
  setTimeout(() => {
    removeColor(index);
  }, 200);
};

const setShowing = () => {
  const showDiv = document.getElementById("showing");
  showDiv.innerHTML = gameData.showing
    ? "Watch Carefully"
    : "Input the Sequence";

  if (gameData.showing) {
    showDiv.classList.add("bg-red-500");
    showDiv.classList.remove("bg-green-500");
    showDiv.classList.remove("bg-slate-300");
  } else {
    showDiv.classList.add("bg-green-500");
    showDiv.classList.remove("bg-red-500");
    showDiv.classList.remove("bg-slate-300");
  }
};

const fillColor = (index) => {
  document
    .getElementById(`part${index}`)
    .classList.replace(
      "bg-slate-300",
      gameData.levelColors[gameData.level - 1]
    );
};

const removeColor = (index) => {
  document
    .getElementById(`part${index}`)
    .classList.replace(
      gameData.levelColors[gameData.level - 1],
      "bg-slate-300"
    );
};

const clearBoard = () => {
  const elements = document.querySelectorAll(".part");
  elements.forEach((element) => {
    gameData.levelColors.forEach((color) => {
      element.classList.remove(color);
    });
    element.classList.add("bg-slate-300");
  });
};

const checkSequence = () => {
  let correct = true;
  gameData.inputSequence.forEach((item, index) => {
    if (item !== gameData.generatedSequence[index]) {
      correct = false;
    }
  });
  return correct;
};

const start = () => {
  // reset all the values
  if (!gameData.gameStarted) return;
  gameData.showing = false;
  gameData.generatedSequence = [];
  gameData.inputSequence = [];
  clearBoard();
  gameData.level++;

  // Get the game level in ui
  document.getElementById("level").innerText = gameData.level;
  // set the level box color with tyhe level color
  if (gameData.level == 1) {
    document
      .getElementById("level")
      .classList.replace(
        "bg-slate-300",
        gameData.levelColors[gameData.level - 1]
      );
  } else {
    document
      .getElementById("level")
      .classList.replace(
        gameData.levelColors[gameData.level - 2],
        gameData.levelColors[gameData.level - 1]
      );
  }

  const generatedSequence = generateSequence(gameData.level);
  showSequence(generatedSequence);
};

document.getElementById("start").addEventListener("click", () => {
  document.getElementById("startPage").classList.add("hidden");
  gameData.gameStarted = true;
  start();
});

document.querySelectorAll(".part").forEach((part, index) => {
  part.addEventListener("click", async (e) => {
    if (gameData.showing) return;

    pulse(index);

    // add the index to the input sequence
    if (gameData.inputSequence.length != gameData.generatedSequence.length)
      gameData.inputSequence.push(index);

    console.log(gameData.inputSequence);
    console.log(gameData.generatedSequence);

    // check if the input sequence is equal to the generated sequence
    if (checkSequence()) {
      await delay(1000);

      if (gameData.inputSequence.length === gameData.generatedSequence.length)
        start();

      console.log("Correct");
    } else {
      document.getElementById("youLose").classList.remove("hidden");
      document
        .getElementById("level")
        .classList.replace(
          gameData.levelColors[gameData.level - 1],
          "bg-slate-300"
        );
      gameData.level = 0;
      gameData.gameStarted = false;
      clearBoard();
    }
  });
});

document.getElementById("restart").addEventListener("click", () => {
  document.getElementById("youLose").classList.add("hidden");
  gameData.gameStarted = true;
  start();
});

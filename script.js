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
  } else {
    showDiv.classList.add("bg-green-500");
    showDiv.classList.remove("bg-red-500");
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
  return (
    gameData.generatedSequence.toString() === gameData.inputSequence.toString()
  );
};

const start = () => {
  // reset all the values
  gameData.showing = false;
  gameData.generatedSequence = [];
  gameData.inputSequence = [];
  clearBoard();
  gameData.level++;

  // Get the game level in ui
  document.getElementById("level").innerText = gameData.level;

  const generatedSequence = generateSequence(gameData.level);
  showSequence(generatedSequence);
};

start();

document.querySelectorAll(".part").forEach((part, index) => {
  part.addEventListener("click", (e) => {
    if (gameData.showing) return;

    console.log(gameData);

    pulse(index);

    // add the index to the input sequence
    if (gameData.inputSequence.length != gameData.generatedSequence.length)
      gameData.inputSequence.push(index);

    // check if the input sequence is equal to the generated sequence
    if (gameData.inputSequence.length === gameData.generatedSequence.length) {
      if (checkSequence()) {
        start();
      } else {
        // alert("Game Over!");
        document.getElementById("youLose").classList.remove("hidden");
        gameData.level = 0;
        clearBoard();
      }
    }
  });
});

document.getElementById("restart").addEventListener("click", () => {
  document.getElementById("youLose").classList.add("hidden");
  start();
});

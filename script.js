const gameData = {
  showing: false,
  generatedSequence: [],
  inputSequence: [],
  level: 1,
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
  for (let i = 0; i < sequence.length; i++) {
    // console.log(sequence[i]);
    fillColor(sequence[i]);
    await delay(1000);
    removeColor(sequence[i]);
    await delay(200);
  }
  gameData.showing = false;
};

const pulse = (index) => {
  fillColor(index);
  setTimeout(() => {
    removeColor(index);
  }, 200);
};

const fillColor = (index) => {
  document
    .getElementById(`part${index}`)
    .classList.replace("bg-slate-300", gameData.levelColors[gameData.level]);
};

const removeColor = (index) => {
  document
    .getElementById(`part${index}`)
    .classList.replace(gameData.levelColors[gameData.level], "bg-slate-300");
};

const start = () => {
  const generatedSequence = generateSequence(10);
  showSequence(generatedSequence);

  document.querySelectorAll(".part").forEach((part, index) => {
    part.addEventListener("click", (e) => {
      pulse(index);
    });
  });
};

start();

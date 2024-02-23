const playableNotes = ["aBtn", "downC", "rightC", "leftC", "upC"];
const noteHeight = [62, 45, 30, 8, -15];
const noteHeightMobile = [30, 23, 15, 8, -5];
const songs = [
  ["aBtn", "upC", "leftC", "rightC", "leftC", "rightC"],
  ["downC", "aBtn", "downC", "aBtn", "rightC", "downC", "rightC", "downC"],
  ["aBtn", "downC", "rightC", "rightC", "leftC"],
  ["leftC", "rightC", "rightC", "aBtn", "leftC", "rightC", "downC"],
  ["aBtn", "downC", "aBtn", "rightC", "downC", "aBtn"],
  ["upC", "rightC", "upC", "rightC", "leftC", "upC"],
];
var userCanPlay = true;
var userPlayedPattern = [];
var noteCounter = 0;
var gamePattern = [];
var gameStarted = false;
var gameLevel = 3;
var noteChecker = 0;

// BUTTONS

$("#freestyleBtn").on("click", function () {
  endGame();
  playSound("menuSelect");
  $("#ocarina-container").css(
    "background-image",
    "url(../assets/ocarina/img/scrubs.png)"
  );
});

$("#scrubBtn").on("click", function () {
  if (!gameStarted) {
    removeNotes();
    playSound("menuSelect");
    $("#ocarina-container").css(
      "background-image",
      "url(../assets/ocarina/img/scrubs.png)"
    );
    startGame();
  }
});

$(".noteButton").on("click", function () {
  if (userCanPlay) {
    var chosenButton = $(this).attr("id");
    playSound(chosenButton);
    animatePress(chosenButton);
    addNote(chosenButton);
    if (gameStarted) {
      checkAnswer(noteChecker);
    }
  }
});

$(".bBtn").on("click", function () {
  var chosenButton = $(this).attr("id");
  animatePress(chosenButton);
  endGame();
  wrong();
});

// NOTE FUNCTIONALITY

function animatePress(currentNote) {
  $("#" + currentNote).addClass("pressed");
  setTimeout(function () {
    $("#" + currentNote).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("../assets/ocarina/audio/" + name + ".wav");
  audio.play();
}

// NOTES ON STAFF

function addNote(currentNote) {
  noteCounter++;
  userPlayedPattern.push(currentNote);
  if (noteCounter > 8) {
    wrong();
  }
  if (playableNotes.includes(currentNote)) {
    let addedNote = "#note" + String(noteCounter);
    $(addedNote).attr("src", `../assets/ocarina/img/${currentNote}.svg`);
    $(addedNote).removeClass("hidden");
    if ($("#ocarina-container").css("max-width") === "400px") {
      $(addedNote).css(
        "top",
        noteHeightMobile[playableNotes.indexOf(currentNote)]
      );
    } else {
      $(addedNote).css("top", noteHeight[playableNotes.indexOf(currentNote)]);
    }
  }
  if (!gameStarted) {
    songCheck();
  }
}

function removeNotes() {
  $(".online").each(function () {
    $(this).addClass("hidden");
  });
  userPlayedPattern = [];
  noteCounter = 0;
}

// SONG HANDLING

function wrong() {
  playSound("error");
  removeNotes();
}

function correct() {
  playSound("correct");
  setTimeout(removeNotes, 750);
}

function songCheck() {
  songs.forEach((e) => {
    if (e.every((val, index) => val === userPlayedPattern[index])) {
      correct();
      $("#ocarina-container").css(
        "background-image",
        `url(../assets/ocarina/img/bg${String(songs.indexOf(e) + 1)}.png)`
      );
    }
  });
}

// SCRUB GAME

function startGame() {
  gameStarted = true;
  for (let i = 0; i < 3; i++) {
    gamePattern.push(playableNotes[Math.floor(Math.random() * 5)]);
  }
  scrubGame();
}

function nextLevel() {
  gameLevel++;
  noteChecker = 0;
  gamePattern.push(playableNotes[Math.floor(Math.random() * 5)]);
  scrubGame();
}

function playFlute(level) {
  if (gameStarted) {
    addNote(gamePattern[level]);
    playSound(`flute_${gamePattern[level]}`);
  } else {
    endGame();
  }
}

async function scrubGame() {
  userCanPlay = false;
  for (let i = 0; i < gameLevel; i++) {
    playFlute(i);
    await new Promise((r) => setTimeout(r, 750));
    if (userPlayedPattern[0] === undefined) {
      break;
    }
  }
  userCanPlay = true;
  console.log(gamePattern);
  removeNotes();
}

function checkAnswer(nC) {
  console.log(nC);
  if (
    gamePattern.every((val, index) => val === userPlayedPattern[index]) &&
    gameLevel === 8
  ) {
    correct();
    setTimeout(endGame, 1000);
  } else if (
    gamePattern.every((val, index) => val === userPlayedPattern[index])
  ) {
    correct();
    setTimeout(nextLevel, 1000);
  } else if (gamePattern[nC] !== userPlayedPattern[nC]) {
    endGame();
    wrong();
  } else {
    noteChecker++;
  }
}

function endGame() {
  gameStarted = false;
  gameLevel = 3;
  gamePattern = [];
  noteChecker = 0;
  removeNotes();
}

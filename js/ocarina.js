const playableNotes = ["aBtn", "downC", "rightC", "leftC", "upC"];
const noteHeight = [62, 45, 30, 8, -15];
const noteHeightMobile = [30, 23, 15, 8, -5];
const songs = [
    ["aBtn", "upC", "leftC", "rightC", "leftC", "rightC"],
    ["downC", "aBtn", "downC", "aBtn", "rightC", "downC", "rightC", "downC"],
    ["aBtn", "downC", "rightC", "rightC", "leftC"],
    ["leftC", "rightC", "rightC", "aBtn", "leftC", "rightC", "downC"],
    ["aBtn", "downC", "aBtn", "rightC", "downC", "aBtn"],
    ["upC", "rightC", "upC", "rightC", "leftC", "upC"]
]
var userPlayedPattern = [];
var noteCounter = 0;

$("#freestyleBtn").on("click", function(){
    removeNotes();
    playSound("menuSelect");
    $("#ocarina-container").css("background-image", "url(../assets/ocarina/img/scrubs.png)");
});

$(".noteButton").on("click", function(){
    var chosenButton = $(this).attr("id");
    playSound(chosenButton);
    animatePress(chosenButton);
    addNote(chosenButton);
});

$(".bBtn").on("click", function(){
    var chosenButton = $(this).attr("id");
    animatePress(chosenButton);
    wrong();
});

function animatePress(currentNote) {
    $("#" + currentNote).addClass("pressed");
    setTimeout(function () {
        $("#" + currentNote).removeClass("pressed");
        }, 100);
};

function playSound(name) {
    var audio = new Audio("../assets/ocarina/audio/" + name + ".wav");
    audio.play();
};

function addNote(currentNote) {
    noteCounter++;
    userPlayedPattern.push(currentNote)
    if (noteCounter > 8) {
        wrong();
    };
    if (playableNotes.includes(currentNote)) {
        let addedNote = "#note" + String(noteCounter);
        $(addedNote).attr("src", `../assets/ocarina/img/${currentNote}.svg`)
        $(addedNote).removeClass("hidden");
        if ($("#ocarina-container").css("max-width") === "400px") {
            $(addedNote).css("top", noteHeightMobile[playableNotes.indexOf(currentNote)]);
        } else {
            $(addedNote).css("top", noteHeight[playableNotes.indexOf(currentNote)]);
        };
        
    };
    songCheck();
};

function removeNotes() {
    $(".online").each(function(){
        $(this).addClass("hidden");
    });
    userPlayedPattern = [];
    noteCounter = 0;
};

function wrong() {
    playSound("error");
    removeNotes();
};

function correct() {
    playSound("correct");
    setTimeout(removeNotes, 750);
};

function songCheck() {
    songs.forEach((e) => {
        if (e.every((val, index) => val === userPlayedPattern[index])) {
            correct();
            $("#ocarina-container").css("background-image", `url(../assets/ocarina/img/bg${String(songs.indexOf(e) + 1)}.png)`);
        };
    });
};

// INITIALIZE

import { firstNames, lastNames, countryNames, teamNames } from "./names.js";
document.getElementById("generateBtn").addEventListener("click", generateDraftClass);
const positions = ["Seeker", "Beater", "Beater", "Chaser", "Chaser", "Chaser", "Keeper"];
var players = [];



// FUNCTIONS
function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
};

function addData(playerObj) {  
    let table = document.getElementById("table-quidditch");
    let newRow = table.insertRow(table.rows.length);
    newRow.insertCell(0).innerHTML = playerObj.position;
    newRow.insertCell(1).innerHTML = playerObj.firstName + " " + playerObj.lastName;
    newRow.insertCell(2).innerHTML = playerObj.ovr;
    newRow.insertCell(3).innerHTML = playerObj.speed;
    newRow.insertCell(4).innerHTML = playerObj.shooting;
    newRow.insertCell(5).innerHTML = playerObj.passing;
    newRow.insertCell(6).innerHTML = playerObj.defending;
    newRow.insertCell(7).innerHTML = playerObj.awareness;
    newRow.insertCell(8).innerHTML = playerObj.strength;
    newRow.insertCell(9).innerHTML = playerObj.reactionTime;
};

function statUpdate() {
    var totalSeekers = 0;
    var totalBeaters = 0;
    var totalChasers = 0;
    var totalKeepers = 0;
    var overalls = [];
    var overallsCombined = 0;

    players.forEach(element => {
        if (element.position == "Seeker") {
            totalSeekers++;
        } else if (element.position == "Beater") {
            totalBeaters++;
        } else if (element.position == "Chaser") {
            totalChasers++;
        } else if (element.position == "Keeper") {
            totalKeepers++;
        };
        overalls.push(element.ovr);
        overallsCombined += element.ovr;
    });

    var overallsAvg = Math.floor(overallsCombined / players.length);
    document.getElementById("totalPlayers").innerHTML = players.length;
    document.getElementById("totalSeekers").innerHTML = totalSeekers;
    document.getElementById("totalBeaters").innerHTML = totalBeaters;
    document.getElementById("totalChasers").innerHTML = totalChasers;
    document.getElementById("totalKeepers").innerHTML = totalKeepers;
    document.getElementById("highestOverall").innerHTML =  Math.max(...overalls);
    document.getElementById("lowestOverall").innerHTML =  Math.min(...overalls);
    document.getElementById("averageOverall").innerHTML =  overallsAvg;
};

function generateDraftClass() {
    players = [];
    let table = document.getElementById("table-quidditch");
    for (let i=1; i < table.rows.length; i++) {
        table.deleteRow(i)
    };
    for (let i = 0; i < 100; i++) {
        players.push(new Player);
        addData(players[i]);
    };
    statUpdate()
    localStorage.setItem("players", players.toString());
};

function loadDraftClass() {
    let playersString = localStorage.getItem("players").split("},");
    playersString.forEach(element => {
        if (!element.includes("}")) {
            element += "}";
        };
        let newPlayer = JSON.parse(element);
        players.push(new Player(newPlayer.firstName, newPlayer.lastName, newPlayer.position, +newPlayer.speed, +newPlayer.shooting, +newPlayer.passing, +newPlayer.defending, +newPlayer.awareness, +newPlayer.strength, +newPlayer.reactionTime))
        addData(players.at(-1));
    });
    statUpdate();
};


// CLASS PLAYER
class Player {
    constructor(
        firstName = capitalizeFirstLetter(firstNames[Math.floor(Math.random() * firstNames.length)]),
        lastName = capitalizeFirstLetter(lastNames[Math.floor(Math.random() * lastNames.length)]),
        position = positions[Math.floor(Math.random() * positions.length)],
        speed = Math.floor(Math.random() * 49) + 50,
        shooting = Math.floor(Math.random() * 49) + 50,
        passing = Math.floor(Math.random() * 49) + 50,
        defending = Math.floor(Math.random() * 49) + 50,
        awareness = Math.floor(Math.random() * 49) + 50,
        strength = Math.floor(Math.random() * 49) + 50,
        reactionTime = Math.floor(Math.random() * 49) + 50
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.speed = speed;
        this.shooting = shooting;
        this.passing = passing;
        this.defending = defending;
        this.awareness = awareness;
        this.strength = strength;
        this.reactionTime = reactionTime;
        this.ovr = this.overall();   
    };

    overall() {
        let ovr = 0;
        if (this.position == "Seeker") {
            ovr = Math.floor((this.speed + this.awareness + this.reactionTime) / 3);
        } else if (this.position == "Beater") {
            ovr = Math.floor((this.speed + this.awareness + this.strength) / 3);
        } else if (this.position == "Chaser") {
            ovr = Math.floor((this.speed + this.awareness + this.shooting + this.passing) / 4);
        } else if (this.position == "Keeper") {
            ovr = Math.floor((this.speed + this.awareness + this.defending) / 3);
        };
        return ovr;
    };

    toString() {
        return `{"firstName":"${this.firstName}","lastName":"${this.lastName}","position":"${this.position}","speed":"${this.speed}","shooting":"${this.shooting}","passing":"${this.passing}","defending":"${this.defending}","awareness":"${this.awareness}","strength":"${this.strength}","reactionTime":"${this.reactionTime}","ovr":"${this.ovr}"}`;
    };

};


if (localStorage.getItem("players") == null) {
    generateDraftClass();
} else {
    loadDraftClass();
};

document.getElementById("team").innerHTML = countryNames[Math.floor(Math.random() * countryNames.length)] + " " + teamNames[Math.floor(Math.random() * teamNames.length)];












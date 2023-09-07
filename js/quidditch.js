// INITIALIZE

import { firstNames, lastNames } from "./names.js";


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
}


// CLASS PLAYER
class Player {
    constructor(pos) {
        this.firstName = capitalizeFirstLetter(firstNames[Math.floor(Math.random() * firstNames.length)]);;
        this.lastName = capitalizeFirstLetter(lastNames[Math.floor(Math.random() * lastNames.length)]);;
        this.position = pos;
        this.speed = Math.floor(Math.random() * 49) + 50;
        this.shooting = Math.floor(Math.random() * 49) + 50;
        this.passing = Math.floor(Math.random() * 49) + 50;
        this.defending = Math.floor(Math.random() * 49) + 50;
        this.awareness = Math.floor(Math.random() * 49) + 50;
        this.strength = Math.floor(Math.random() * 49) + 50;
        this.reactionTime = Math.floor(Math.random() * 49) + 50;
        this.ovr = this.overall()   
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
        return ovr
    };
};

for (let i = 0; i < 6; i++) {
    addData(new Player("Seeker"));
    addData(new Player("Beater"));
    addData(new Player("Beater"));
    addData(new Player("Chaser"));
    addData(new Player("Chaser"));
    addData(new Player("Chaser"));
    addData(new Player("Keeper"));
};





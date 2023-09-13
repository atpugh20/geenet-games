document.getElementById("rollBtn").addEventListener("click", roll);

var dice = Array.from(document.getElementsByClassName("die"));
dice.forEach(element => {
    element.addEventListener("click", hold);
});

var firstRoll = true;
var upperRowsComplete = 0;
var lowerRowsComplete = 0
var upperTotal = 0;
var lowerTotal = 0;
var turnNumElement = document.getElementById("turnNum");
var turnNum = 0;
var rollList = [];

function hold(e) {
    if (turnNum == 0) {
        return
    };
    e.target.classList.toggle("held");
}

function roll() {
    if (turnNum == 3) {
        return;
    };
    if (firstRoll) {
        document.getElementById("diceRow").classList.add("flexbox");
        document.getElementById("diceRow").classList.add("dice");
    };
    for (let i = 0; i < 5; i++) {
        let rollNum = (Math.floor(Math.random() * 6) + 1);
        if (!dice[i].classList.contains("held")){
            dice[i].setAttribute("src", `../assets/yahtzee/dice${rollNum}.png`);
            rollList[i] = rollNum;
        };
    };
    turnNum++;
    turnNumElement.innerText = turnNum;

};

function addScore(e) {
    if (e.target.innerText !== ""){
        return;
    };
    if (turnNum == 0) {
        return;
    };
    if (e.target.parentNode.parentNode.parentNode.id === "upperSection"){
        let score = validateUpper(e.target.parentNode.rowIndex);
        e.target.innerText = score;
        upperTotal += score;
        upperRowsComplete++;
        if (upperRowsComplete == 6) {
            if (upperTotal >= 63) {
                document.getElementById("bonus").innerText = 35;
                upperTotal += 35;
            } else {
                document.getElementById("bonus").innerText = 0;
            };
            document.getElementById("upperTotal").innerText = upperTotal;
        };
    } else {
        let score = validateLower(e.target.parentNode.rowIndex);
        e.target.innerText = score;
        lowerTotal += score;
        lowerRowsComplete++;
        if (lowerRowsComplete == 7) {
            document.getElementById("lowerTotal").innerText = lowerTotal;
        };
    };
    if (upperRowsComplete + lowerRowsComplete == 13) {
        document.getElementById("finalScore").innerText = upperTotal + lowerTotal;
    };
    turnNum = 0;
    turnNumElement.innerText = turnNum;
    dice.forEach(e => {
        if (e.classList.contains("held")){
            e.classList.remove("held");
        };
    });
};

function validateUpper(row) {
    if (row == 1) {
        return rollList.filter(x => x == 1).length;
    } else if (row == 2) {
        return rollList.filter(x => x == 2).length * 2;
    } else if (row == 3) {
        return rollList.filter(x => x == 3).length * 3;
    } else if (row == 4) {
        return rollList.filter(x => x == 4).length * 4;
    } else if (row == 5) {
        return rollList.filter(x => x == 5).length * 5;
    } else if (row == 6) {
        return rollList.filter(x => x == 6).length * 6;
    };
};

function validateLower(row) {
    let nums = [0, 0, 0, 0, 0, 0];
    rollList.forEach(element => {
        nums[element - 1] += 1;
    });
    if(row == 1) {
        return (nums.filter(x => x >= 3).length == 1) ? rollList.reduce((a,b) => a + b, 0) : 0;
    } else if(row == 2) {
        return (nums.filter(x => x >= 4).length == 1) ? rollList.reduce((a,b) => a + b, 0) : 0;
    } else if(row == 3) {
        return (nums.filter(x => x == 3).length == 1 && nums.filter(x => x == 2).length == 1) ? 25 : 0;
    } else if(row == 4) {
        if(nums.filter(x => x >= 1).length >= 4) {
            for (let i = 0; i < 3; i++) {
                if (nums[i] > 0 && nums[i + 1] > 0 && nums[i + 2] > 0 && nums[i + 3] > 0) {
                    return 30;
                };
            };
            return 0;
        } else {
            return 0;
        }
    } else if (row == 5){
        return (nums.filter(x => x == 1).length == 5 && (nums[0] == 0 || nums[5] == 0)) ? 40 : 0;
    } else if(row == 6) {
        return (nums.filter(x => x == 5).length == 1) ? 50 : 0;
    } else {
        return rollList.reduce((a,b) => a + b, 0);
    };
};

let table1 = document.getElementById("upperSection");
let table2 = document.getElementById("lowerSection");

for (let i = 1; i < 8; i++) {
    if (i !== 7){
        table1.rows[i].cells[2].addEventListener("click", addScore);
    };
    table2.rows[i].cells[2].addEventListener("click", addScore);
};

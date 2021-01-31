// Selectors
const addPlayerBtn = document.querySelector('.addPlayer');
const playerForm = document.querySelector('.playerForm');
const startGameBtn = document.querySelector('.startGame');
const removePlayerBtn = document.querySelector('.removePlayer');
const intro = document.querySelector('.intro');
const match = document.querySelector('.match');
const listOfPlayer = [];
let listOfRoundScore = [];
const turnMessage = document.querySelector('.turnMessage');
const pRoundScoreList = document.querySelector('.pRoundScoreList');
const pTotalScoreList = document.querySelector('.pTotalScoreList');
const rollDicesBtn = document.querySelector('.rollBtn');
const tableScore = document.querySelector('.tableScore span');

// Variables
let playerCount = 2
let ableToRoll = 1;
let selectCount = 0;

    // Dices variables
const d4 = document.querySelector('.d4');
const d6 = document.querySelector('.d6');
const d8 = document.querySelector('.d8');
const d10 = document.querySelector('.d10');
const d20 = document.querySelector('.d20');
const dValues = document.querySelectorAll('.diceSection span') 
const dices = [d4, d6, d8, d10, d20];

    // Dice Selected
const dicesSelected = document.querySelectorAll('.selectedDices li');

// Event Listeners
addPlayerBtn.addEventListener('click', addPlayer);
removePlayerBtn.addEventListener('click', removePlayer);
startGameBtn.addEventListener('click', startGame);
rollDicesBtn.addEventListener('click', rollDices);
dices.forEach(dice => {
dice.addEventListener('animationend', function(){
    this.style.animation = '';
})})
// MAPPING EVENT LISTENER TO EACH DICE:
for (let i = 0; i < 5; i++) {
    dices[i].addEventListener('click', function(){dSelection(i)})
}

// Functions

function addPlayer(event){
    event.preventDefault();
    if (playerCount < 5) {
    playerCount++;
    // CREATION OF LI
    const playerLi = document.createElement('li');
    // CREATION OF INPUT
    const playerInput = document.createElement('input');
    playerInput.placeholder = '*required';
    playerInput.classList.add(`p${playerCount}Name`);
    // APPEND TO LI ELEMENT
    playerLi.appendChild(playerInput);
    playerForm.appendChild(playerLi);
    console.log(playerCount);
    } else {
        return;
    } 
}

function removePlayer (event) {
    event.preventDefault();
    if (playerCount > 2) {
        playerCount--;
        let lastPlayer = document.querySelectorAll('.playerForm li');
        lastPlayer[playerCount].remove();
        } else {
            return;
        }
}

function startGame () {
    // Get input Values for players. Put in Array.
    collectingPlayerNames();

    generatePlayerLines();

    // CREATING THE LIST OF SCORES
    
    mappingScoreToPlayers();

    intro.classList.toggle('fadeOut');
    match.classList.toggle('fadeOut');
    newTurn(listOfPlayer[0]);
    listOfRoundScore.map(x => parseInt(x));

}

function collectingPlayerNames () {
    const p1Name = document.querySelector('.intro .p1Name');
    const p2Name = document.querySelector('.intro .p2Name');
    const p3Name = document.querySelector('.intro .p3Name');
    const p4Name = document.querySelector('.intro .p4Name');
    const p5Name = document.querySelector('.intro .p5Name');

    if (playerCount === 5) {
        listOfPlayer.push(p1Name.value, p2Name.value, p3Name.value, p4Name.value, p5Name.value);
    } else if (playerCount === 4){
        listOfPlayer.push(p1Name.value, p2Name.value, p3Name.value, p4Name.value);
    } else if (playerCount === 3){
        listOfPlayer.push(p1Name.value, p2Name.value, p3Name.value);
    } else {
        listOfPlayer.push(p1Name.value, p2Name.value);
    }
}

function mappingScoreToPlayers() {
    const p1Score = document.querySelector('.pRoundScoreList .p1Score');
    const p2Score = document.querySelector('.pRoundScoreList .p2Score');
    const p3Score = document.querySelector('.pRoundScoreList .p3Score');
    const p4Score = document.querySelector('.pRoundScoreList .p4Score');
    const p5Score = document.querySelector('.pRoundScoreList .p5Score');

    if (playerCount === 5) {
        listOfRoundScore.push(p1Score.innerText, p2Score.innerText, p3Score.innerText, p4Score.innerText, p5Score.innerText);
    } else if (playerCount === 4){
        listOfRoundScore.push(p1Score.innerText, p2Score.innerText, p3Score.innerText, p4Score.innerText);
    } else if (playerCount === 3){
        listOfRoundScore.push(p1Score.innerText, p2Score.innerText, p3Score.innerText);
    } else {
        listOfRoundScore.push(p1Score.innerText, p2Score.innerText);
    };
}

function generatePlayerLines() {
    for ( i = 0; i < playerCount; i++ ) {
        // CREATION OF LI FOR ROUND SCORE
            // NAME OF PLAYER
        const playerLi1 = document.createElement('li');
        const playerName1 = document.createElement('span');
        playerName1.innerText = `${listOfPlayer[i]} :`;
        playerName1.classList.add('spanName');
            // SCORE OF PLAYER
        const playerRoundScore = document.createElement('span');
        playerRoundScore.classList.add(`p${i+1}Score`);
        playerRoundScore.innerText = 0;
        pRoundScoreList.appendChild(playerLi1);
        playerLi1.appendChild(playerName1);
        playerLi1.appendChild(playerRoundScore);

        // SAME FOR TOTAL SCORE SECTION
        const playerLi2 = document.createElement('li');
        const playerName2 = document.createElement('span');
        playerName2.innerText = `${listOfPlayer[i]} :`;
        playerName2.classList.add('spanName');
        const playerTotalScore = document.createElement('span');
        playerTotalScore.classList.add(`p${i+1}Score`);
        pTotalScoreList.appendChild(playerLi2);
        playerLi2.appendChild(playerName2);
        playerLi2.appendChild(playerTotalScore);
    }
}

function rollDices () {
    if (ableToRoll === 1) {
        if (dCount < 5) {
            // ANIMATION OF DICES
            for (let i = 0; i < 5; i++) {
                dices[i].style.animation = 'shakeDice 1.5s ease'
            }
            // UPDATING DICE VALUES END OF ANIMATION
            setTimeout(() => {diceResultGen()}, 1500);
            ableToRoll = 0;
            selectCount = 2;

            } else {
            // END OF TURN SCENARIO
            updateRoundScore(scoreRound);
            newTurn(listOfPlayer[turnCount]);
            newGameSetup();
        }
    } else {
        return
    }
}

let dCount = 0;

// GENERATING NUMBERS
function diceResultGen () { 
    if (dCount < 5) {
        dValues[0].innerText = (Math.ceil(Math.random() * 4));
        dValues[1].innerText = (Math.ceil(Math.random() * 6));
        dValues[2].innerText = (Math.ceil(Math.random() * 8));
        dValues[3].innerText = (Math.ceil(Math.random() * 10));
        dValues[4].innerText = (Math.ceil(Math.random() * 20));

        dices.forEach(dice => {
            dice.style.pointerEvents = "all";
        });
        document.querySelector('.diceSection p').style.opacity = '1';
    } else {

    }
}

function dSelection (i) {
    if (selectCount > 0) {
        dices[i].style.display = 'none';
        dicesSelected[i].lastElementChild.innerText = dValues[i].innerText;
        dicesSelected[i].style.opacity = 1;
        ableToRoll = 1;
        selectCount--;
        dCount++;
        updateTableScore(dValues[i].innerText);
        if (dCount === 5) {
            ableToRoll = 1;
            rollDicesBtn.innerText = 'Next Turn';
            document.querySelector('.diceSection p').style.opacity = '0';
            document.querySelector('.tableScore').style.fontSize = '50px';
        } else {
            return
        }
    }    
    // }
}

let scoreRound = 0
let turnCount = 0;
let numberOfRound = 0;

function updateTableScore(result){
    result = parseInt(result, 10);
    scoreRound = scoreRound + result;
    document.querySelector('.tableScore span').innerText = scoreRound;
};

function updateRoundScore(scoreRound){
    listOfRoundScore[turnCount].innerText = scoreRound
};

// WHITE TRANISTION SCREEN BETWEEN EACH TURN
function newTurn (player) {
    turnMessage.innerText = `It is ${player}'s turn`;
    turnMessage.style.opacity = 1;
    // INCREMENT TURNCOUNT, KEEPING RIGHT NUMBER EVEN IN LATER ROUNDS
    setTimeout(function(){turnMessage.style.opacity = 0}, 2000);
}

// LAYOUT RESET TO INITATION SETUP FOR NEW TURN
function newGameSetup () {
    if (turnCount === (playerCount-1)) {
        numberOfRound++;
    }

    turnCount = (turnCount + 1) - (numberOfRound * playerCount);
    dCount = 0;
    ableToRoll = 1;
    scoreRound = 0;
    updateTableScore(0);
    for (let i = 0; i < 5; i++) {
        dices[i].style.display = 'inline-block';
        dicesSelected[i].style.opacity = 0;
    }
    rollDicesBtn.innerHTML = 'Roll Dices <i class="fas fa-dice">';
    document.querySelector('.tableScore').style.fontSize = '1rem';
}
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
    playerInput.classList.add(`pName`);
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
    const pNames = document.querySelectorAll('.intro .pName');
    for (let i = 0; i < pNames.length; i++) {
        listOfPlayer.push(pNames[i].value)
    } 
}
function mappingScoreToPlayers() {
    const pScores = document.querySelectorAll('.pRoundScoreList .pScore');
    
    for (let i = 0; i < pScores.length; i++) {
        listOfRoundScore.push(parseInt(pScores[i].innerText))
    } 
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
        playerRoundScore.classList.add(`pScore`);
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
        playerTotalScore.classList.add(`pScore`);
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
    const rangeOfDices = [4, 6, 8, 10, 20];
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
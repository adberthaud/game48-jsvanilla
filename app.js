// Selectors
const addPlayerBtn = document.querySelector('.addPlayer');
const playerForm = document.querySelector('.playerForm');
let roundParameter = 0;
let euroParameter = 0;
const startGameBtn = document.querySelector('.startGame');
const removePlayerBtn = document.querySelector('.removePlayer');
const intro = document.querySelector('.intro');
const match = document.querySelector('.match');
let listOfPlayer = [];
let playerScores = [];
const turnMessage = document.querySelector('.turnMessage');
const whiteTransition = document.querySelector('.whiteTransition');
const pRoundScoreList = document.querySelector('.pRoundScoreList');
const pTotalScoreList = document.querySelector('.pTotalScoreList');
const rollDicesBtn = document.querySelector('.rollBtn');
const tableScore = document.querySelector('.tableScore span');

// Variables
let playerCount = 2
let ableToRoll = 1;
let ableToSelect = 0;

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
    playerScores = document.querySelectorAll('.pRoundScoreList .pScore');
    playerTotalScore = document.querySelectorAll('.pTotalScoreList .pScore');
    roundParameter = document.querySelector('.roundParameter').value - 1; //First round starts at 0
    euroParameter = document.querySelector('.euroParameter').value;

    // Display changes:
    intro.classList.toggle('fadeOut');
    match.classList.toggle('fadeOut');
    newTurn(listOfPlayer[0]);
}

function collectingPlayerNames () {
    const pNames = document.querySelectorAll('.intro .pName');
    for (let i = 0; i < pNames.length; i++) {
        listOfPlayer.push(pNames[i].value)
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
        playerTotalScore.innerText = 0;
        pTotalScoreList.appendChild(playerLi2);
        playerLi2.appendChild(playerName2);
        playerLi2.appendChild(playerTotalScore);
    }
}

function rollDices () {
    if (ableToRoll === 1) {
        if (dCount < 5) {
            // ANIMATION OF DICES
            dices.forEach(dice => dice.style.animation = 'shakeDice 1.5s ease');
            // UPDATING DICE VALUES END OF ANIMATION
            setTimeout(() => {diceResultGen()}, 1500);
            ableToRoll = 0;
            ableToSelect = 2;
        } else {
            // END OF TURN SCENARIO
            updateRoundScore(scoreRound);
            newGameSetup();
            if(numberOfRound < roundParameter) {newTurn(listOfPlayer[turnCount])};
        }
    } else {
        return
    }
}

let dCount = 0;

// GENERATING NUMBERS
function diceResultGen () { 
    let rangeOfDices = [4, 6, 8, 10, 20];
    if (dCount < 5) {
        const diceMath = (dValue) => {return Math.ceil(Math.random() * dValue)};

        for (i = 0; i < rangeOfDices.length; i++) {
            dValues[i].innerText = (diceMath(rangeOfDices[i]));
        }
        dices.forEach(dice => dice.style.pointerEvents = "all");
        document.querySelector('.diceSection p').style.opacity = '1';
    } else {
        return
    }
}

function dSelection (i) {
    if (ableToSelect > 0) {
        dices[i].style.display = 'none';
        dicesSelected[i].lastElementChild.innerText = dValues[i].innerText;
        dicesSelected[i].style.opacity = 1;
        ableToRoll = 1;
        ableToSelect--;
        dCount++;
        updateTableScore(parseInt(dValues[i].innerText));
        if (dCount === 5) {
            ableToRoll = 1;
            rollDicesBtn.innerText = 'Next Turn';
            document.querySelector('.diceSection p').style.opacity = '0';
            document.querySelector('.tableScore').style.fontSize = '50px';
        } else {
            return
        }
    }    
}

let scoreRound = 0
let turnCount = 0;
let numberOfRound = 0;

function updateTableScore(result){
    // result = parseInt(result, 10);
    scoreRound = scoreRound + result;
    document.querySelector('.tableScore span').innerText = scoreRound;
};

function updateRoundScore(scoreRound){
    let playerScore = scoreRound + parseInt(playerScores[turnCount].innerHTML);
    playerScores[turnCount].innerHTML = playerScore;
};

// WHITE TRANISTION SCREEN BETWEEN EACH TURN
function newTurn (player) {
    turnMessage.innerText = `It is ${player}'s turn`;
    whiteTransition.style.opacity = 1;
    // rollDicesBtn.style.pointerEvents = 'none';
    // INCREMENT TURNCOUNT, KEEPING RIGHT NUMBER EVEN IN LATER ROUNDS
    setTimeout(function(){whiteTransition.style.opacity = 0}, 2000);
}

// LAYOUT RESET TO INITATION SETUP FOR NEW TURN + TRIGGER OF END OF GAME SCENARIO
function newGameSetup () {
    if (turnCount === (playerCount-1)) {
        // NEXT ROUND, GAME CONTINUES
        turnCount = (turnCount + 1) - playerCount;
        pushScoresToTotal();
        playerScores.forEach(score => score.innerText = "0")

    } else {turnCount++ }

    dCount = 0;
    ableToRoll = 1;
    ableToSelect = 0;
    scoreRound = 0;
    updateTableScore(0);

    dices.forEach(dice => {
        dice.style.animation = 'animationend';
        dice.style.display = 'inline-block';
        dice.style.pointerEvents = 'none';
    });
    dValues.forEach(dValue => dValue.innerText = ("?"));
    dicesSelected.forEach(diceSelected => diceSelected.style.opacity = 0);
    rollDicesBtn.innerHTML = 'Roll Dices <i class="fas fa-dice">';
    document.querySelector('.tableScore').style.fontSize = '1rem';
}

const pushScoresToTotal = () => {
    playerScoresArr = Array.from(playerScores);
    let newArray = playerScoresArr.map(score => parseInt(score.innerText));
    let bestScore = Math.max(...newArray)
    var winnerIndex = newArray.indexOf(bestScore);

    for (i = 0; i < playerTotalScore.length; i++) {
        let totalScore = parseInt(playerTotalScore[i].innerText) - parseInt(playerScoresArr[i].innerText);
        playerTotalScore[i].innerText = totalScore;
    }

    let winnerScore = newArray.reduce((a, b) => a + b, 0) - bestScore;
    let winnerScoreAccumulation = bestScore + winnerScore + parseInt(playerTotalScore[winnerIndex].innerText);
    playerTotalScore[winnerIndex].innerText = winnerScoreAccumulation;

    const endOfGame = () => {
        const tableOfFinalScore = document.querySelector('.tableOfFinalScore');
        const playerLines = document.querySelectorAll('.tableOfFinalScore span');
    
        rollDicesBtn.style.pointerEvents = 'none';
        whiteTransition.style.opacity = 1;
        turnMessage.innerText = `${listOfPlayer[winnerIndex]} is the winner`;
        
        setTimeout(function(){
            turnMessage.style.display = 'none';
            tableOfFinalScore.style.display = 'block';
        }, 2000);
    
        for (i = 0; i < playerTotalScore.length; i++) {
            let moneyWin = (parseInt(playerTotalScore[i].innerText) * euroParameter).toFixed(2); // getting each score converted in Euro with 2 numbers after coma
            if (parseInt(playerTotalScore[i].innerText) > 0) {
                playerLines[i].innerText = `${listOfPlayer[i]} earns ${moneyWin}€`
            } else {
                playerLines[i].innerText = `${listOfPlayer[i]} loses ${moneyWin}€`
            }
        }
    }
    
    // END OF GAME OR CONTINUE
    if (numberOfRound === roundParameter) {
        endOfGame(winnerIndex);
        return
    } else {numberOfRound++} 

}   


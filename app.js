// Selectors
const addPlayerBtn = document.querySelector('.addPlayer');
const playerForm = document.querySelector('.playerForm');
let roundParameter = 0;
let euroParameter = 0;
let tutorialOn = null;
const startGameBtn = document.querySelector('.startGame');
const removePlayerBtn = document.querySelector('.removePlayer');
const intro = document.querySelector('.intro');
const match = document.querySelector('.match');
const tutorialRules = document.querySelector('.tutorialRule');
const tutorialScore = document.querySelector('.tutorialScore');
const tutorialRulesOkBtn = document.querySelector('.tutorialRulesOkBtn');
const tutorialScoreOkBtn = document.querySelector('.tutorialScoreOkBtn');
let listOfPlayer = [];
let playerScores = [];
const turnMessage = document.querySelector('.turnMessage');
const whiteTransition = document.querySelector('.whiteTransition');
const pRoundScoreList = document.querySelector('.pRoundScoreList');
const pTotalScoreList = document.querySelector('.pTotalScoreList');
const rollDicesBtn = document.querySelector('.rollBtn');
const tableScore = document.querySelector('.tableScore span');
let handTurnMarker = 0;

// Variables
let playerCount = 2
let ableToRoll = true;
let ableToSelect = 0;
let dCount = 0;
let scoreRound = 0
let turnCount = 0;
let roundCount = 0;
let winnerIndex = 0;
let finishGame = false;

    // Dices variables
const d4 = document.querySelector('.d4');
const d6 = document.querySelector('.d6');
const d8 = document.querySelector('.d8');
const d10 = document.querySelector('.d10');
const d20 = document.querySelector('.d20');
const dValues = document.querySelectorAll('.diceSection span') 
const dices = [d4, d6, d8, d10, d20];
const dicesSelected = document.querySelectorAll('.selectedDices li');

// Event Listeners
addPlayerBtn.addEventListener('click', addPlayer);
removePlayerBtn.addEventListener('click', removePlayer);
startGameBtn.addEventListener('click', startGame);
rollDicesBtn.addEventListener('click', () => {
    if (ableToRoll === true) { rollDices() } else { return }
});
tutorialRulesOkBtn.addEventListener('click',tutorialRulesOk);
tutorialScoreOkBtn.addEventListener('click',tutorialScoreOk);
for (let dice of dices) {dice.addEventListener('animationend', function(){ this.style.animation = '' })}

// MAPPING EVENT LISTENER TO EACH DICE:
for (let i = 0; i < 5; i++) {
    dices[i].addEventListener('click', function(){
        if (ableToSelect > 0) { dSelection(i) } else { return }    
    })
}

// Functions

function addPlayer(event){
    event.preventDefault();
    if (playerCount < 5) {
    playerCount++;
    // CREATION OF LI
    const playerLi = document.createElement('li');
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
    getParameters();

    // Display changes:
    intro.classList.toggle('fadeOut');
    match.classList.toggle('fadeOut');
    newTurn(listOfPlayer[0]);
    if (tutorialOn === true) {setTimeout(() => {tutoRules()}, 2000)};
}

function getParameters() {
    playerScores = document.querySelectorAll('.pRoundScoreList .pScore');
    playerTotalScore = document.querySelectorAll('.pTotalScoreList .pScore');
    roundParameter = document.querySelector('.roundParameter').value - 1; //First round starts at 0
    euroParameter = document.querySelector('.euroParameter').value;
    handTurnMarker = document.querySelectorAll('.pRoundScoreList .spanName i');
    tutorialOn = document.querySelector('#tutorial').checked;  
};

function collectingPlayerNames () {
    const pNames = document.querySelectorAll('.intro .pName');
    for (let pName of pNames) {listOfPlayer.push(pName.value)};
}

function generatePlayerLines() {
    for ( i = 0; i < playerCount; i++ ) {
        // CREATION OF LI FOR ROUND SCORE
            // NAME OF PLAYER
        const playerLi1 = document.createElement('li');
        const playerName1 = document.createElement('span');
        playerName1.innerHTML = `<i class="fas fa-hand-point-right"></i> ${listOfPlayer[i]} :`; //i element is the hand pointer for marking who's turn it is
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

function newTurn (player) {
    rollDicesBtn.style.pointerEvents = 'none';
    handTurnMarker[turnCount].style.opacity = 1;
    turnMessage.innerText = `It is ${player}'s turn`;
    whiteTransition.style.opacity = 1;
    setTimeout(function(){
        whiteTransition.style.opacity = 0;
        rollDicesBtn.style.pointerEvents = 'all';
    }, 2000);
}


// GAME SECTION

function rollDices () {
    if (dCount < 5) {
        for (let dice of dices) {dice.style.animation = 'shakeDice 1.5s ease'};
        setTimeout(() => {diceResultGen()}, 1500); // Updating dice values at end of animation
        ableToRoll = false;
        ableToSelect = 2;
    } else {
        endOfTurn();
    }
}

function diceResultGen () { 
    let rangeOfDices = [4, 6, 8, 10, 20];
    if (dCount < 5) {
        const diceMath = (dValue) => {return Math.ceil(Math.random() * dValue)};
        for (i = 0; i < rangeOfDices.length; i++) {
            dValues[i].innerText = (diceMath(rangeOfDices[i]));
        }
        for (let dice of dices) {dice.style.pointerEvents = "all"};
        document.querySelector('.diceSection p').style.opacity = '1';
    } else {
        return
    }
}

function endOfTurn() {
    updateRoundScore(scoreRound);
    handTurnMarker[turnCount].style.opacity = 0;
    newGameSetup(); 
    if(!finishGame) { newTurn(listOfPlayer[turnCount]) } ; // Not running at final turn
}

function dSelection(i) {
    dices[i].style.display = 'none';
    dicesSelected[i].lastElementChild.innerText = dValues[i].innerText;
    dicesSelected[i].style.opacity = 1;
    ableToRoll = true;
    ableToSelect--;
    dCount++;
    updateTableScore(parseInt(dValues[i].innerText));
    if (dCount === 5) { finishSelection() } 
}

function finishSelection() { // END OF TURN LAYOUT FOR SELECTED DICES
    ableToRoll = true;
    rollDicesBtn.innerText = 'Next Turn';
    document.querySelector('.diceSection p').style.opacity = '0';
    document.querySelector('.tableScore').style.fontSize = '50px';
}

function updateTableScore(result){
    scoreRound = scoreRound + result;
    document.querySelector('.tableScore span').innerText = scoreRound;
};

function updateRoundScore(scoreRound){
    let playerScore = scoreRound + parseInt(playerScores[turnCount].innerHTML);
    playerScores[turnCount].innerHTML = playerScore;
};

function newGameSetup () { // LAYOUT RESET TO INITIAL TURN SETUP + TRIGGER OF END OF GAME SCENARIO
    turnCount === (playerCount - 1) ? endOfRound() : turnCount++; // 
    parametersReset();
    handTurnMarker[turnCount].style.opacity = 1;
    dicesReset();
}

function endOfRound() {
    if (tutorialOn === true && roundCount === 0) {setTimeout(() => {tutoScore()}, 2000)};
    turnCount = (turnCount + 1) - playerCount;
    pushScoresToTotal();
    for (let score of playerScores) {score.innerText = "0"};
}

function parametersReset() {
    dCount = 0;
    ableToRoll = true;
    ableToSelect = 0;
    scoreRound = 0;
    updateTableScore(0);
    document.querySelector('.tableScore').style.fontSize = '1rem';
}

function dicesReset() {
    for (let dice of dices) {
        dice.style.animation = 'animationend';
        dice.style.display = 'inline-block';
        dice.style.pointerEvents = 'none';
    };
    for (let dValue of dValues) {dValue.innerText = ("?")};
    for (let diceSelected of dicesSelected) {diceSelected.style.opacity = 0};
    rollDicesBtn.innerHTML = 'Roll Dices <i class="fas fa-dice">';
}

// END OF A ROUND, ALL ROUND SCORES GO TO TOTAL SECTION + END OF GAME SCENARIO
function pushScoresToTotal() {
    playerScoresArr = Array.from(playerScores); // Conversion Node to Array
    let newArray = playerScoresArr.map(score => parseInt(score.innerText));
    let bestScore = Math.max(...newArray)
    winnerIndex = newArray.indexOf(bestScore);

    for (i = 0; i < playerTotalScore.length; i++) {
        let totalScore = parseInt(playerTotalScore[i].innerText) - parseInt(playerScoresArr[i].innerText);
        playerTotalScore[i].innerText = `${totalScore} points = ${(totalScore * euroParameter).toFixed(2)}€`;
    }

    let winnerScore = newArray.reduce((a, b) => a + b, 0) - bestScore;
    let winnerScoreAccumulation = bestScore + winnerScore + parseInt(playerTotalScore[winnerIndex].innerText);
    playerTotalScore[winnerIndex].innerText = `${winnerScoreAccumulation} points = ${(winnerScoreAccumulation * euroParameter).toFixed(2)}€`;
    
    // END OF GAME OR CONTINUE
    if (roundCount === roundParameter) {
        endOfGame(winnerIndex);
    } else {roundCount++} 
}   

function endOfGame(winnerIndex) {
    const tableOfFinalScore = document.querySelector('.tableOfFinalScore');
    const playerLines = document.querySelectorAll('.tableOfFinalScore span');
    
    rollDicesBtn.style.pointerEvents = 'none';
    whiteTransition.style.opacity = 1;
    turnMessage.innerText = `${listOfPlayer[winnerIndex]} is the winner`;
    finishGame = true;
    
    setTimeout(function(){
        turnMessage.style.display = 'none';
        tableOfFinalScore.style.display = 'block';
    }, 2000);

    for (i = 0; i < playerTotalScore.length; i++) {
        let moneyWin = (parseInt(playerTotalScore[i].innerText) * euroParameter).toFixed(2); // Scores to euros: 2 numbers after coma
        if (parseInt(playerTotalScore[i].innerText) > 0) {
            playerLines[i].innerText = `${listOfPlayer[i]} earns ${moneyWin}€`
        } else {
            playerLines[i].innerText = `${listOfPlayer[i]} loses ${moneyWin}€`
        }
    }
}

// TUTORIALS FUNCTIONS
function tutoRules() {
    rollDicesBtn.style.pointerEvents = 'none';
    tutorialRules.style.opacity = '1';
    tutorialRulesOkBtn.style.pointerEvents = 'all';
}
function tutorialRulesOk() {
    rollDicesBtn.style.pointerEvents = 'all';
    tutorialRules.style.opacity = '0';
    tutorialRulesOkBtn.style.pointerEvents = 'none';
    setTimeout(() => tutorialRules.style.display = 'none', 1000);
    rollDicesBtn.style.animation = 'blinkBtn 1.2s ease 3';
}
function tutoScore() {
    rollDicesBtn.style.pointerEvents = 'none';
    tutorialScore.style.opacity = '1';
    tutorialScoreOkBtn.style.pointerEvents ='all';
}
function tutorialScoreOk() {
    rollDicesBtn.style.pointerEvents = 'all';
    tutorialScore.style.opacity = '0';
    tutorialScoreOkBtn.style.pointerEvents ='none';
    setTimeout(() => tutorialScore.style.display = 'none', 1000);
}
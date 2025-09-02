// -------- VARIABLES GLOBALES ---------

const cards = document.querySelectorAll('.memoryCard');
const shuffleBtn = document.getElementById('shuffle');
const resetBtn = document.getElementById('Reset');
const pairs = document.getElementById('pairs');
const moves = document.getElementById('moves');
const time = document.getElementById('time');
const winMessage = document.getElementById('winMessage');
const playAgain = document.getElementById('playAgain');
const exitGame = document.getElementById('exitGame');



// Variables para el juego -->

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


// -------- FUNCIONES ---------


// Dar la vuelta a las cartas -->

function flipCard() {

if(lockBoard) return;
if(this === firstCard) return;

this.classList.add('flip');

if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
}

secondCard = this;

checkForMatch();    
}


// Checkear si hay match -->

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    if(isMatch){
        pairs.textContent = parseInt(pairs.textContent) + 1;
        checkWin();
    }
}


// Sólo dos cartas a la vez -->

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


// Dar la vuelta si no hay match -->

function unflipCards() {
lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}


// Resetear cartas-->

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
   
}


//Barajar cartas -->

 function shuffle() {
   cards.forEach(card => {
     let ramdomPos = Math.floor(Math.random() * 12);
     card.style.order = ramdomPos;
   });
 };



// -------- CONTADORES ---------


// CLICKS
moves.textContent = '0';

function countMoves() {
    moves.textContent = parseInt(moves.textContent) + 1;
}
cards.forEach(card => card.addEventListener('click', countMoves));

time.textContent = '0';


// TIMER



 
// ---------- BOTONES ----------
 

// Botón barajar -->

 function barajar(){
    cards.forEach(card => card.classList.remove('flip'));
    pairs.textContent = '0';
    moves.textContent = '0';
    setTimeout(shuffle, 500);
    cards.removeEventListener('click', flipCard);
    cards.forEach(card => card.addEventListener('click', flipCard));
 }

shuffleBtn.addEventListener('click', barajar);


// Resetear el tablero y las cartas -->

function resetBoardAndCards() {
    cards.forEach(card => card.classList.remove('flip'));
    pairs.textContent = '0';
    moves.textContent = '0';
    resetBoard();
    shuffle();
    cards.removeEventListener('click', flipCard);
    cards.forEach(card => card.addEventListener('click', flipCard));
}


resetBtn.addEventListener('click', resetBoardAndCards);
exitGame.addEventListener('click', () => {winMessage.style.visibility = 'hidden';});
playAgain.addEventListener('click', rePlay);



// MENSAJES

// Mensaje completar parejas
function showWinMessage() {
    winMessage.classList.add('show');
};


function checkWin() {
    if(pairs.textContent === '6') {
        showWinMessage();
    }}

function rePlay() {
    resetBoardAndCards();
}


cards.forEach(card => card.addEventListener('click', flipCard));
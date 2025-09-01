// -------- VARIABLES GLOBALES ---------

const cards = document.querySelectorAll('.memoryCard');
const shuffleBtn = document.getElementById('shuffle');
const resetBtn = document.getElementById('Reset');
const pairs = document.getElementById('pairs');
const moves = document.getElementById('moves');
const time = document.getElementById('time');



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
    }
}


// Sólo dos cartas a la vez -->

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


// Revoltear si no hay match -->

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
let seconds = 0;
let timer; 

function timerFunction() {
    seconds++;
    time.textContent = seconds;
}



// function startTimer() {
//     setInterval(() => {
//         time.textContent = parseInt(time.textContent) + 1;
//     }, 1000);
//     stopTimer();
    
// }

// function stopTimer() {
// if(pairs.textContent === '6') {
//     clearInterval();
//     time.textContent = '0';
// }
// }

// cards.forEach(card => card.addEventListener('click', startTimer, {once: true}));

 
// ---------- BOTONES ----------
 

// Botón barajar -->

 function barajar(){
    cards.forEach(card => card.classList.remove('flip'));
    pairs.textContent = '0';
    moves.textContent = '0';
    setTimeout(shuffle, 500);
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
}


resetBtn.addEventListener('click', resetBoardAndCards);


cards.forEach(card => card.addEventListener('click', flipCard));
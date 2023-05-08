const buttonStart = document.querySelector('.button-start');
const buttonEnd = document.querySelector('.button-end');
const buttonRanking = document.querySelector('.button-ranking');
const cardsBox = document.querySelector('.cards');
const nicknameForm = document.querySelector('.nickname_form');
const get_nickname = document.querySelector('.get_nickname');
const nickInput = document.querySelector('.nickInput');
const movesCount = document.querySelector('.moves');
const timeCount = document.querySelector('.time');
const winPanel = document.querySelector('.winPanel');
const buttonRestart = document.querySelector('.button-restart');
const buttonQuit = document.querySelector('.button-quit');

let cardColors;
let cards;
let activeCard;
let activeCardsBox;

let startTime;
let timerInterval;

let gameLength;
let gameResult;
let moves;
let stillPlay;

let nickname;

const clickCard = function () {
    if (stillPlay) {
        console.log('Game over');
        activeCardsBox.classList.add('hidden');
        console.log(activeCardsBox);
        return;
    }
    console.log('Rozpoczecie ');
    activeCard = this;

    if (activeCard === activeCardsBox[0]) return;

    activeCard.classList.remove('hidden'); //hidden actiived card

    if (activeCardsBox.length === 0) {
        // set activeCard on index 0
        activeCardsBox[0] = activeCard;
    } else {
        console.log('2 element');
        // remove possibility click
        cards.forEach(card => card.removeEventListener('click', clickCard));
        // set second activeCard on index 1
        activeCardsBox[1] = activeCard;

        setTimeout(function () {
            if (activeCardsBox[0].className === activeCardsBox[1].className) {
                console.log('wygrane');
                activeCardsBox.forEach(card => card.classList.add('off'));
                gameResult++;
                cards = cards.filter(card => !card.classList.contains('off'));
                moves++;
                //
                if (gameResult === gameLength) {
                    clearInterval(timerInterval);
                    document.getElementById('nickname').innerHTML = nickname; // display moves
                    winPanel.style.display = 'block';
                    // alert(`Udało się! Twój wynik to: ${'gameTime'} sekund`);
                    // location.reload();
                }
            }
            //loss, hide cards again
            else {
                console.log('przegrana');
                //
                activeCardsBox.forEach(card => card.classList.add('hidden'));
                moves++;
            }
            //Reset to new game
            activeCard = ''; //active card
            activeCardsBox.length = 0; // length set on 0
            cards.forEach(card => card.addEventListener('click', clickCard)); //activate click
            document.getElementById('moves').innerHTML = moves; // display moves
        }, 500);
    }
};
const init = function () {
    cardColors = [
        'red',
        'red',
        'green',
        'green',
        'blue',
        'blue',
        'brown',
        'brown',
        'yellow',
        'yellow',
        'gray',
        'gray',
        'cadetblue',
        'cadetblue',
        'violet',
        'violet',
        'lightgreen',
        'lightgreen',
    ];

    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardColors.length);
        //add  color class for class card
        card.classList.add(cardColors[position]);
        //remove added element do cardcolor
        cardColors.splice(position, 1);
    });
    //set timeout after 2 sec
    setTimeout(function () {
        cards.forEach(card => {
            // card.classList.add('hidden');
            card.addEventListener('click', clickCard);
        });
    }, 2000);
};

function submitNickNameForm(e) {
    e.preventDefault();
    nickname = nickInput.value;
    if (nickname.length <= 0) {
        throw new Error('write nickname');
    }
    console.log(nickname);
    // fetch('', {
    //     method: "POST",
    // })
    get_nickname.style.display = 'none';
}
function endGame() {
    buttonStart.style.display = 'flex';
    buttonRanking.style.display = 'flex';
    buttonEnd.style.display = 'none';
    cardsBox.style.display = 'none';
    movesCount.style.display = 'none';
    timeCount.style.display = 'none';
    winPanel.style.display = 'none';
    clearInterval(timerInterval);
    stillPlay = true;
}

function startGame() {
    stillPlay = false;
    startTime = Date.now();
    cards = document.querySelectorAll('.card');
    // removes another attributes like "off"
    cards.forEach(card => {
        card.className = 'card';
    });
    cards = [...cards];
    gameLength = cards.length / 2;
    gameResult = 0;
    activeCard = '';
    activeCardsBox = [];
    moves = 0;
    timerInterval = setInterval(updateTimer, 1000);
    buttonStart.style.display = 'none';
    buttonRanking.style.display = 'none';
    winPanel.style.display = 'none';
    buttonEnd.style.display = 'block';
    movesCount.style.display = 'block';
    timeCount.style.display = 'block';
    cardsBox.style.display = 'flex';
    document.getElementById('moves').innerHTML = moves;
    document.getElementById('timer').innerHTML = '0';
    function updateTimer() {
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime;
        document.getElementById('timer').innerHTML = Math.floor(elapsedTime / 1000);
    }
    init();
}

nicknameForm.addEventListener('submit', submitNickNameForm);
buttonStart.addEventListener('click', startGame);
buttonEnd.addEventListener('click', endGame);
buttonRestart.addEventListener('click', startGame);
buttonQuit.addEventListener('click', endGame);





//
// function saveScore(nick, time) {
//     const scores = JSON.parse(localStorage.getItem("memoryScores")) || [];
//     scores.push({ nick, time });
//     localStorage.setItem("memoryScores", JSON.stringify(scores));
// }
//
// // Odczytanie wyników z localStorage
// function getScores() {
//     return JSON.parse(localStorage.getItem("memoryScores")) || [];
// }


const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

let cards = document.querySelectorAll(".card");
cards = [...cards];

let activeCard = "";
let activeCardsBox = [];

const gameLength = cards.length / 2;
let gameResult = 0;
// count moves
let moves = 0;
let stillPlay = false;

const clickCard = function () {
    if (stillPlay)  {
        console.log("Game over")
        activeCardsBox.classList.add("hidden")
        console.log(activeCardsBox)
        return;
    }
    console.log("Rozpoczecie ")
    activeCard = this;

    if (activeCard === activeCardsBox[0]) return;

    activeCard.classList.remove("hidden"); //hidden actiived card

    if (activeCardsBox.length === 0) {
        // set activeCard on index 0
        activeCardsBox[0] = activeCard;
    }
    else {
        console.log("2 element");
        // remove possibility click
        cards.forEach(card => card.removeEventListener("click", clickCard))
        // set second activeCard on index 1
        activeCardsBox[1] = activeCard;

        //Pół sekundy od odsłoniecia - decyzja czy dobrze czy źle
        setTimeout(function () {
            //sprawdzenie czy to te same karty - wygrana
            if (activeCardsBox[0].className === activeCardsBox[1].className) {
                console.log("wygrane")
                activeCardsBox.forEach(card => card.classList.add("off"))
                gameResult++;
                cards = cards.filter(card => !card.classList.contains("off"));
                moves++;
                //Sprawdzenie czy nastąpił koniec gry
                if (gameResult === gameLength) {
                    alert(`Udało się! Twój wynik to: ${"gameTime"} sekund`)
                    location.reload();
                }
            }
            //loss, hide cards again
            else {
                console.log("przegrana")
                //
                activeCardsBox.forEach(card => card.classList.add("hidden"))
                moves++;
            }
            //Reset to new game
            activeCard = ""; //active card
            activeCardsBox.length = 0; // length set on 0
            cards.forEach(card => card.addEventListener("click", clickCard))//activate click
            document.getElementById("moves").innerHTML = moves; // display moves
        }, 500)
    }
};
const init = function () {
        console.log("start function init")
        // random class for card
        cards.forEach(card => {
            const position = Math.floor(Math.random() * cardColors.length);
            //add  color class for class card
            card.classList.add(cardColors[position]);
            //remove added element do cardcolor
            cardColors.splice(position, 1);
        })
        //set timeout after 2 sec
        setTimeout(function () {
            cards.forEach(card => {
                card.classList.add("hidden")
                card.addEventListener("click", clickCard)
            })
        }, 2000)
};
let buttonStart = document.querySelector(".button-start")
let buttonEnd = document.querySelector(".button-end")
let buttonRanking = document.querySelector(".button-ranking")
let cardsBox = document.querySelector(".cards")
let nicknameForm = document.querySelector(".nickname_form")
let get_nickname = document.querySelector(".get_nickname")
let nickInput = document.querySelector('.nickInput');
let movesCount = document.querySelector('.moves');
let timeCount = document.querySelector('.time');
nicknameForm.addEventListener("submit",event=>{
    let nickname = nickInput.value
    if (nickname.length > 0){
        console.log(nickname)
        // fetch('', {
        //     method: "POST",
        // })
        get_nickname.style.display= "none";
    } throw new Error('write nickname')
})
let startTime = 0;
let timerInterval = 0;
buttonStart.addEventListener("click", () => {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    buttonStart.style.display= "none";
    buttonRanking.style.display= "none";
    buttonEnd.style.display= "block";
    movesCount.style.display= "block";
    timeCount.style.display= "block";
    cardsBox.style.display= "flex";
    moves = 0;
    function updateTimer() {
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime;
        document.getElementById("timer").innerHTML = Math.floor(elapsedTime / 1000);
    }
    init()
})

buttonEnd.addEventListener("click", () => {
    buttonStart.style.display= "flex";
    buttonRanking.style.display= "flex";
    buttonEnd.style.display = "none";
    cardsBox.style.display= "none";
    movesCount.style.display= "none";
    timeCount.style.display= "none";
    clearInterval(timerInterval);
    stillPlay = true;
    moves = 0;
})



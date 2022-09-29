
var gameboard = document.getElementById('game')
var card =document.getElementsByClassName('card')
var highScore = document.getElementById('highScore')
var player1ScoreHTML = document.getElementById('player1Score')
var player2ScoreHTML = document.getElementById('player2Score')
var turnText = document.getElementById('turntext')
var reset = document.getElementById('reset')
var highScoreHTML = document.getElementById('highScore')
var turnCountHTML = document.getElementById('tuncount');
var cards
var allCards
var player
var player1Score = 0
var player2Score = 0
var numberArray = []
var finalArray = []
var turn = true
var storageKey = 'scoreKey'
var count = 0

function highScoreDisplay(){
    highScoreHTML.innerHTML= `higscore: ${localStorage.getItem(storageKey)}`;
}
highScoreDisplay()

function turncount(){
    turnCountHTML.innerHTML=`turn: ${count}`
}
turncount()

function arrayGeneration () {
    for (a=0; a<50; a++) {
        numberArray.push(a);
        numberArray.push(a);
    }
}
arrayGeneration()
function randomizeArray () {
    finalArray = []
    while(numberArray.length > 0) {
        let num = Math.random()*numberArray.length; //Generere et tilfældig tal i forhold til mit arrays længde 
        var numRoundedDown = Math.floor(num); //Runder tallet ned til nærmeste hele tal 
        finalArray.push(numberArray.splice(numRoundedDown,1)[0]);//Putter tallet over i finalarray og gentager derefter processen indtil der ikke er flere tal tilbage i arrayet 
    }
}
randomizeArray()

function drawBoard () {
    for(a=0; a<100; a++){
        cards = document.createElement('div');//laver kort elementerne
        cards.className='card';
        cards.innerHTML = `${finalArray[a]}`;
        gameboard.appendChild(cards);//Sætter det ind i elementet som et child
    }
    allCards = document.querySelectorAll(".card")
    Array.from(allCards).forEach(card=> {
        card.addEventListener('click',cardclick)
    })
}
drawBoard()
function playerScore () {
    player1ScoreHTML.innerHTML =`score: ${player1Score}`
    player2ScoreHTML.innerHTML =`score: ${player2Score}`
}
playerScore()
turnText.innerHTML = `player 1 turn`;
function switchPlayer () {
    if (!turn) {
        player = 'layer1'
        turnText.innerHTML = `player 1 turn`;
        turn = !turn
        count ++
    } else {
        player = 'player2'
        turnText.innerHTML = `player 2 turn`;
        turn = !turn
        count ++
    }
    turncount()
    console.log(turn)
}

let firstValue
function cardclick(e) {
    e.target.style.color='black'
    console.log(e.target)
    if (!firstValue) {
        firstValue = e.target
        firstValue.style.pointerEvents = "none"
        firstValue.style.cursor ="not-allowed"
        //vis første kort
        return
    }
    if (firstValue.innerHTML == e.target.innerHTML) {
        console.log('correct answer')
        setTimeout(()=> {
            firstValue.style.opacity = "0"
            e.target.style.opacity = "0"
            e.target.style.pointerEvents ="none"
            e.target.style.cursor ="not-allowed"
            firstValue.style.pointerEvents = "none"
            firstValue.style.cursor ="not-allowed"
            firstValue = false;
            if (turn==true) {
                player1Score++
            }
            if (turn==false) {
                player2Score++
            }
            playerScore()
            highScoreCalculator()
            Array.from(allCards).forEach(card=> {
            card.style.color = "transparent"
            })
            }, 1000)
    } else {
        console.log('incorrect answer')
        firstValue.style.pointerEvents = "auto"
        firstValue.style.cursor ="pointer"
        setTimeout(()=>{Array.from(allCards).forEach(card=> {
            card.style.color = "transparent"
        })},1000)
        firstValue = false
        switchPlayer()
    }
    
}
function checkwin () {
    for (a=0; a<100; a++) {
        if (card[a].style.opacity != "0" ) {
            console.log(allCards[a] + 'true')
            return false
        }
    }
    return true
}
function highScoreCalculator () {
    if (checkwin()) {
        if (player1Score > player2Score) {
            localStorage.setItem (storageKey, `sidste spil vandt spiler 1 med ${player1Score} stik med ${count} ture`)
        } else if (player1Score == player2Score) {
            localStorage.setItem (storageKey, `sidste Spil belv ufagjordt med ${player1Score} stik med ${count} ture`)
        } else {
            localStorage.setItem (storageKey, `sidste spil vandt spiler 2 med ${player2Score} stik med ${count} ture`)
        }
}
highScoreDisplay()
}

function playerReset() {
    turnText.innerHTML = `player 1 turn`;
    turn = true
}

reset.addEventListener('click',resetbutton)
function resetbutton () {
    gameboard.innerHTML= ""
    count = 0
    player1Score = 0
    player2Score = 0
    playerScore ()
    arrayGeneration()
    randomizeArray()
    drawBoard()
    playerReset()
    turncount()
}


//gammel version af koden//
/*function cards () {
    cards = document.createElement('div');//laver kort elementerne
    cards.className='card';
    cards.innerHTML = `${test}`;
    gameboard.appendChild(cards);
}
cards
/*for(a=0; a<50; a++){
    console.log(a); //tjek om tal bliver genereret//
    cardA = document.createElement('div');//laver kort elementerne
    textA = document.createElement('p');
    cardA.className='card';
    cardA.innerHTML = `${rng}`;
    gameboard.appendChild(cardA);

}
for(b=0; b<50; b++){
    console.log(b); //tjek om tal bliver genereret//
    cardB = document.createElement('div'); //laver kort elementerne
    textB = document.createElement('p');
    cardB.className='card';
    cardB.innerHTML = `${b}`;
    gameboard.appendChild(cardB);

}*/

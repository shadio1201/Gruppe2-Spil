// Antal liv man har:
let countLife = 6;
let points = document.getElementById("points");
points.innerHTML = "You have " + countLife + " life left";

// billede array
const imgArray = ['img6', 'img5', 'img4', 'img3', 'img2', 'img1', 'img0'];

// Ord der kan gættes
let gameWords = ["Aalborg", "Århus", "Randers", "Vejle", "Kolding"];

// Ordet der bliver udvalgt af math.random
const randomWord = Math.floor(Math.random() * gameWords.length);

// randomWord laves til hiddenWord ikke er array og det er ordet som skal gættes:
let hiddenWord = gameWords[randomWord].toLocaleUpperCase();


// Bogstaver på skærmen:
let bogstavOnScreen = document.getElementById("bogstaverContainer");


// Ny div som er bogstavernes (på skærmens indhold):
for (var i = 0; i < hiddenWord.length; i++) {
    let createDiv = document.createElement("div");
    bogstavOnScreen.appendChild(createDiv);
    createDiv.setAttribute("class", "wordOnScreen");
}

// Lave et array om til knapper.
// Link til keyboard: https://stackoverflow.com/questions/48247532/create-an-array-of-buttons-from-javascript-array - der er ændret en smule
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å'];

// til at skifte billede
let index = 0;

// knapperne til alfabetet:
var buttons = document.getElementById("buttons");


// array til at gemme bogstaver der er gættet:
let guessWords = [];

// Array
let guessWordClass = document.getElementsByClassName("wordOnScreen");

// start spillet igen
let startGame = document.getElementById("start");

startGame.addEventListener('click', function () {
    document.location.reload();
});


// Loop til at lave knappen:
for (var i = 0; i < alphabet.length; i++) {
    var btn = document.createElement("button");
    var t = document.createTextNode(alphabet[i]);
    btn.appendChild(t);
    document.getElementById("buttons").appendChild(btn);

    //tilføjer classe for at kunne style i css filen
    btn.classList.add("keyboardBtn");

    // Tilføjer funktion til knap
    btn.addEventListener('click', function (e) {
        // loop der smider de rigtig bogstaver ind de rigtige steder
        for (var j = 0; j < hiddenWord.length; j++) {
            if (e.target.innerHTML == hiddenWord[j]) {
                // Viser hvor bogstavet er på hiddenWord

                guessWordClass[j].innerHTML = e.target.innerHTML;
            }
        }

        // Når spiller gætter rigtigt
        if (hiddenWord.includes(e.target.innerHTML)) {
            let hiddenWordArray = hiddenWord.split("");
            // bogstav skal gemmes i guessWords
            for (let i = 0; i < hiddenWord.length; i++) {
                if (hiddenWord[i] == e.target.innerHTML) {
                    guessWords.push(e.target.innerHTML)
                }
            }

            // Når spilleren vinder: <--------
            if (hiddenWordArray.length == guessWords.length) {
                document.querySelector('.image').src = "img/win" + ".png";
            }
        }

        else {
            // hangman billede når man gætter forkert (det ændre sig)
            index++;
            document.querySelector('.image').src = "img/" + imgArray[index] + ".png";
            // Trækker 1 liv fra:
            countLife--;
            points.innerHTML = "You have " + countLife + " life left";
            // billede kommer ikke frem!!!! <----
            if (countLife == 0) {
                document.querySelector('.image').src = "img/tryagain" + ".png";
                bogstavOnScreen.style.display = "none";
                startGame.style.display = "block";
            }
        };
    });
};

const kolonner = document.querySelectorAll(".kolonne");
const kolonneBoxes = document.querySelectorAll(".kolonneBox");
const root = document.querySelector(":root");
root.style.setProperty('--current', `'🔴'`);

console.log(Array.from(kolonneBoxes))

let playerSwitch = false;

let currentPlayer;
let currentHover;

const solutions = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

kolonner.forEach(kolonne => {

    //add eventListener to all columns
    kolonne.addEventListener("click", (e) => {

        //get target box
        let targetBox;

        //check if column is full
        if (Array.from(kolonne.children).every(item => {
            return item.innerHTML
        })) {
            //show error animation
            root.style.setProperty('--animate-wrong', 'wrongMove 150ms ease-out');
            setTimeout(() => { root.style.setProperty('--animate-wrong', '""') }, 150);
            return;
        }

        //get all children of column
        let childrenNodes = kolonne.children;

        //check which player
        (!playerSwitch) ? currentPlayer = "🔴" : currentPlayer = "🟡";

        //find first empty box and insert player coin
        for (let i = childrenNodes.length - 1; i >= 0; i--) {
            if (childrenNodes[i].innerHTML.trim() == "") {
                targetBox = childrenNodes[i];
                childrenNodes[i].innerHTML = `<span style="top:-${(100 * i) + 100}px" class="playObj">${currentPlayer}</span>`;
                /* setTimeout(() => { childrenNodes[i].firstChild.classList.add("dropped") }, 100); */
                setTimeout(() => { childrenNodes[i].firstChild.style.top = "-2px" }, 100);
                break;
            }
        }

        //check for win
        checkWin(targetBox, currentPlayer);

        //which player
        playerSwitch = !playerSwitch;

        //Which hover icon
        (currentPlayer == "🔴") ? currentHover = "🟡" : currentHover = "🔴";
        root.style.setProperty('--current', `'${currentHover}'`);
    }, true)
})

/* findEmptyBox();

function findEmptyBox(e) {
    let childrenNodes = e.target.parentNode.children;
    for (let i = childrenNodes; i >= 0; i--) {
        console.log(i);
    }
} */

let countTiles = 0;



const checkWin = (box, currentPlayer) => {
    let playedBoxes = [];
    let checkResult = [
        [],
        []
    ];

    // Push every row box into array
    document.querySelectorAll(`[data-row="${box.dataset.row}"]`).forEach(rowItem => {
        if(!rowItem.innerHTML) {
            checkResult[0].push("false");  
        }
        if(rowItem.innerHTML) {
            checkResult[0].push(rowItem.innerText);   
        }
    })

    // Check for vertical win
    for (let count = 0; count < 4; count++) {
        if (count == 0) {
            checkResult[1].push(document.querySelector(`[data-box="${Number(box.dataset.box)}"]`).innerText)
            continue;
        }
        let currEle = Number(box.dataset.box) + 7 * count
        /*         console.log(currEle); */
        if (currEle > 42) {
            checkResult[1].push('No box');
            continue;
        }
        checkResult[1].push(document.querySelector(`[data-box="${currEle}"]`).innerText)
    }

    //check which tile is used

    /* for (let index = 0; index < kolonneBoxes.length; index++) {
        console.log('hi')
        if (kolonneBoxes[index].innerHTML) {
            playedBoxes.push(kolonneBoxes[index].dataset.box)
        }
    } */

    /* let FourRow;

    //check horisontal win
    for (let i = 0; i < checkResult[0].length; i++) {
        FourRow = 0;
        for (let j = 1; j < 4; j++) {
            if(checkResult[0][i] === "false"){
                continue;
            }
            if (checkResult[0][i] === checkResult[0][i + j]) {
                FourRow++
                if (FourRow === 3) {
                    result == true;
                    break;
                }
            }
        }
    } */
    let result = solutions.some(combo => {
        return combo.every(item => {
            return document.querySelector(`[data-box="${Number(item + 1)}"]`).innerText == currentPlayer;
        })
    })
    //check for vertical win
    /* let verticalResult = () => {
        return areSame(checkResult[1])
    } */

    /* let verticalResult = areSame(checkResult[1])

    let horisontalResult = function () {
        /* let result;
        for (let checkedValue = 0; checkedValue < 7; checkedValue++) {
            if (checkResult[0][checkedValue] == '') {
                continue;
            }
            for (let i = 1; i < 4; i++) {
                if (checkResult[0].indexOf(checkedValue) > -1) {
                    console.log(checkResult[0].indexOf(checkedValue + i))
                    result = true;
                } else {
                    console.log(false)
                    result = false;
                }
            }
        }
        return result;
    } */
    if(result) {
        root.style.setProperty('--current', `' '`);
        kolonner.forEach(kolonne => {
            kolonne.style.pointerEvents = "none";   
        })
        document.querySelector(".messBox").style.boxShadow = "0 0 5px rgb(0 0 0 / 50%)";
        document.querySelector(".result").innerText = currentPlayer + "Wins!"
        setTimeout(()=> {
            for(let i = 42; i > 0; i--) {
                if(document.querySelector(`[data-box="${Number(i)}"]`).firstChild == null) {
                    continue;
                }
                document.querySelector(".messBox").style.boxShadow = "0 0 0px rgb(0 0 0 / 50%)";
                document.querySelector(".result").innerText = " "
                document.querySelector(`[data-box="${Number(i)}"]`).firstChild.style.top = "700px"
                setTimeout(()=> {
                    location.reload();
                }, 300)
            }
        }, 5000)
    }
}

/* function areSame(array) {
    let length = new Set(array);
    return (length.size == 1);
} */

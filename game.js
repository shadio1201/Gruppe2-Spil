const kolonner = document.querySelectorAll(".kolonne");
const kolonneBoxes = document.querySelectorAll(".kolonneBox");
const root = document.querySelector(":root");
root.style.setProperty('--current', `'🔴'`);

let playerSwitch = false;

let currentPlayer;
let currentHover;

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

    document.querySelectorAll(`[data-row="${box.dataset.row}"]`).forEach(rowItem => {
        checkResult[0].push(rowItem.innerText);
    })

    /* for (let count = Number(box.dataset.box); count > 0; count--) {

        console.log(count)

        /* let currEle = box.dataset.box - count; */

    /* if (count <= 0) {
        checkResult[0].push('No box');
        continue;
    }
    if (count === 36 ||
        count === 29 ||
        count === 22 ||
        count === 15 ||
        count === 8) {
        checkResult[0].push(document.querySelector(`[data-box="${count}"]`).innerText)
        console.log(checkResult)
        return;
    }
    checkResult[0].push(document.querySelector(`[data-box="${count}"]`).innerText)
    console.log(checkResult)
} */


    /* for (let count = 0; count < 4; count++) {
        let currEle = Number(box.dataset.box) + count
        if (currEle > 42) {
            checkResult[0].push('No box');
            continue;
        }
        checkResult[0].push(document.querySelector(`[data-box="${currEle}"]`).innerText)
    } */


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

    /* let result;
    let isThereFour = 0;

    //check vertical win
    for (let i = 0; i < checkResult[0].length; i++) {
        if (isThereFour === 4) {
            result == true;
            console.log(result)
            break;
        }
        isThereFour = 0;
        for (let j = 1; j < 4; j++) {
            if (checkResult[0][i] === checkResult[0][i + j]) {
                isThereFour++
            }
        }
    } */

    //check for vertical win
    /* let verticalResult = () => {
        return areSame(checkResult[1])
    }
 */
    let horisontalResult = function () {
        /* let result; */
        for (let checkedValue = 0; checkedValue < 7; checkedValue++) {
            if (checkResult[0][checkedValue] == '') {
                continue;
            }
            for (let i = 1; i < 4; i++) {
                if (checkResult[0].indexOf(checkedValue) > -1) {
                    console.log(checkResult[0].indexOf(checkedValue + i))
                    /* result = true; */
                } else {
                    /* console.log(false) */
                    /* result = false; */
                }
            }
        }
        /*  return result; */
    }
    console.log(horisontalResult());
    console.log(checkResult[0].indexOf(1))
    /* if (/* result || */ /* verticalResult) {
        document.querySelector(".result").innerText = currentPlayer + "Wins!"
    } */
}

function areSame(arr) {
    let s = new Set(arr);
    return (s.size == 1);
}

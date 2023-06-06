let blocks = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
let topLeft = document.getElementById('topLeft')
let topRight = document.getElementById('topRight');
let bottomLeft = document.getElementById('bottomLeft');
let bottomRight = document.getElementById('bottomRight');
let levelValue=1000;


function arrayRandomizer(array) {
    for (let i = 0; i < array.length; i++) {
        let randomInt = Math.floor(Math.random() * array.length);
        console.log(randomInt);
        let temp = array[i];
        array[i] = array[randomInt];
        array[randomInt] = temp;
    }
    return array;
}
let sequence = arrayRandomizer(blocks);


console.log(sequence);

let arrIndex = 0;
function blocksLighter(seq) {


    if (arrIndex < seq.length) {

        setTimeout(function () {
            if (seq[arrIndex] == "topLeft") {
                topLeft.style.backgroundColor = "white";
                setTimeout(function () {
                    topLeft.style.backgroundColor = "red";
                }, levelValue);
            }
            else if (seq[arrIndex] == "topRight") {
                topRight.style.backgroundColor = "white";
                setTimeout(function () {
                    topRight.style.backgroundColor = "green";
                }, levelValue);
            }
            else if (seq[arrIndex] == "bottomLeft") {
                bottomLeft.style.backgroundColor = "white";
                setTimeout(function () {
                    bottomLeft.style.backgroundColor = "yellow";
                }, levelValue);
            }
            else if (seq[arrIndex] == "bottomRight") {
                bottomRight.style.backgroundColor = "white";
                setTimeout(function () {
                    bottomRight.style.backgroundColor = "blue";
                }, levelValue);
            }
            arrIndex++;
            blocksLighter(seq);

        }, levelValue)
    }
}
var userInput = [];
blocksLighter(sequence);
function clickFinder(name) {
    userInput.push(name);
    if(userInput.length==4){
        checker(sequence,userInput);
    }
    
}

var display=document.getElementById('displayBox');

var clicks = 0;

function checker(seq, inp) {
    trueCount = 0;
    for (let i = 0; i < seq.length; i++) {
        if (seq[i] != inp[i]) {
            display.innerHTML="You lose";
      
            break;
        }
        else{
            trueCount++;
        
        }
    }
    if (trueCount == 4) {
        display.innerHTML="You win";
    }
}
var resetBtn=document.getElementById('restart');
resetBtn.addEventListener('click',reload);
function reload(){
    location.reload();
}
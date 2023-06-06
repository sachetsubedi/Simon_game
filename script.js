let blocks = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
let topLeft = document.getElementById('topLeft')
let topRight = document.getElementById('topRight');
let bottomLeft = document.getElementById('bottomLeft');
let bottomRight = document.getElementById('bottomRight');

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
                }, 1000);
            }
            else if (seq[arrIndex] == "topRight") {
                topRight.style.backgroundColor = "white";
                setTimeout(function () {
                    topRight.style.backgroundColor = "green";
                }, 1000);
            }
            else if (seq[arrIndex] == "bottomLeft") {
                bottomLeft.style.backgroundColor = "white";
                setTimeout(function () {
                    bottomLeft.style.backgroundColor = "yellow";
                }, 1000);
            }
            else if (seq[arrIndex] == "bottomRight") {
                bottomRight.style.backgroundColor = "white";
                setTimeout(function () {
                    bottomRight.style.backgroundColor = "blue";
                }, 1000);
            }
            arrIndex++;
            blocksLighter(seq);

        }, 1000)
    }
}
blocksLighter(sequence);
function clickFinder(name) {
    console.log(name);

}

var userInput = [];
var clicks = 0;
function inputReader() {

    if (clicks < 4) {
        topLeft.addEventListener('click', function () {
            userInput.push("topLeft");
            clicks++;
        });
        topRight.addEventListener('click', function () {
            userInput.push("topRight");
            clicks++;
        });
        bottomLeft.addEventListener('click', function () {
            userInput.push("bottomLeft");
            clicks++;
        });
        bottomRight.addEventListener('click', function () {
            userInput.push("bottomRight");
            clicks++;
        });
    }
}
inputReader();



function checker(seq,inp){
    trueCount=0;
    for(let i=0;i<seq.length;i++){
        if(seq[i]!=inp[i]){
            return false;
            break;
        }
        else
        trueCount++;
        continue;
    }
    if(trueCount==4){
        return true;
    }
}

setTimeout(function(){
    console.log(checker(sequence,userInput));
},10000);

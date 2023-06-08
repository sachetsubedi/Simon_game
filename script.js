let blocks = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
let topLeft = document.getElementById('topLeft')
let topRight = document.getElementById('topRight');
let bottomLeft = document.getElementById('bottomLeft');
let bottomRight = document.getElementById('bottomRight');
let levelValue=1000;
var resetBtn=document.getElementById('restart');
var blinking=false;
function gamestarter(){
    blinking=true;
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
    let blinks=0;
    let arrIndex = 0;
    function blocksLighter(seq) {
    
    
        if (arrIndex < seq.length) {
    
            setTimeout(function () {
                if (seq[arrIndex] == "topLeft") {
                    topLeft.style.backgroundColor = "white";
                    setTimeout(function () {
                        topLeft.style.backgroundColor = "red";
                    }, levelValue);
                    blinks++;
                }
                else if (seq[arrIndex] == "topRight") {
                    topRight.style.backgroundColor = "white";
                    setTimeout(function () {
                        topRight.style.backgroundColor = "green";
                    }, levelValue);
                    blinks++;
                }
                else if (seq[arrIndex] == "bottomLeft") {
                    bottomLeft.style.backgroundColor = "white";
                    setTimeout(function () {
                        bottomLeft.style.backgroundColor = "yellow";
                    }, levelValue);
                    blinks++;
                }
                else if (seq[arrIndex] == "bottomRight") {
                    bottomRight.style.backgroundColor = "white";
                    setTimeout(function () {
                        bottomRight.style.backgroundColor = "blue";
                    }, levelValue);
                    blinks++;
                }
                arrIndex++;
                if(blinks>3){
                    blinking=false;
                    
                }
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
    
}

gamestarter();

resetBtn.addEventListener('click',function(){
    if(!blinking){
        gamestarter();
    }
})
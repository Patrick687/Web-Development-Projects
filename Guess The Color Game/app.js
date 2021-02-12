var diff = 'easy';
var colors = [];
var colorKey = {red:Number, green:Number, blue:Number};
var colorKeyIndex = 0;
var incorrectGuessCount = 0;
var correctGuessCount = 0;

function onSelectNewColors() {
    
    document.getElementById('user-message').innerHTML="";
    selectNewColors();
}

function guess(id) {
    var index = convertIdToIndex(id);

    if(index == colorKeyIndex)  {//Correct!
        correctGuessCount++;
        document.getElementById('user-message').innerHTML="You are Correct!";
    }
    else {
        incorrectGuessCount++;
        document.getElementById('user-message').innerHTML="You are Incorrect!";
    }
    console.log((correctGuessCount) + "/" + (correctGuessCount+incorrectGuessCount));

    updateScore();

    selectNewColors();
}

function updateScore() {
    var msg = "Score: " + correctGuessCount + "/" + (correctGuessCount+incorrectGuessCount);

    document.getElementById("score-text").innerHTML=msg;
}

function convertIdToIndex(id) {
    switch(id) {
        case 'block1.1':
            return 0;
        case 'block1.2':
            return 1;
        case 'block1.3':
            return 2;
        case 'block1.4':
            return 3;
        case 'block2.1':
            return 4;
        case 'block2.2':
            return 5;
        case 'block2.3':
            return 6;
        case 'block2.4':
            return 7;
    }
}

function selectNewColors() {
    colors = [];
    colorKey = generateKeyRGB();

    document.getElementById('color-text').innerHTML = "RGB(" +colorKey.red + ", " + colorKey.green + ", " + colorKey.blue + ")";

    
    for(i=0; i<7; i++) {
        var color = generateRGBValue();
        colors.push(color);
    }

    colorKeyIndex = Math.floor(Math.random()*8);
    colors.splice(colorKeyIndex, 0, colorKey);

    fillHTMLBlocks();
}

function fillHTMLBlocks() {
    let rgbStrings = [];

    for(i=0; i<colors.length; i++) {
    rgbStrings.push("background-color:rgb(" + colors[i].red + ", " + colors[i].green + ", " +colors[i].blue);
    }

    document.getElementById('block1.1').setAttribute('style', rgbStrings[0]);
    document.getElementById('block1.2').setAttribute('style', rgbStrings[1]);
    document.getElementById('block1.3').setAttribute('style', rgbStrings[2]);
    document.getElementById('block1.4').setAttribute('style', rgbStrings[3]);
    document.getElementById('block2.1').setAttribute('style', rgbStrings[4]);
    document.getElementById('block2.2').setAttribute('style', rgbStrings[5]);
    document.getElementById('block2.3').setAttribute('style', rgbStrings[6]);
    document.getElementById('block2.4').setAttribute('style', rgbStrings[7]);

}

function generateKeyRGB() {
    var redValue = Math.floor(Math.random()*256);
    var greenValue = Math.floor(Math.random()*256);
    var blueValue = Math.floor(Math.random()*256);

    return {red: redValue, green: greenValue, blue: blueValue};
}

function generateRGBValue() {
    var redOffset, greenOffset, blueOffSet;
    var min, max;

    if(diff=='easy') {
        min = 100;
        max = 250;
    } else {    
        min = 0;
        max = 25;
    }

    redOffset =  getRandomInt(100,250);
    greenOffset = getRandomInt(100,250);
    blueOffSet = getRandomInt(100,250);

    return {red:((redOffset+colorKey.red)%255), green:((greenOffset+colorKey.green)%255), blue:((blueOffSet+colorKey.blue)%255)};
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function selectEasyDifficulty() {
    diff = 'easy';
    document.getElementById("easy-button").setAttribute("class", "active btn btn-outline-dark navbar-btn px-3 mx-1");
    document.getElementById("hard-button").setAttribute("class", "btn btn-outline-dark navbar-btn px-3 mx-1");
}

function selectHardDifficulty() {
    diff = 'hard';
    document.getElementById("hard-button").setAttribute("class", "active btn btn-outline-dark navbar-btn px-3 mx-1");
    document.getElementById("easy-button").setAttribute("class", "btn btn-outline-dark navbar-btn px-3 mx-1");
}
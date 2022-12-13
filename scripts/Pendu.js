var words = ["Quadriceps", "frit", "chat", "giraffe", "gorilla", "Apocalypse", "serpent", "Jus", "Klaxonner", "lion", "mouse", "gazelle", "Oiseau", "Lynx", "Tomate", "Aquarium", "Ascenseur", "flamingo", "Gothique", "Ananas"]; // List of words
var buttons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 26 elements
var mistakes = 6; 
var score = 0; 
var failed = 0; 
var tries = []; 
var mystery;
var randNum;
var chosenWord;
var wordStatus = null;

function handleGuess(str) {
    tries.indexOf(str) === -1 ? tries.push(str) : null;
    document.getElementById("display2").value += str + " ";
    var button = document.getElementById(str);
    button.style.backgroundColor = "grey";
    button.disabled = true;
    
    if (chosenWord.indexOf(str) >= 0) {
        updateScore();
        guessedWord();
        checkIfGameWon();
      } else {
        failed++;
        updateMistakes();
        checkIfGameLost();
    }
}

function generateWord() { // Function pour generer le mot random
    randNum = Math.floor(Math.random() * words.length);
    chosenWord = words[randNum].toUpperCase();
}

function Start() { // Start button function.
    generateWord();
    defaultImg();
    resetCanvas();
    mystery = chosenWord.replace(/[A-Z]/g, '_ ');
    console.log(chosenWord)
    tries = [];
    failed = 0;
    for(let i = 0; i < buttons.length; i++) {
        document.getElementById(buttons[i]).disabled = false;
        var kb = document.getElementById(buttons[i]);
        kb.style.backgroundColor = "red";
    }
    document.getElementById("display1").value = mystery;
    document.getElementById("display2").value = "";
    document.getElementById("score").value = score;
    document.getElementById("fails").value = failed;
    if(chosenWord.length >= 10) {
        showHint();
    }
}

function showHint() {
    var randNum = Math.floor(Math.random() * chosenWord.length);
    var randLetter = chosenWord[randNum];
    handleHint(randLetter);
}

function handleHint(str) {
    tries.push(str);
    var button = document.getElementById(str);
    button.style.backgroundColor = "grey";
    button.disabled = true;
    guessedWord()
}

function defaultImg() {
    var canvas = document.querySelector("canvas");
    canvas.setAttribute("style", "display: none;");
    var image = document.querySelector("img");
    image.setAttribute("style", "display: block;")
}

function replaceImg() {
    var image = document.querySelector("img");
    image.setAttribute("style", "display: none;")
    var can = document.querySelector("canvas");
    can.setAttribute("style", "display: block;")
}

function guessedWord() {
    wordStatus = chosenWord.split('').map(letter => (tries.indexOf(letter) >= 0 ? letter.toLowerCase() : "_ ")).join('');
    document.getElementById('display1').value = wordStatus;
}

function updateMistakes() {
    replaceImg();
    loadCanvasOnError();
    document.getElementById("score").value = score;
    document.getElementById('fails').value = failed;
}

function updateScore() {
    document.getElementById("score").value = score;
}

function checkIfGameWon() {
    if (wordStatus === chosenWord.toLowerCase()) {
        score++;
        for(let i = 0; i < buttons.length; i++) {
            document.getElementById(buttons[i]).disabled = true;
            var kb = document.getElementById(buttons[i]);
            kb.style.backgroundColor = "red";
        }
        updateScore();
        document.getElementById("display2").value = "Tu as gagne!";
    }
}

function checkIfGameLost() {
    if (failed === mistakes) {
        if(score <= 0)
        {
            score = 0;
        }
        else{
            score--;
        }
        
        for(let i = 0; i < buttons.length; i++) {
            document.getElementById(buttons[i]).disabled = true;
            var kb = document.getElementById(buttons[i]);
            kb.style.backgroundColor = "red";
        }
        updateScore();
        document.getElementById('display1').value = chosenWord.toLowerCase();
        document.getElementById("display2").value = "Game over, tu as perdu!";
    }
}

function resetCanvas() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function loadCanvasOnError () {
    var hangman = document.querySelector("canvas");
    var h = hangman.getContext('2d');
    var img1 = document.getElementById("Image1");
    var img2 = document.getElementById("Image2");
    var img3 = document.getElementById("Image3");
    var img4 = document.getElementById("Image4");
    var img5 = document.getElementById("Image5");
    var img6 = document.getElementById("Image6");
   

    switch (failed) {
        case 1:
           h.drawImage(img1,0,0,350,150);
            break;
        case 2:
            h.drawImage(img2,0,0,350,150);
            break;
        case 3:
            h.drawImage(img3,0,0,350,150);
            break;
        case 4:
            h.drawImage(img4,0,0,350,150);
            break;
        case 5:
            h.drawImage(img5,0,0,350,150);
            break;
        case 6:
            h.drawImage(img6,0,0,350,150);

    }
}
function setPlayerName () {
    var playerNameDiv = document.getElementById('playerName');
    
    playerNameDiv.innerHTML = document.getElementById('playerNameInput').value;
    
    // hide input field and button
    document.getElementById('divSetPlayerName').style.display = 'none';
  }

function close_window() {
    if (confirm("Close Window?")) {
      close();
    }
  }
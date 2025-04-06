const input = document.querySelector('#inputField'), // input field for letter submission
button = document.querySelector('#submitButton'), // button to submit the letter
enter = document.querySelector('.enter'), // div to display the input field and button
stickCount = document.querySelector('#stickCount'), // div to display the number of mistakes left
saidLetters = document.querySelector('#saidLetters'), // div to display the letters already guessed
wordToFind = document.querySelector('#wordToFind'), // div to display the dots of the word to find
replayButton = document.querySelector('#replayButton'), // button to restart the game
logContainer = document.querySelector('#logContainer'), // div to display messages for the player
hangmanDrawing = document.querySelector('#hangmanDrawing'), // div to display the hangman drawing
hangmanStages = [
    "",
    "       \n       \n       \n     ===",
    "      |\n      |\n      |\n     ===",
    "  +---+\n      |\n      |\n      |\n     ===",
    "  +---+\n  O   |\n      |\n      |\n     ===",
    "  +---+\n  O   |\n  |   |\n      |\n     ===",
    "  +---+\n  O   |\n /|   |\n      |\n     ===",
    "  +---+\n  O   |\n /|\\  |\n      |\n     ===",
    "  +---+\n  O   |\n /|\\  |\n /    |\n     ===",
    "  +---+\n  O   |\n /|\\  |\n / \\  |\n     ==="
], // array to store the hangman stages
backupWords = {
    en: ["rhythms", "dermatoglyphics", "uncopyrightable", "zygote", "supercalifragilisticexpialidocious"],
    fr: ["rhythmes", "anticonstitutionnellement", "inintelligibilité", "déchiffrable", "quincaillerie"]
}; // array to store the backup words in case of API failure

hangmanDrawing.innerText = hangmanStages[0]; // initial hangman drawing

const languageTexts = {
    en: {
        "gameTitle": "Hangman",
        "findWord": "Find the word",
        "enterLetter": "Enter a letter:",
        "invalidInput": "Invalid input: Please enter a single letter",
        "alreadyGuessed": "Already guessed",
        "saidLetters": "Already said letters: ",
        "correctLetter": "The letter is correct",
        "wrongLetter": "The letter isn't in the word",
        "mistakesLeft": "Mistakes left: ",
        "theWord": "The word was: ",
        "youWon": "You won!",
        "youLost": "You lost!",
        "replay": "Replay",
        "inputPlaceholder": "Type a letter",
        "buttonText": "Submit"
    },
    fr: {
        "gameTitle": "Pendu",
        "findWord": "Trouve le mot",
        "enterLetter": "Entrez une lettre :",
        "invalidInput": "Entrée invalide : veuillez entrer une seule lettre",
        "alreadyGuessed": "Déjà deviné",
        "saidLetters": "Lettres déjà proposées : ",
        "correctLetter": "La lettre est correcte",
        "wrongLetter": "La lettre n'est pas dans le mot",
        "mistakesLeft": "Erreurs restantes : ",
        "theWord": "Le mot était : ",
        "youWon": "Tu as gagné !",
        "youLost": "Tu as perdu !",
        "replay": "Rejouer",
        "inputPlaceholder": "Tapez une lettre",
        "buttonText": "Soumettre"
    }
};


let stockedValue = "", // variable to store the letter submitted by the player
stickNumber = 0, // variable to count the number of mistakes made by the player
tabToFind = [], // array to store the spans for the letters of the word to find
inputValues = [], // array to store the letters already guessed by the player
mistakesAllowed = 9, // variable to set the number of mistakes allowed
currentLanguage = "en"; // variable to store the current language

// Update all text content based on selected language
function changeLanguage(language) {
    currentLanguage = language;
    document.querySelector("#gameTitle").textContent = languageTexts[language].gameTitle;
    document.querySelector("#findWord").textContent = languageTexts[language].findWord;
    document.querySelector("#enterLetter").textContent = languageTexts[language].enterLetter;
    document.querySelector("#replayButton").textContent = languageTexts[language].replay;
    document.querySelector("#inputField").setAttribute("placeholder", languageTexts[language].inputPlaceholder);
    document.querySelector("#submitButton").textContent = languageTexts[language].buttonText;
    
    restartGame();
}


// function to fetch a random word from the API
async function getWord(currentLanguage) {
    let apiUrl = "";
    if (currentLanguage === "fr") {
        apiUrl = "https://trouve-mot.fr/api/random";
    } 
    else{
        apiUrl = "https://random-word-api.vercel.app/api?words=1";
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (currentLanguage === "fr"){
            if (!data[0].name || typeof data[0].name !== "string") {
                throw new Error("Invalid response format from API (FR)");
            }
            return data[0].name.toLowerCase();
        } 
        else{
            if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== "string") {
                throw new Error("Invalid response format from API (EN)");
            }
            return data[0].toLowerCase();
        }
    } 
    catch (error) {
        console.error("Erreur :", error);
        return getBackupWord(currentLanguage);
    }
}

// function to get a backup word in case of API failure
function getBackupWord(language) {
    const words = backupWords[language] || backupWords.en;
    return words[Math.floor(Math.random() * words.length)];
}
  
// setting up the word to find
getWord(currentLanguage).then(generateWord => {
    nbLetters = generateWord.length;
    tab = generateWord.split("");
    word = generateWord;

    for (let i = 0; i < nbLetters; i++) {
        let span = document.createElement("span");
        span.textContent = "_ ";
        wordToFind.append(span);
        tabToFind.push(span);
    }
});

// function to log messages for the player (e.g., already guessed letters, game status)
function logMessage(message,time=null) {
    if (!logContainer) {
        logContainer = document.createElement("div");
        logContainer.id = "logContainer";
        document.body.appendChild(logContainer);
    }

    const newLog = document.createElement("p");
    newLog.textContent = message;
    newLog.classList.add("logMessage");
    logContainer.appendChild(newLog);

    if (time===null){
        setTimeout(() => {
        newLog.remove()
    }, "1500");
    }
}

// function to check if the letter has already been guessed or update the list of guessed letters
function saidValues(stockedValue){
    if (inputValues.includes(stockedValue)){
        logMessage(languageTexts[currentLanguage].alreadyGuessed,null)
        input.value = "";
        return true
    }
    else{
        saidLetters.innerText = "";
        inputValues.push(stockedValue);
        saidLetters.innerText=languageTexts[currentLanguage].saidLetters+inputValues;
    }
}

// function to check is the submission of a letter is valid and change the letter if it is correct or add a stick if it is not
function sendValue() {
    stockedValue = input.value.trim().toLowerCase();
    if (!stockedValue || stockedValue.length !== 1 || !/^[a-z]$/.test(stockedValue)){
        logMessage(languageTexts[currentLanguage].invalidInput,null);
        input.value = "";
        return;
    }
    if (saidValues(stockedValue)){
        return;
    }
    let isCorrect = verifyLetter(stockedValue);
    if (isCorrect) {
        logMessage(languageTexts[currentLanguage].correctLetter, null);
    } else {
        addStick();
        logMessage(languageTexts[currentLanguage].wrongLetter, null);
    }
    input.value = "";
}

// function to check if the letter is in the word and update the display
function verifyLetter(letter){
    let found = false;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i]==letter){
            tabToFind[i].textContent = letter;
            found = true
        }
    }
    if (found){
        youWon();
    }
   return found
}

// function to add a stick to the hangman drawing and check if the player has lost
function addStick(){
    stickCount.innerText = "";
    stickNumber+=1;
    let nbErrors = mistakesAllowed-stickNumber;
    stickCount.innerText=languageTexts[currentLanguage].mistakesLeft+nbErrors;
    hangmanDrawing.innerText = hangmanStages[stickNumber] || hangmanStages[hangmanStages.length - 1];
    if (stickNumber >= mistakesAllowed){
        youLost()
    }
}

// function to change the display when the player has won
function youWon(){
    if (!tabToFind.some(span => span.textContent.trim() === "_")){
        logMessage(languageTexts[currentLanguage].youWon,"stay")
        if(currentLanguage==="en"){logMessage("With only "+stickNumber+" mistakes","stay")}
        else{
            logMessage("Avec seulement "+stickNumber+" erreurs","stay")
        }
        wordToFind.innerText =languageTexts[currentLanguage].theWord +word;
        hangmanDrawing.style.display = "none";
        enter.style.display="none";
        saidLetters.style.display="none";
        stickCount.style.display="none";
        replayButton.style.display = "block";
        return true
    }
}

// function to change the display when the player has lost
function youLost(){
    wordToFind.innerText = languageTexts[currentLanguage].theWord +word;
    logMessage(languageTexts[currentLanguage].youLost,"stay")
    enter.style.display="none";
    saidLetters.style.display="none";
    stickCount.style.display="none";
    replayButton.style.display = "block";
}

// function to restart the game once the game is over
function restartGame(){
    tab = [];
    nbLetters = 0;
    stickNumber = 0;
    tabToFind = [];
    inputValues = [];
    
    stickCount.innerText = `${languageTexts[currentLanguage].mistakesLeft} ${mistakesAllowed}`;
    saidLetters.innerText = languageTexts[currentLanguage].saidLetters;
    enter.style.display = "block";
    saidLetters.style.display = "block";
    wordToFind.innerHTML = "";
    hangmanDrawing.innerText = hangmanStages[0];

    getWord(currentLanguage).then(generateWord => {
        nbLetters = generateWord.length;
        tab = generateWord.split("");
        word = generateWord;
        for (let i = 0; i < nbLetters; i++) {
            let span = document.createElement("span");
            span.textContent = "_ ";
            wordToFind.append(span);
            tabToFind.push(span);
        }
    });
    replayButton.style.display = "none";
    if (logContainer) logContainer.innerHTML = "";   
}

// Event listeners for the input field and buttons
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendValue();
    }
});

replayButton.addEventListener("click", restartGame)

button.addEventListener("click", sendValue);

document.querySelector("#language-en").addEventListener("click", () => {
    currentLanguage = "en";
    changeLanguage("en");
});

document.querySelector("#language-fr").addEventListener("click", () => {
    currentLanguage = "fr";
    changeLanguage("fr");
});

changeLanguage("en");
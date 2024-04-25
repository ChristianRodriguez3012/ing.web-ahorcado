const words = ["manzana", "banana", "naranja", "pera", "uva"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let wordDisplay = selectedWord.split("").map(() => "_").join(" ");
let lives = 6;

const wordContainer = document.getElementById("word-container");
const keyboardContainer = document.getElementById("keyboard-container");
const hangmanContainer = document.getElementById("hangman-container");
const hangmanImage = document.getElementById("hangman-image"); // Get the hangman image element
const messagesContainer = document.getElementById("messages");

// Function to update the hangman image
function updateHangmanImage() {
    const imageSrc = `./src/p${7 - lives}.png`; // Relative path
    console.log("Image path:", imageSrc);
    hangmanImage.src = imageSrc;
}

// Function to show the word
function updateWordDisplay() {
  wordDisplay = selectedWord.split("").map((letter, index) => {
    if (guessedLetters.includes(letter)) {
      return letter;
    } else {
      return "_";
    }
  }).join(" ");
  wordContainer.textContent = wordDisplay;
}

// Function to handle key clicks
function handleKeyClick(letter) {
  if (guessedLetters.includes(letter)) {
    alert("¡Ya has adivinado esa letra!");
    return;
  }

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    updateWordDisplay();

    if (wordDisplay.replace(/_/g, "").replace(/ /g, "") === selectedWord) {
      showMessage("¡Felicidades! Has adivinado la palabra.");
      disableKeyboard();
    }
}
  
  else {
    lives--;
    updateHangmanImage(); // Update the hangman image
    showMessage("¡Fallaste! Tienes " + lives + " vidas restantes."); // Update the message with remaining lives

    if (lives === 0) {
      showMessage("¡Has perdido! La palabra era: " + selectedWord);
      disableKeyboard();
    }
  }
}

// Function to show messages
function showMessage(message) {
  messagesContainer.textContent = message;
}

// Function to disable the keyboard
function disableKeyboard() {
  const buttons = keyboardContainer.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

// Function to start the game
function startGame() {
  wordDisplay = selectedWord.split("").map(() => "_").join(" ");
  guessedLetters = [];
  lives = 6;

  updateWordDisplay();
  updateHangmanImage(); // Show the initial hangman image
  showMessage("¡Adivina la palabra! Tienes " + lives + " vidas restantes.");

  // Create keyboard buttons
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleKeyClick(letter));
    keyboardContainer.appendChild(button);
  });
}

// Start the game when the page loads
startGame();
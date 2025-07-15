/* ========================================
   GUESS THE NUMBER GAME LOGIC
   This file makes our game work and be fun!
   ======================================== */

// These are like secret boxes that store important information for our game
let secretNumber;    // This box holds the number the player needs to guess
let attempts;        // This box counts how many times the player has tried

/* 
   This function starts a new game!
   It's like pressing the "reset" button on a board game
*/
function startGame() {
    // Pick a random number between 1 and 20 (like rolling a special 20-sided die)
    secretNumber = Math.floor(Math.random() * 20) + 1;
    
    // Reset the attempt counter to 0 (start counting from the beginning)
    attempts = 0;
    
    // Clear any old messages from the screen
    document.getElementById('game-message').textContent = "";
    
    // Clear the input box and let the player type again
    document.getElementById('guess-input').value = '';
    document.getElementById('guess-input').disabled = false;
    document.getElementById('guess-btn').disabled = false;
    
    // Hide the restart button until the game is over
    document.getElementById('reset-game').style.display = 'none';
}

/* 
   This function checks the player's guess!
   It's like a referee that decides if the guess is right or wrong
*/
function guessNumber() {
    // Get the number the player typed and turn it into a real number
    const guess = Number(document.getElementById('guess-input').value);
    
    // Check if the player typed a valid number (between 1 and 20)
    if (!guess || guess < 1 || guess > 20) {
        document.getElementById('game-message').textContent = "Enter a number between 1 and 20.";
        return;  // Stop here if the number is not valid
    }

    // Count this as one more attempt
    attempts++;
    
    // Check if the player guessed correctly!
    if (guess === secretNumber) {
        // The player won! Show a celebration message
        document.getElementById('game-message').textContent = `Great job! You guessed it in ${attempts} tr${attempts > 1 ? 'ies' : 'y'}!`;
        
        // Disable the input and button so the game is over
        document.getElementById('guess-input').disabled = true;
        document.getElementById('guess-btn').disabled = true;
        
        // Show the restart button so they can play again
        document.getElementById('reset-game').style.display = 'inline-block';
    } 
    // If the guess is too low, give a helpful hint
    else if (guess < secretNumber) {
        document.getElementById('game-message').textContent = "Too low! Try a bigger number.";
    } 
    // If the guess is too high, give a helpful hint
    else {
        document.getElementById('game-message').textContent = "Too high! Try a smaller number.";
    }
}

/* 
   This section sets up all the buttons and controls when the page loads
   It's like setting up all the pieces on a board game before you start playing
*/
window.addEventListener('DOMContentLoaded', () => {
    // Start the game as soon as the page loads
    startGame();
    
    // Make the "Try!" button work when clicked
    document.getElementById('guess-btn').onclick = guessNumber;
    
    // Make the Enter key work like clicking the "Try!" button
    document.getElementById('guess-input').onkeydown = function(e) {
        if (e.key === 'Enter') guessNumber();
    }
    
    // Make the "Restart" button start a new game when clicked
    document.getElementById('reset-game').onclick = startGame;
});

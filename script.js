var my_choice = null;
var current_mode = "infinite";
var current_attempt = 0;

const possibleActions = ["Rock", "Paper", "Scissor"];
const actionRelation = {
    "Rock" : "Scissor",
    "Paper" : "Rock",
    "Scissor" : "Paper"
};

const actionButtons = document.querySelectorAll(".action_button");
const playerActionDisplay = document.getElementById("player_action");
const comActionDisplay = document.getElementById("com_action");
const resultDisplay = document.getElementById("turn_result");
const playerScoreDisplay = document.getElementById("player_score");
const comScoreDisplay = document.getElementById("com_score");
const modeForm = document.getElementById("mode_form");
const modeDisplay = document.getElementById("mode_display");
const attemptDisplay = document.getElementById("attempt_display");

attemptDisplay.innerHTML = current_attempt;

function action_to_emoji (action) {
    switch (action) {
        case "Rock":
            return "✊";
        case "Paper":
            return "✋";
        case "Scissor":
            return "✌️";
        default:
            return "❌"
    }
}

function reset_game() {
    playerScoreDisplay.innerHTML = 0;
    comScoreDisplay.innerHTML = 0;
    current_attempt = 0;
    attemptDisplay.innerHTML = current_attempt;
}

function apply_mode() {
    const modeDropDown = document.getElementById("mode");
    current_mode = modeDropDown.value;
    modeDisplay.innerHTML = current_mode;
}

modeForm.addEventListener("submit", (event) => {
    event.preventDefault(); 
    apply_mode();
    reset_game();
    alert("Menu has been changed!");
});

actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        current_attempt++;
        attemptDisplay.innerHTML = current_attempt;
        player_action = button.innerHTML;
        playerActionDisplay.innerHTML = action_to_emoji(player_action);
        // console.log(`Chosen action: ${player_action}`);
        
        action_index = Math.floor(Math.random() * 3);
        computer_action = possibleActions[action_index];

        comActionDisplay.innerHTML = action_to_emoji(computer_action);
        // console.log(`Computer action: ${computer_action}`);
        let player_score = parseInt(playerScoreDisplay.innerHTML);
        let com_score = parseInt(comScoreDisplay.innerHTML);

        if (player_action === computer_action) {
            resultDisplay.innerHTML = "Tie!";
        } else if (actionRelation[player_action] === computer_action) {
            resultDisplay.innerHTML = "You Win!";
            playerScoreDisplay.innerHTML = ++player_score;
            if (current_mode === "zero_sum_3" ||
                current_mode === "zero_sum_5" ||
                current_mode === "zero_sum_inf"
            ) {
                comScoreDisplay.innerHTML = --com_score;
            }
        } else {
            resultDisplay.innerHTML = "You Lose!";
            comScoreDisplay.innerHTML = ++com_score;
            if (current_mode === "zero_sum_3" ||
                current_mode === "zero_sum_5" ||
                current_mode === "zero_sum_inf"
            ) {
                playerScoreDisplay.innerHTML = --player_score;
            }
        }

        switch (current_mode) {
            case "infinite":
            case "zero_sum_inf":
                break;
            
            case "first_to_3":
                if (player_score >= 3) {
                    alert("You win");
                    reset_game();
                } else if (com_score >= 3) {
                    alert("You lose");
                    reset_game();
                }
                break;
            
            case "first_to_5":
                if (player_score >= 5) {
                    alert("You win");
                    reset_game();
                } else if (com_score >= 5) {
                    alert("You lose");
                    reset_game();
                }
                break;
            
            case "zero_sum_3":
                if (com_score <= -3) {
                    alert("You win");
                    reset_game();
                } else if (player_score <= -3) {
                    alert("You lose");
                    reset_game();
                }
                break;
            
            case "zero_sum_5":
                if (com_score <= -5) {
                    alert("You win");
                    reset_game();
                } else if (player_score <= -5) {
                    alert("You lose");
                    reset_game();
                }
                break;

            default:
                break
        }
    });
});

apply_mode();
var level = 0;
var gameStarted = false;
var gamePattern = [];
var userClickedPattern = [];
$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log("user chosen pattern" + userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    // console.log(userClickedPattern[index]);

    checkAnswer(userClickedPattern, gamePattern, level);


    // console.log(level);
})


function nextSequence() {


    randomNumber = Math.floor(Math.random() * 4);
    var buttonColors = ["red", "blue", "green", "yellow"];
    var randomChosenColor = buttonColors[randomNumber];
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    level++;
    console.log(gamePattern);


    $("h1").text("Level " + level);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 100);

}

$(document).on("keypress", function () {
    if (gameStarted === false) {
        nextSequence();
        gameStarted = true;
    }

})

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameStarted = false;
}


function checkAnswer(userClickedPattern, gamePattern, level) {

    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            console.log("failed");
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over")
            setTimeout(function () {
                $("body").removeClass("game-over")
            }, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();

        }
    }
    console.log("success");

    // If the loop completes without finding any mismatches, it means the user got the sequence right
    if (userClickedPattern.length === level) {
        setTimeout(function () {
            userClickedPattern.length = 0;
            nextSequence();

            // Move to the next level if user completes the sequence
        }, 1000);

    }
}

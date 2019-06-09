var images;
var imageArray = [];
var firstCard = 0;
var secondCard = 0;
var cardsPicked = 0;
var incorrectGuesses = 0;
var correctGuesses;
var totalGuesses = 0;
var cardClicked;
var clicks = 0;
var winnerModal = document.getElementById("congratulationsWrapper");



function confirmNumberOfCards() {
    level = document.getElementsByClassName("levelChoice");
    for (var j = 0; j < level.length; j++) {
        levelPicked = level[j];
        levelPicked.addEventListener("click", function (e) {
            images = e.target.id;
            correctGuesses = images;

            document.getElementById("memoryGame").style.display = "block";
            document.getElementById("openingBlock").style.display = "none";
            document.getElementById("openingPage").style.display = "none";
            createArray(images);

            //ADJUST AMOUNT OF CARDS SHOWN TO USER
            if (images == 6) {
                document.getElementById("beginner").style.display = "flex";
                document.getElementById("intermediate").style.display = "none";
                document.getElementById("pro").style.display = "none";
            }
            if (images == 9) {
                document.getElementById("intermediate").style.display = "flex";
                document.getElementById("pro").style.display = "none";
            }
            else if (images == 12) {
                document.getElementById("pro").style.display = "flex";
            }

        });

    }
}

function createArray(images) {
    for (var i = 0; i < images; i++) {
        imageArray.push("./images/" + "hero" + i + ".png");
        imageArray.push("./images/" + "hero" + i + ".png");
    }
    shuffleArray(imageArray);
}

//RANDOMIZING CREATED ARRAY EVERY TIME THE ARRAY IS CREATED
function shuffleArray(imageArray) {
    imageArray.sort(() => Math.random() - 0.5);
}

function playGame() {
    //CARD IS CLICKED - GAME BEGINS
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
        cardClicked = cards[i];
        cardClicked.addEventListener("click", function (e) {
            var indexOfPic = e.target.id;
            e.target.style.backgroundImage = "url(" + imageArray[indexOfPic] + ")";
            e.target.style.backgroundColor = "rgba(255,255,255, 0.4)";

            if (cardsPicked == 0) {
                firstCard = e.target;
                cardsPicked = 1;
            }
            else if (cardsPicked != 0) {
                secondCard = e.target;

                //CHECK FOR A MATCH:

                //MATCH:
                if (firstCard.style.backgroundImage == secondCard.style.backgroundImage) {
                    correctGuesses--
                    totalGuesses++
                    cardsPicked = 0;
                    coolAnimation();

                    if (correctGuesses == 0) {
                        winnerAnimation();
                    }
                    updateScores();

                //NO MATCH:
                } else if (firstCard.style.backgroundImage != secondCard.style.backgroundImage) {
                    incorrectGuesses++
                    totalGuesses++
                    updateScores();
                    setTimeout(function () {
                        firstCard.style.backgroundImage = "none";
                        secondCard.style.backgroundImage = "none";
                        firstCard.style.backgroundColor = "";
                        secondCard.style.backgroundColor = "";
                    }, 1000)
                    cardsPicked = 0;
                }
            }

        });
    }
}

//PLAYER GETS TO SEE HIS SCORE ON THE GAME PAGE
function updateScores() {
    document.getElementById("score").innerHTML = "Incorrect guesses: " + incorrectGuesses;
}

//MODAL TO CONGRATULATE THE WINNER
function winnerAnimation() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("incorrectGuesses").innerHTML = "Incorrect guesses: " + incorrectGuesses;
    document.getElementById("navHeader").style.visibility = "hidden";
}

//COOL ANIMATION
function coolAnimation() {
    setTimeout(function () {
        firstCard.style.border = "5px solid white";
        secondCard.style.border = "5px solid white";
    }, 500)
}


confirmNumberOfCards();
playGame();

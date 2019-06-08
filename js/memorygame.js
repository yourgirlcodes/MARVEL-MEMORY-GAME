//CREATING AN ARRAY OF IMAGES (AMOUNT DEPENDS ON LEVEL)
var images;
var imageArray = [];
var firstCard = 0;
var secondCard = 0;
var cardsPicked = 0;
var wait_to_flip = false;
var incorrectGuesses = 0;
var correctGuesses;
var totalGuesses = 0;
var cardClicked;
var clicks = 0;
var youWon = false;
var winnerModal = document.getElementById("congratulationsWrapper");



//CONFIRM AMOUNT OF IMAGES NEEDED ACCORDING TO LEVEL CHOSEN BY PLAYER
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

//CREATING AN ARRAY OF IMAGES (AMOUNT DETERMINED ABOVE)
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
            e.target.style.backgroundColor = "rgba(255,255,255, 0.2)";

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

                    if (correctGuesses == 0) {
                        youWon = true;
                        winnerAnimation();
                    }
                    updateScores();

                    //NO MATCH:
                } else if (firstCard.style.backgroundImage != secondCard.style.backgroundImage) {
                    incorrectGuesses++
                    totalGuesses++
                    updateScores();
                    wait_to_flip = true;
                    youWon = false;
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

//UPDATING CORRECT AND INCORRECT SCORES
function updateScores() {
    document.getElementById("score").innerHTML = "Incorrect guesses: " + incorrectGuesses;
}

//MODAL TO CONGRATULATE THE WINNER
function winnerAnimation() {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("incorrectGuesses").innerHTML = "Incorrect guesses: " + incorrectGuesses;
    document.getElementById("navHeader").style.visibility = "hidden";
}


confirmNumberOfCards();
playGame();









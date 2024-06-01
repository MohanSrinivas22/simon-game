var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = new Array();
var userClickedPattern = new Array();

function playAudio(color){
  var audio = new Audio("./sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver(){
  level = 0;
  gamePattern = [];
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else {
    playAudio("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence(){

  if(++level > 0){
    $("#level-title").text("Level - " + level);
  }
  
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
 
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColour);  

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  animatePress(userChosenColour);
  playAudio(userChosenColour);

  checkAnswer(userClickedPattern.length);
});


$(document).keydown(function(event){
  if(level === 0) nextSequence();
});


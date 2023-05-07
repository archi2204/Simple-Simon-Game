var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern=[];

var started = false;
var level = 0;


$(document).on("keypress",function (e) { 
    if(!started){
        
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        //console.log("Fail");
        playSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game OVER!!\n Press any Key To Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}





'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
    $(".dont-know").hide();
    console.log('gQuestsTree: ', gQuestsTree);
    console.log('gCurrQuest: ', gCurrQuest);
}

function onStartGuessing() {
    // hide the game-start section
    $(".game-start").hide();
    renderQuest();
    // show the quest section
    $('.quest').show();
}

function renderQuest() {
    // select the <h2> inside quest and update its text by the currQuest text 
    $(".quest h2").text(gCurrQuest.txt);
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            // alert('I dont know...teach me!')
            $(".dont-know").show();
            // TODO: hide and show new-quest section
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes=res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    $(".dont-know").hide();
    // TODO: Get the inputs' values
     var $elNewGuess = $("input#newGuess").val();
     var $elNewQuest = $("input#newQuest").val();
    
    // TODO: Call the service addGuess
    addGuess($elNewQuest,$elNewGuess, gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;

}


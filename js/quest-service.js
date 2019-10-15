var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const QUEST_TREE_KEY='tree';

function createQuestsTree() {
    gQuestsTree=loadQuestsTreeFromStorage();
    if(!gQuestsTree){
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');

    }
    gCurrQuest = gQuestsTree; 

    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest=gCurrQuest;
    if(res ==='yes') gCurrQuest=gCurrQuest.yes;
    else gCurrQuest=gCurrQuest.no;
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree
    var newNode=createQuest(newQuestTxt);
    newNode.yes=createQuest(newGuessTxt);
    gPrevQuest.yes=newNode;
    newNode.no=gCurrQuest;
    gCurrQuest=gPrevQuest;
    saveQuestsTreeToStorage();
}


function saveQuestsTreeToStorage(){
    saveToStorage(QUEST_TREE_KEY, gQuestsTree);
}

function loadQuestsTreeFromStorage(){
    return loadFromStorage(QUEST_TREE_KEY);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var value = JSON.parse(str)
    return value;
}
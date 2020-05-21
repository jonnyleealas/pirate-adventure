'use strict';


var imageName;
var userName;

// end of game page
var loadSaveButton = document.getElementById('sec4');
if (loadSaveButton !== null) {
  loadSaveButton.addEventListener('click', loadSaved);
}

function loadSaved() {
  if (localStorage.getItem('character') !== null) {
    var saveTrigger = true;
    var stringiedSaveTrigger = JSON.stringify(saveTrigger);
    localStorage.setItem('saveTrigger', stringiedSaveTrigger);
    window.location.href = 'game.html';
  }
}


// var localStorageCharacter = localStorage.getItem('character');
//   var parsedCharacter = JSON.parse(localStorageCharacter);
//   console.log(`getting character out of loacl storage: ${parsedCharacter}`);

//   new Character(parsedCharacter.username, parsedCharacter.fightingAbility, parsedCharacter.pirateSpirit, parsedCharacter.intelligence, parsedCharacter.rum, parsedCharacter.money);

//   var localStorageCardIndex = localStorage.getItem('cardIndex');
//   var parsedCardIndex = JSON.parse(localStorageCardIndex);
//   console.log(`getting card index out of local storage${parsedCardIndex}`);

//   cardStackArray[parsedCardIndex].appendElement(choiceElement, 'p');
// }


function getUserName(event) {
  event.preventDefault();
  userName = document.getElementById('userName').value;
  console.log(userName);
  var stringifiedUserName = JSON.stringify(userName);
  localStorage.setItem('userName', stringifiedUserName);
  characterImage();
}

function characterImage() {
  if (document.getElementById('fighter').checked) {
    imageName = 'fighter';
    console.log(imageName);
  }
  if (document.getElementById('funGuy').checked) {
    imageName = 'funGuy';
    console.log(imageName);
  }
  if (document.getElementById('smartGuy').checked) {
    imageName = 'smartGuy';
    console.log(imageName);
  }
  var stringifiedImageName = JSON.stringify(imageName);
  localStorage.setItem('imageName', stringifiedImageName);
  startGame();
}
function startGame() {
  window.location.href = 'game.html';
}

var loginForm = document.getElementById('form');
if (loginForm !== null) {
  loginForm.addEventListener('submit', getUserName);
}





/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
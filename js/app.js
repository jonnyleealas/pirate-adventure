'use strict';

// Set event listener on form on front page, set username to output
var rum = 100;
var money = 100;
var characterStats = [];
var imageName = '';
var cardStackArray = [];


function saveFunction() {
  // character -userName,index in cardArray[i]
}

// Save button event listener
var saveButton = document.getElementById('savebar');
saveButton.addEventListener('click', saveFunction);

function Character (userName, fightingAbility, pirateSpirit, intelligence, rum, money) {
  this.userName = userName;
  this.fightingAbility = fightingAbility;
  this.pirateSpirit = pirateSpirit;
  this.intelligence = intelligence;
  this.rum = rum;
  this.money = money;
  characterStats.push(this);
}
// Make characters based on radio click - make radio button name equal to the if statements here
if (imageName === 'fighter') {
  var toughGuy = new Character (userName, 15, 10, 5, rum, money);
}
if (imageName === 'smartGuy') {
  var smartGuy = new Character (userName, 5, 10, 15, rum, money);
}
if (imageName === 'funGuy') {
  var funGuy = new Character (userName, 5, 20, 5, rum, money);
}



function Cards (cardName, text, rumChange, moneyChange, helpingAbility, rumOrMoney) {
  this.cardName = cardName;
  this.text = text;
  this.rumChange = rumChange;
  this.moneyChange = moneyChange;
  this.helpingAbility = helpingAbility;
  this.rumOrMoney = rumOrMoney;
  cardStackArray.push(this);
}



Cards.prototype.changeStats = function() {
  characterStats[0].rum += this.rumChange;
  characterStats[0].money += this.moneyChange;
  // Make a random number based on how strong their helping ability is, then if they have a helping ability higher than 10, they get a bonus.
  var randomAbilityHelp = randomNumber(6,this.helpingAbility);
  if (this.helpingAbility >= 10){ // math.rondom()
    this.rumOrMoney += randomAbilityHelp;
  }
};

Cards.prototype.appendElement = function (parent, childType) {
  var child = document.createElement(childType);
  child.id = this.cardName;
  child.textContent = this.text;
  parent.appendChild(child);
};

// evneent listener on parent
// if id matches begin1 
// find the card in the cardstack array that is  

new Cards('begin1', 'Go to the Bahamas', 0 , 0, '', '', 'continue', 'stop');
new Cards('beginTwo', 'Go to Cuba', 0, 0, '', '');
new Cards('continue', 'Contine on, we don\'t have time to stop!', 50, 0, 'intelligence', 'rum', 'order', 'who-cares');
new Cards('stop', 'Stop and relax for a bit your crew could use some fun!', -25, -50, 'pirateSpirit', 'rum', 'straight-on', 'shortcut');
new Cards('straight-on', 'Head straight on towards your destination', 0, -100, 'pirateSpirit', 'money', 'treasure', 'against');

var choiceElement = document.getElementById('choice');
choiceElement.addEventListener('click', pickCards);
cardStackArray[0].appendElement(choiceElement,'p');
cardStackArray[1].appendElement(choiceElement,'p');
var cardName;
function pickCards(event) {
  cardName = event.target.id;
  // for (var i = 0; i < cardStackArray.length; i ++) {
  //   // if (){}
  //empty string
  
  alert('i work');

}


// Example card
// new Card (shipSinks, 'we hit rock, the ship sinks',-50, -50, characterStats[0].
// intelligence, money);

function randomNumber(min,max) {
  return Math.floor(Math.random()*(max - min + 1) + 1);
}
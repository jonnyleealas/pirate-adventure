'use strict';
var userName = '';
// Set event listener on form on front page, set username to output
var rum = 100;
var money = 100;
var characterStats = [];
var imageName = 'fightGuy';
var cardStackArray = [];



function getUserName(event) {
event.preventDefault();
  userName = document.loginForm.userName.value; //"Names" on forms need to match these names here
console.log(userName);
  characterImage();
  
}
function characterImage(form, name) {
  var radios = form.elements[name];
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      imageName = radios[i].value; // Double check to make sure this works
      break;
    }
  }
}

// NEED ID FROM FORM INPUT FROM HTML
var loginForm = document.getElementById('form');
//this ties form to html
loginForm.addEventListener('submit', getUserName);

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
  child = document.createElement(childType);
  child.textContent = this.text;
  parent.appendChild(child);
};

// Example card
// new Card (shipSinks, 'we hit rock, the ship sinks',-50, -50, characterStats[0].
// intelligence, money);

function randomNumber(min,max) {
  return Math.floor(Math.random()*(max - min + 1) + 1);
}


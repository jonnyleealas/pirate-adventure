'use strict';

// Set event listener on form on front page, set username to output
var rum = 200;
var money = 200;
var characterStats = [];
var imageName;
var cardStackArray = [];
var userName;

function saveFunction() {
  // character -userName,index in cardArray[i]
}

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
  window.location.href = 'index.html';
}

var loginForm = document.getElementById('form');
if (loginForm !== null) {
  loginForm.addEventListener('submit', getUserName);
}


// Save button event listener
var saveButton = document.getElementById('savebar');
saveButton.addEventListener('click', saveFunction);

function Character(userName, fightingAbility, pirateSpirit, intelligence, rum, money) {
  this.userName = userName;
  this.fightingAbility = fightingAbility;
  this.pirateSpirit = pirateSpirit;
  this.intelligence = intelligence;
  this.rum = rum;
  this.money = money;
  characterStats.push(this);
}
// Make characters based on radio click - make radio button name equal to the if statements here
function getUserAndImageFromStorage() {
  if (localStorage.getItem('userName') !== null) {
    var storeUserName = localStorage.getItem('userName');
    userName = JSON.parse(storeUserName);
    var storeImageName = localStorage.getItem('imageName');
    imageName = JSON.parse(storeImageName);
  }
  if (imageName === 'fighter') {
    new Character(userName, 15, 10, 5, rum, money);
  }
  if (imageName === 'smartGuy') {
    new Character(userName, 5, 10, 15, rum, money);
  }
  if (imageName === 'funGuy') {
    new Character(userName, 5, 20, 5, rum, money);
  }
}





function Cards(cardName, text, rumChange, moneyChange, helpingAbility, rumOrMoney, choiceOne, choiceTwo, narrative) {
  this.cardName = cardName;
  this.text = text;
  this.rumChange = rumChange;
  this.moneyChange = moneyChange;
  this.helpingAbility = helpingAbility;
  this.rumOrMoney = rumOrMoney;
  this.choiceOne = choiceOne;
  this.choiceTwo = choiceTwo;
  this.narrative = narrative;
  cardStackArray.push(this);
}

Cards.prototype.changeStats = function() {
  characterStats[0].rum += this.rumChange;
  if (characterStats[0].rum > 200) {
    characterStats[0].rum = 200;
  }
  characterStats[0].money += this.moneyChange;
  // Make a random number based on how strong their helping ability is, then if they have a helping ability higher than 10, they get a bonus.
  var helpAmount = this.helpingAbility;
  var randomAbilityHelp = randomNumber(6, characterStats[0][helpAmount]);
  if (characterStats[0][this.rumOrMoney] >= 10) { // math.rondom()
    characterStats[0][this.rumOrMoney] += randomAbilityHelp;
  }
  var parentElement = document.getElementById('changingStats');
  parentElement.textContent = ('');
  var healthLi = document.createElement('li');
  healthLi.textContent = `Rum: ${characterStats[0].rum}`;
  var moneyLi = document.createElement('li');
  moneyLi.textContent = `Booty: ${characterStats[0].money}`;
  parentElement.appendChild(healthLi);
  parentElement.appendChild(moneyLi);
};

Cards.prototype.appendElement = function (parent, childType) {
  var child = document.createElement(childType);
  child.id = this.cardName;
  child.textContent = this.text;
  parent.appendChild(child);
};
Cards.prototype.appendNarrative = function (parent, childType) {
  var child = document.createElement(childType);
  child.id = this.cardName;
  child.textContent = this.narrative;
  parent.appendChild(child);
};

// BAHAMAS ROUTE
new Cards('beginOne', 'Go to the Bahamas', 0, 0, '', '', 'continue', 'stop');
new Cards('continue', 'Contine on, we don\'t have time to stop!', 50, 0, 'intelligence', 'rum', 'order', 'who-cares');
new Cards('order', 'Order a crew member to fish it out of the sea!', 0, 100, 'intelligence', 'money', 'stop', 'straight-on');
new Cards('who-cares', 'Who cares about an old barrel! It\'s probably just some garbage', -25, 0, 'fightingAbility', 'rum', 'tell-stop', 'worry-later');
new Cards('worry-later', ' I\'ll worry about it after I finish beating this scallywag!', -100, 0, '', '', '', '');
//Narrative:You get so engrossed in the wonderful pirate brawl that you sail right past the Bahamas. As the brawl continues you don't notice the British Naval ship coming towards you! They catch you and your crew and sentence you to hanging for all of you terrible pirate crimes! Game Over!
new Cards('tell-stop', 'Tell the crew to stop their nonsense and land in the Bahamas.', 0, -100, 'intelligence', 'money', 'treasure', 'against');
// Stop at Pirate Island
new Cards('stop', 'Stop and relax for a bit your crew could use some fun!', -25, -50, 'pirateSpirit', 'rum', 'straight-on', 'shortcut');
// Take shortcut, can't go past go back.
new Cards('bahamasShortcut', 'Take a shortcut that you were told about on the pirate island', -25, -25, 'pirateSpirit', 'rum', 'stop', 'straight-on');
// Stop = go back to PI
// Straight-on = go to destination
// STRAIGHT ON ROUTE
new Cards('straight-on', 'Head straight on towards your destination', 0, -100, 'pirateSpirit', 'money', 'treasure', 'against');
new Cards('against', 'Decide against it.', -100, 0, '', '', '', '');
// Narrative :Your crew kills you in your sleep and elects the first mate to be captain and goes after the treasure leaving your body to rot. GAME OVER.
new Cards('treasure', 'Go after the treasure', -30, 0, 'fightingAbility', 'rum', 'ignore', 'heed');
new Cards('heed', 'Heed his warning, he seems to know a thing or two. He is Blackbeard after all.', -100, 0, '', '', '', '');
// Narrative: You listened to Blackbeard's warning and you decided to not drink from the grail. The problem is you and your crew woke up the temple watchers from their sleep. They are lizard people and they capture you all and decide to enslave everyone. GAME OVER
new Cards('ignore', 'Ignore his warning! Of course a dead guy wouldn\'t want you to live forever!', -100, 0, '', '', '', '');
// Narrative: You ignore Blackbeards warning and you start to feel funny from drinking from the grail. You are granted the gift of eternal life but you can never leave the temple for the rest of eternity. As punishment for disobeying Blackbeards warning your whole crew turns to gold statues to watch the temple forever.  GAME OVER
// CUBA ROUTE
new Cards('beginTwo', 'Go to Cuba', 0, 0, '', '', 'cubaShortcut', 'long-way', 'On your journey you see an island with a rocky pass down its middle.');
new Cards('cubaShortcut', 'Take the shortcut through the pass.', 0, -30, 'pirateSpirit', 'money', 'east', 'west', 'Your ship takes damage and you must stop to repair it using much of what little gold you have left. You go back and go around the island instead. It took a while but you safely made it past the island. What direction to Cuba again?');
new Cards('long-way', 'Take the long way around the island', 30, 0, 'intelligence', 'rum', 'east', 'west');
new Cards('west', 'Go West!', 25, 0, 'pirateSpirit', 'rum', 'fight', 'sneak');
new Cards('sneak', 'Try and sneak past the British Naval ship', -100, 0, '', '', '', '');
// Narrative: Oh No! The British caught you and you are hung publicly for your treacherous pirate crimes! Game Over.
new Cards('fight', 'Fight your way out of the city! Yar!!', -50, -50, 'fightingAbility', 'rum', 'confront', 'sail-on');
new Cards('sail-on', 'Sail on past it, you don\'t have time to investigate!', -100, 0, '', '', '', '');
// Narrative: The mysterious ship destroys your ship with its cannons. The ship sinks and any survivors are killed by its crew. GAME OVER.
new Cards('confront', 'Stop and confront the ship!', - 25, 0, 'pirateSpirit', 'rum', 'sell-souls', 'ignore-offer');
new Cards('east', 'Go East!', -25, 0, 'intelligence', 'rum', 'head-towards', 'keep-going-storm');
new Cards('keep-going-storm', 'Keep going straight into the storm, you can make it through!', -100, 0, '', '', '', '');
// Narrative: You try and brave the storm but it tears your ship into pieces. You wake up on a beautiful beach of an abandoned island with no one else in sight. You live out the rest of your days living the island life, and since no one else knew what became of you, your name is forever remembered as one of the great pirate legends. Game Over.
new Cards('head-towards', 'Head towards what you believe to be a lighthouse in the distance', 25, 0, 'pirateSpirit', 'rum', 'investigate', 'pass-ship');
('pass-ship', 'Pass the mysterious ship', -100, 0, '', '', '', '');
// Narrative: Your ship slowly moves past the mysterious ship and you sigh a breath of relief after it is gone. The storm has cleared but a crew member notices a shadow in the water. A monstrosity of a sea serpent comes out of the water and eats you whole. GAME OVER.
new Cards('investigate', 'Investigate the mysterious ship!', -30, 0, 'fightingAbility', 'sell-souls', 'ignore-offer');
new Cards('sell-souls', 'Sell the souls of your crew so you can make it to the Bahamas safely, while the rest of your crew is eternally bound to the Flying Dutchman.', -100, 0, '', '', '', '');
// Narrative: (ONE OF MAIN CUBA ENDINGS) You have sacrificed your crew and now it is just you and your ship. One night as you sail you try and drink away the guilt. In your drunken state, you spot in the water the most beautiful creatures, mermaids. They charm you with their voices enough to get you close to the water and they pull you in and eat you alive. GAME OVER.
new Cards('ignore-offer', 'Ignore the offer and sail into the dark night.', -100, 0, '', '', '', '');
// Narrative: (ONE Of MAIN CUBA ENDINGS) You have made the moral choice. The problem with this is you pissed of the devil. The following day, your ship gets stuck on a reef, but wait a second.. this isn't a reef. It's the Kraken! It's here to take you and your crew to Davy Jones's locker. You and your crew do your best to fight off the beast, but it is all for nothing. Your ship sinks with you and your crew, sending you to Davy Jones locker until the end of time. GAME OVER!

var choiceElement = document.getElementById('choice');
choiceElement.addEventListener('click', pickCards);
var narrativeElement = document.getElementById('narrative');

for (var i = 0; i < cardStackArray.length; i++) {
  if (cardStackArray[i].cardName === 'beginOne' || cardStackArray[i].cardName === 'beginTwo') {
    cardStackArray[i].appendElement(choiceElement, 'p');
  }
}

function pickCards(event) {
  var cardName = event.target.id;
  // Match with card
  var indexOne;
  for (var i = 0; i < cardStackArray.length; i++) {
    if (cardName === cardStackArray[i].cardName) {
      indexOne = i;
    }
  }
  cardStackArray[indexOne].changeStats();
  choiceElement.textContent = ('');
  narrativeElement.textContent = ('');
  cardStackArray[indexOne].appendNarrative(narrativeElement, 'p');
  for (var j = 0; j < cardStackArray.length; j++) {
    if (cardStackArray[indexOne].choiceOne === cardStackArray[j].cardName) {
      cardStackArray[j].appendElement(choiceElement, 'p');
    }
  }
  for (var k = 0; k < cardStackArray.length; k++) {
    if (cardStackArray[indexOne].choiceTwo === cardStackArray[k].cardName) {
      cardStackArray[k].appendElement(choiceElement, 'p');
    }
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + 1);
}

getUserAndImageFromStorage();


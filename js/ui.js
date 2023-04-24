// Inventory
// Open Inventory
function openInventory() {
  if (
    document.getElementById('inventoryDisplay').style.visibility == 'hidden'
  ) {
    document.getElementById('inventoryDisplay').style.visibility = 'visible';
    document.getElementById('closeInventory').style.visibility = 'visible';
    document.getElementById('descDisplay').style.visibility = 'visible';
  } else {
    document.getElementById('inventoryDisplay').style.visibility = 'hidden';
    document.getElementById('closeInventory').style.visibility = 'hidden';
    document.getElementById('descDisplay').style.visibility = 'hidden';
  }
}
function gridSelect(id) {
  const gridContainer = document.getElementById('gridContainer');
  const childElements = gridContainer.children;

  for (let i = 0; i < childElements.length; i++) {
    childElements[i].style.outline = '';
  }

  descDisplay.textContent = '';
  document.getElementById(id).style.outline = '2px solid green';
  //console.log(document.getElementById(id))
  const ident = document.getElementById(
    document.getElementById(id).querySelector('img').alt
  );
  console.log(ident);

  const h3 = document.createElement('h3');
  console.log('h3: ' + h3);
  h3.style = 'color: white';
  h3.textContent = document.getElementById(id).querySelector('img').alt;
  document.getElementById('descDisplay').appendChild(h3);

  // Item Description
  const itemName = h3.textContent;
  console.log(itemName);
  const result = itemList.find((item) => item.name === itemName);
  console.log(result.description);
  console.log(result.type);
  const descP = document.createElement('p');
  descP.textContent = 'Type: ' + result.type + '\n' + result.description;
  descP.style = 'color: white';
  document.getElementById('descDisplay').appendChild(descP);
}

// Item List
let itemList = [
  {
    name: 'Scrap',
    description: 'Salvaged scrap from an ship. \r\nCan be sold for Thanite',
    type: 'Sellable Item',
  },
  {
    name: 'Alien Relic',
    description: 'A relic from a different race. Can be sold for Thanite',
    type: 'Sellable Item',
  },
  {
    name: 'Valuable Ores',
    description:
      'Rare ores sought highly throughout the galaxy. Can be sold for Thanite',
    type: 'Sellable Item',
  },
  {
    name: 'High Tech Weapon System',
    description:
      'A higher performance weapon system. If in inventory, player will deal extra damage in battle',
    type: 'Ship Mod',
  },
  {
    name: 'High Tech Shield System',
    description:
      'A higher performance shield system. If in inventory, player will have boosted shields in battle',
    type: 'Ship Mod',
  },
  {
    name: 'Ancient Star Map',
    description:
      'An ancient map of the galaxy. Shows location of treasure among the stars.',
    type: 'Star Map',
  },
  {
    name: 'Strange Substance',
    description: 'A strange substance of unknown origin',
    type: 'Quest Item',
  },
  {
    name: 'Weapon Fragments',
    description:
      'Fragments of an ancient and powerful weapon, could come in handy if all fragments are retrieved',
    type: 'Weapon',
  },
  {
    name: 'Shield Recharge',
    description: 'Recharge your shields if they are depleted',
    type: 'Ship Mod',
  },
  {
    name: 'Hull Repair Nanites',
    description: "Nanites programmed to repair damage to your ship's hull",
    type: 'Usable Item',
  },
];
// Player Inventory
let inventory = [];

let inventoryString = '';

// Play Invertory as a string for session storage

// Add Item/Adjust Item Quantity
function addItem(name, quantity) {
  console.log('Adding ' + quantity + 'x ' + name + '.');
  // Find the item in the array with the matching name
  let foundItem = inventory.find((item) => item.name === name);
  if (foundItem) {
    // If the item is found, update the quantity
    //console.log("Item found in player inventory")
    foundItem.quantity += quantity;
    console.log('Player has ' + foundItem.quantity + ' of ' + foundItem.name);
  } else {
    // If the item is not found, add a new object with the name and quantity
    inventory.push({ name: name, quantity: quantity });
    console.log(inventory);
  }
  inventoryString = JSON.stringify(inventory);
  sessionStorage.setItem('inventory', inventoryString);
  console.log('inventoryString: ' + inventoryString);
}

function removeItem(name, quantity) {
  // Find the item in the array with the matching name
  let foundItem = inventory.find((item) => item.name === name);
  if (foundItem.quantity >= quantity) {
    // If the item is found, update the quantity
    foundItem.quantity -= quantity;
    if (foundItem.quantity == 0) {
      // Remove item from list
      inventory = inventory.filter((item) => item.name !== foundItem.name);
    }
  } else {
    console.log('Not Enough ' + foundItem.name);
  }
  inventoryString = JSON.stringify(inventory);
  sessionStorage.setItem('inventory', inventoryString);
}

function calcRewards(reward) {
  if (reward != null) {
    const rewards = reward.split(',');
    console.log(rewards);
    for (i = 0; i < rewards.length; i += 2) {
      //console.log("addItem("+rewards[i].toString()+", "+parseInt(rewards[i+1])+");")
      var rewardQuantity = rewards[i + 1];
      console.log(rewardQuantity);
      if (
        rewardQuantity.toString() == 'rand' ||
        rewardQuantity.toString() == ' rand'
      ) {
        rewardQuantity = Math.floor(Math.random() * (5 - 2 + 1) + 2); // rand(2,5)
      }
      addItem(rewards[i], rewardQuantity);
    }
    populateGrid(inventory, itemList);
  }
}

//addItem('Scrap', 1);
//addItem('Alien Relic', 1);
// removeItem('Scrap', 5);
// addItem('Alien Relic', 5);
// addItem('Scrap', 1);
// removeItem('Scrap', 1);
//addItem('High Tech Shield System', 10);
//console.log(inventory)

// Populate Grid
function populateGrid(items, list) {
  //Reset gridContainer before repopulating
  console.log('items Length: ' + items.length);
  invString = sessionStorage.getItem('inventory');
  inventory = JSON.parse(invString);
  //console.log(inventory[0]);
  document.getElementById('gridContainer').innerHTML = gridContent;
  const gridItems = document.querySelectorAll('.grid-item'); // Define gridItems
  for (let i = 0; i < items.length; i++) {
    console.log(items[i].name);

    const item = items[i];
    console.log(list[i].image);
    const gridItem = gridItems[i];

    const image = document.createElement('img');
    image.src = './images/custom/items/' + item.name + '.png';
    image.alt = item.name;
    image.style = 'width: 65px; margin-left: -30px; margin-top: -33px';
    gridItem.appendChild(image);

    const quantity = document.createElement('p');
    quantity.classList.add('quantity');
    quantity.textContent = `${item.quantity}`;
    gridItem.appendChild(quantity);
    quantity.style = 'margin-left: 24; margin-top: -15; color: black;';
  }
  for (let i = 0; i < itemList.length; i++) {
    //console.log(itemList[i]);
  }
}

window.onload = function () {
  gridContent = document.getElementById('gridContainer').innerHTML;
  populateGrid(inventory, itemList);
};

function debug(command) {
  //console.log(command)
  if (command == 'initialize') {
    if (
      document.getElementById('minigameIframe').style.visibility == 'hidden'
    ) {
      document.getElementById('minigameIframe').style.visibility = 'visible';
      document.getElementById('mask').style.visibility = 'visible';
    } else {
      document.getElementById('minigameIframe').style.visibility = 'hidden';
      document.getElementById('minigameIframe').src = '';
      document.getElementById('mask').style.visibility = 'hidden';
    }
  } else if (command == 'asteroid') {
    if (
      document.getElementById('minigameIframe').style.visibility == 'hidden'
    ) {
      document.getElementById('minigameIframe').style.visibility = 'visible';
      document.getElementById('minigameIframe').src = 'minigames/context.html';
      document.getElementById('mask').style.visibility = 'visible';

      sessionStorage.setItem('activeEvent', command);
      sessionStorage.setItem('activeStatus', 'begin');
    } else {
      document.getElementById('minigameIframe').style.visibility = 'hidden';
      document.getElementById('minigameIframe').src = '';
      document.getElementById('mask').style.visibility = 'hidden';
    }
  } else if (command == 'battle') {
    if (
      document.getElementById('minigameIframe').style.visibility == 'hidden'
    ) {
      document.getElementById('minigameIframe').style.visibility = 'visible';
      document.getElementById('minigameIframe').src = 'minigames/context.html';
      document.getElementById('mask').style.visibility = 'visible';

      sessionStorage.setItem('activeEvent', command);
      sessionStorage.setItem('activeStatus', 'begin');
    } else {
      document.getElementById('minigameIframe').style.visibility = 'hidden';
      document.getElementById('minigameIframe').src = '';
      document.getElementById('mask').style.visibility = 'hidden';
    }
  } else if (command == 'add money 1') {
    addMoney(1);
  } else if (command == 'add money 10') {
    addMoney(10);
  } else if (command == 'add money 100') {
    addMoney(100);
  } else if (command == 'add money 1000') {
    addMoney(1000);
  } else if (command == 'sub money 1') {
    subMoney(1);
  } else if (command == 'sub money 10') {
    subMoney(10);
  } else if (command == 'sub money 100') {
    subMoney(100);
  } else if (command == 'sub money 1000') {
    subMoney(1000);
  } else if (command == 'add scrap') {
    addItem('Scrap', 1);
  } else if (command == 'add substance') {
    addItem('Strange Substance', 1);
  } else if (command == 'sub scrap') {
    removeItem('Scrap', 1);
  } else if (command == 'sub substance') {
    removeItem('Strange Substance', 1);
  } else if (command == 'add fuel 1') {
    addFuel(1);
  } else if (command == 'add fuel 10') {
    addFuel(10);
  } else if (command == 'add fuel 100') {
    addFuel(100);
  } else if (command == 'sub fuel 1') {
    subFuel(1);
  } else if (command == 'sub fuel 10') {
    subFuel(10);
  } else if (command == 'sub fuel 100') {
    subFuel(100);
  }

  var cmdDown = false;

  document.body.addEventListener('keydown', function (event) {
    var key = event.keyCode || event.charCode || 0;
    if ([192].indexOf(key) !== -1) {
      cmdDown = true;
      document.getElementById('debug').style.visibility = 'visible';
    }
  });

  document.body.addEventListener('keyup', function (event) {
    var key = event.keyCode || event.charCode || 0;
    if ([192].indexOf(key) !== -1) {
      cmdDown = false;
      document.getElementById('debug').style.visibility = 'hidden';
    }
  });
}

// Player money
var money = 0;

// Initialize money
function initMoney() {
  var seshMoney = sessionStorage.getItem('money', money);
  if (seshMoney == null) {
    sessionStorage.setItem('money', money);
  } else {
    var moneyStr = sessionStorage.getItem('money', money);
    money = parseInt(moneyStr);
  }
  document.getElementById('currencyText').innerHTML = money;
}

// Add money
function addMoney(quantity) {
  //console.log('Current Money: ' + money + ' Quantity: ' + quantity);
  money = money + quantity;
  if (money > 1000000) {
    money = 1000000;
  }
  //console.log('Money after addition: ' + money);
  document.getElementById('currencyText').innerHTML = money;
  //console.log('Current Money: ' + money);
  sessionStorage.setItem('money', money);
}

// Sub money
function subMoney(quantity) {
  //console.log('Current Money: ' + money + ' Quantity: ' + quantity);
  if (money < quantity) {
    console.log('not enough funds');
  } else {
    money = money - quantity;
    if (money <= 0) {
      money = 0;
    }
    //console.log('Money after subtraction: ' + money);
    document.getElementById('currencyText').innerHTML = money;
    //console.log('Current Money: ' + money);
    sessionStorage.setItem('money', money);
  }
}

// Player fuel
var fuel = 0;

// Initialize fuel
function initFuel() {
  var seshFuel = sessionStorage.getItem('fuel', fuel);
  if (seshFuel == null) {
    sessionStorage.setItem('fuel', fuel);
  } else {
    var fuelStr = sessionStorage.getItem('fuel', fuel);
    fuel = parseInt(fuelStr);
  }
  document.getElementById('fuelText').innerHTML = fuel;
}

// Add fuel
function addFuel(quantity) {
  //console.log('Current Money: ' + money + ' Quantity: ' + quantity);
  fuel = fuel + quantity;
  if (fuel > 100) {
    fuel = 100;
  }
  //console.log('Money after addition: ' + money);
  document.getElementById('fuelText').innerHTML = fuel;
  //console.log('Current Money: ' + money);
  sessionStorage.setItem('fuel', fuel);
}

// Sub money
function subFuel(quantity) {
  //console.log('Current Money: ' + money + ' Quantity: ' + quantity);
  if (fuel < quantity) {
    console.log('not enough fuel');
  } else {
    fuel = fuel - quantity;
    if (fuel <= 0) {
      fuel = 0;
    }
    //console.log('Money after subtraction: ' + money);
    document.getElementById('fuelText').innerHTML = fuel;
    //console.log('Current Money: ' + money);
    sessionStorage.setItem('fuel', fuel);
  }
}

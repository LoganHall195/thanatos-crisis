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
    image: 'scrap metal re.png',
  },
  {
    name: 'Alien Relic',
    description: 'A relic from a different race. Can be sold for Thanite',
    type: 'Sellable Item',
    image: 'alien relic.png',
  },
  {
    name: 'Valuable Ores',
    description:
      'Rare ores sought highly throughout the galaxy. Can be sold for Thanite',
    type: 'Sellable Item',
    image: 'valuable ores.png',
  },
  {
    name: 'High Tech Weapon System',
    description:
      'A higher performance weapon system. If in inventory, player will deal extra damage in battle',
    type: 'Ship Mod',
    image: 'htws.png',
  },
  {
    name: 'High Tech Shield System',
    description:
      'A higher performance shield system. If in inventory, player will have boosted shields in battle',
    type: 'Ship Mod',
    image: 'htss.png',
  },
  {
    name: 'Ancient Star Map',
    description:
      'An ancient map of the galaxy. Shows location of treasure among the stars.',
    type: 'Star Map',
    image: 'scrap metal re.png',
  },
  {
    name: 'Strange Substance',
    description: 'A strange substance of unknown origin',
    type: 'Quest Item',
    image: 'scrap metal re.png',
  },
  {
    name: 'Weapon Fragments',
    description:
      'Fragments of an ancient and powerful weapon, could come in handy if all fragments are retrieved',
    type: 'Weapon',
    image: 'scrap metal re.png',
  },
  {
    name: 'Shield Recharge',
    description: 'Recharge your shields if they are depleted',
    type: 'Ship Mod',
    image: 'shield recharge re.png',
  },
  {
    name: 'Hull Repair Nanites',
    description: "Nanites programmed to repair damage to your ship's hull",
    type: 'Weapon',
    image: 'scrap metal re.png',
  },
];
// Player Inventory
let inventory = [
  {
    name: 'Scrap',
    quantity: 1,
  },
  {
    name: 'Alien Relic',
    quantity: 1,
  },
  {
    name: 'Valuable Ores',
    quantity: 1,
  },
  {
    name: 'High Tech Weapon System',
    quantity: 1,
  },
  {
    name: 'High Tech Shield System',
    quantity: 5,
  },
  {
    name: 'Ancient Star Map',
    quantity: 1,
  },
  {
    name: 'Strange Substance',
    quantity: 1,
  },
  {
    name: 'Weapon Fragments',
    quantity: 1,
  },
  {
    name: 'Shield Recharge',
    quantity: 1,
  },
  {
    name: 'Hull Repair Nanites',
    quantity: 10,
  },
];
// Populate Grid
function populateGrid(items, list) {
  const gridItems = document.querySelectorAll('.grid-item');
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const gridItem = gridItems[i];
    const result = list.find((item) => item.name);

    const image = document.createElement('img');
    image.src = './images/custom/items/' + list[i].image;
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
  populateGrid(inventory, itemList);
};

function debug(command) {
  if (command == 'asteroid') {
    if (
      document.getElementById('minigameIframe').style.visibility == 'hidden'
    ) {
      document.getElementById('minigameIframe').style.visibility = 'visible';
      document.getElementById('minigameIframe').src = 'minigames/asteroid.html';
    } else {
      document.getElementById('minigameIframe').style.visibility = 'hidden';
      document.getElementById('minigameIframe').src = '';
    }
  } else if (command == 'battle') {
    if (
      document.getElementById('minigameIframe').style.visibility == 'hidden'
    ) {
      document.getElementById('minigameIframe').style.visibility = 'visible';
      document.getElementById('minigameIframe').src = 'minigames/battle.html';
    } else {
      document.getElementById('minigameIframe').style.visibility = 'hidden';
      document.getElementById('minigameIframe').src = '';
    }
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

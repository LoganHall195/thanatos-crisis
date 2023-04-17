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
    name: 'Shield Recharge',
    description: 'Recharge your shields if they are depleted',
    type: 'Ship Mod',
    image: 'shield recharge.png',
  },
];
// Player Inventory
let inventory = [
  {
    name: 'Shield Recharge',
    quantity: 1,
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
    image.src = './images/custom/items/' + result.image;
    image.alt = item.name;
    image.style = 'width: 50px; margin-left: -23px; margin-top: -25';
    gridItem.appendChild(image);

    const quantity = document.createElement('p');
    quantity.classList.add('quantity');
    quantity.textContent = `${item.quantity}`;
    gridItem.appendChild(quantity);
    quantity.style = 'margin-left: 17; margin-top: -15;';
  }
}

window.onload = function () {
  populateGrid(inventory, itemList);
};

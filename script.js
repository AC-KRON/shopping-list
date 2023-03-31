const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Functions

const onAddItemSubmit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;
  // Validate Input
  if (newItem === '') {
    alert('Please add an item.');
    return;
  }

  // Create item DOM element
  addItemToDOM(newItem);
  // Add items to Storage
  addItemToStorage(newItem);

  itemInput.value = '';
};

const addItemToDOM = (item) => {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');

  li.appendChild(button);
  // add li to the DOM
  itemList.appendChild(li);
  checkUI();
};

const addItemToStorage = (item) => {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('item'));
  }
  // Add new item to localStorage array
  itemsFromStorage.push(item);
  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

// Delete list item
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
    }
    e.target.parentElement.parentElement.remove();
    checkUI();
  }
};

// Clear Items
const clearItem = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
};

// Filter items
const itemsFilter = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
      // console.log(true);
    } else {
      item.style.display = 'none';
      // console.log(false);
    }
  });
};

// Function for checking dom elements
const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// Event Listener

itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItem);
itemFilter.addEventListener('input', itemsFilter);

checkUI();

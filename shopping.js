// shopping.js

// Array to store shopping list items
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Get references to DOM elements
const itemInput = document.getElementById('itemInput');
const quantityInput = document.getElementById('quantityInput');
const priceInput = document.getElementById('priceInput');
const addItemButton = document.getElementById('addItemButton');
const shoppingListContainer = document.getElementById('shoppingList');
const clearListButton = document.getElementById('clearListButton');

// Function to render the shopping list
function renderList() {
    // Clear the existing list
    shoppingListContainer.innerHTML = '';

    // Iterate over the shoppingList array and create list items
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.innerHTML = `${item.name} - Qty: ${item.quantity} - Price: Ksh ${item.price.toFixed(2)}`;
        
        if (item.purchased) {
            const purchasedSpan = document.createElement('span');
            purchasedSpan.textContent = ' (purchased)';
            purchasedSpan.classList.add('purchased-text');
            span.appendChild(purchasedSpan);
            li.classList.add('purchased');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('change', () => markPurchased(index));
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.disabled = item.purchased;
        editButton.addEventListener('click', () => editItem(index));

        li.appendChild(span);
        li.appendChild(checkbox);
        li.appendChild(editButton);
        
        shoppingListContainer.appendChild(li);
    });

    // Save the shopping list to local storage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Function to add a new item to the shopping list
function addItem() {
    const newItem = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim());
    const price = parseFloat(priceInput.value.trim());
    if (newItem !== '' && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0) {
        shoppingList.push({ name: newItem, quantity, price, purchased: false });
        itemInput.value = '';
        quantityInput.value = '';
        priceInput.value = '';
        addItemButton.disabled = true; // Disable the button after adding the item
        renderList();
    }
}

// Function to mark an item as purchased
function markPurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

// Function to edit an item
function editItem(index) {
    const item = shoppingList[index];
    const li = shoppingListContainer.children[index];

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = item.name;

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;

    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.value = item.price;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => saveItem(index, nameInput.value, quantityInput.value, priceInput.value));

    li.innerHTML = '';
    li.appendChild(nameInput);
    li.appendChild(quantityInput);
    li.appendChild(priceInput);
    li.appendChild(saveButton);
}

// Function to save the edited item
function saveItem(index, name, quantity, price) {
    if (name.trim() !== '' && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0) {
        shoppingList[index].name = name.trim();
        shoppingList[index].quantity = parseInt(quantity);
        shoppingList[index].price = parseFloat(price);
        renderList();
    }
}

// Function to clear purchased items from the shopping list
function clearList() {
    shoppingList = shoppingList.filter(item => !item.purchased);
    renderList();
}

// Event listeners
addItemButton.addEventListener('click', addItem);
clearListButton.addEventListener('click', clearList);

// Disable add button if input is empty
itemInput.addEventListener('input', validateInputs);
quantityInput.addEventListener('input', validateInputs);
priceInput.addEventListener('input', validateInputs);

function validateInputs() {
    addItemButton.disabled = itemInput.value.trim() === '' || quantityInput.value.trim() === '' || priceInput.value.trim() === '';
}

// Initial render
renderList();

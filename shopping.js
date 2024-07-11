// script.js

// Array to store shopping list items
let shoppingList = [];

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
        li.innerHTML = `<span>${item.name} - Qty: ${item.quantity} - Price: $${item.price.toFixed(2)}</span>`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('change', () => markPurchased(index));
        
        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');
        checkboxContainer.appendChild(checkbox);

        li.appendChild(checkboxContainer);

        if (item.purchased) {
            const purchasedSpan = document.createElement('span');
            purchasedSpan.textContent = ' (purchased)';
            purchasedSpan.classList.add('purchased-text');
            li.appendChild(purchasedSpan);
            li.classList.add('purchased');
        }
        
        shoppingListContainer.appendChild(li);
    });
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

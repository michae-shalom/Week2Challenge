The Shopping list enables the user to add items they want to purchase, the quantity and the price. This enables them to work within a budget. Once an item is purchased, the client can fast track and clear it from the list, enabling easier navigation into other items. 
In summary, this are the inclusions within the code and what they do 
Variables: shoppingList is an array that stores objects representing shopping list items, each with name, quantity, price, and purchased properties.
DOM References: itemInput, quantityInput, priceInput, addItemButton, shoppingListContainer, and clearListButton are references to various DOM elements used for input, buttons, and displaying the shopping list.
renderList Function: Renders the shopping list based on the current shoppingList array. It dynamically creates list items (li elements) for each shopping list item, including its name, quantity, price, and a "purchased" indication if applicable.
addItem Function: Adds a new item to the shoppingList array when the "Add" button is clicked. Validates input values (name, quantity, price) and updates the DOM to reflect the new item.
markPurchased Function: Toggles the purchased property of an item when it is clicked, and re-renders the shopping list to update the visual indication.
clearList Function: Filters out items from the shoppingList array that are marked as purchased (item.purchased === true). This function is called when the "Clear List" button is clicked.
Event Listeners: Attach event listeners to input fields (itemInput, quantityInput, priceInput) to enable/disable the "Add" button based on whether all required inputs are filled.
Initial Render: Calls renderList() initially to populate the shopping list on page load.
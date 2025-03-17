document.addEventListener("DOMContentLoaded", loadItems);

function addItem() {
    let input = document.getElementById("itemInput");
    let itemValue = input.value.trim();

    if (itemValue === "") {
        alert("Please enter an item.");
        return;
    }

    let shoppingList = document.getElementById("shoppingList");
    let li = createListItem(itemValue);
    shoppingList.appendChild(li);

    saveToLocalStorage(itemValue);
    input.value = "";
}

function createListItem(itemValue) {
    let li = document.createElement("li");
    li.textContent = itemValue;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        removeItem(itemValue, li);
    };

    li.appendChild(deleteBtn);
    return li;
}

function saveToLocalStorage(item) {
    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
    items.push(item);
    localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadItems() {
    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
    let shoppingList = document.getElementById("shoppingList");

    items.forEach((item) => {
        let li = createListItem(item);
        shoppingList.appendChild(li);
    });
}

function removeItem(item, element) {
    let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
    items = items.filter((i) => i !== item);
    localStorage.setItem("shoppingList", JSON.stringify(items));
    element.remove();
}

function clearList() {
    localStorage.removeItem("shoppingList");
    document.getElementById("shoppingList").innerHTML = "";
}

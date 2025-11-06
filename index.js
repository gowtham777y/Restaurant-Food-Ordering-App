import { menuArray } from "./data.js";

const restaurantMenu = document.getElementById("restaurant-menu")
const restaurantBill = document.getElementById("restaurant-bill")
const items = []

document.addEventListener('click',function(e){
    addItemToBill(e.target.dataset.id)
})

function addItemToBill(id){
    items.forEach(function(item){
        if (item.id === id){
            item.quantity++;
        }
    })
}

function renderMenu(){
    if (items.length === 0){
        for (let item of menuArray){
            items.push({
                id: `${item.id}`,
                quantity: 0
            })
        }
    }
    restaurantMenu.innerHTML = menuArray.map(function(item){
        return `
            <div class="menu-item">
                <div class="item-contents">
                    <p class="item-image">${item.emoji}</p>
                    <div class="about-item">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="ingredients">${item.ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <div class="quantity">
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
            </div>
        `
    }).join('')
}

renderMenu()
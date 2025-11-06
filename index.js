import { menuArray } from "./data.js";

const restaurantMenu = document.getElementById("restaurant-menu");

function renderMenu(){
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
                    <button id="increase-btn" class="increase">+</button>
                </div>
            </div>
        `
    }).join('')
}

renderMenu()
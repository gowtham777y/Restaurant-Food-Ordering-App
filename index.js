import { menuArray } from "./data.js";

const restaurantMenu = document.getElementById("restaurant-menu")
const restaurantBill = document.getElementById("restaurant-bill")
const finalBill = document.getElementById("bill")
const billPaymentForm = document.getElementById('bill-payment')
const greetingSection = document.getElementById('greeting-section')
const paymentForm = document.getElementById('payment-form')
const items = []

document.addEventListener('click',function(e){
    if (e.target.dataset.id){
        addItemToBill(e.target.dataset.id)
    } else if (e.target.dataset.remove){
        removeItemFromBill(e.target.dataset.remove)
    } else if (e.target.id === 'proceed-payment'){
        billPaymentForm.classList.remove("hidden")
    }
})

paymentForm.addEventListener('submit',function(e){
    e.preventDefault();
    const formData = new FormData(paymentForm);
    paymentSuccesful(formData.get('username'))
    paymentForm.reset()
})

function addItemToBill(id){
    items.forEach(function(item){
        if (item.id === id){
            item.quantity++;
        }
    })
    renderTotalBill(items)
}

function removeItemFromBill(id){
    items.forEach(function(item){
        if(item.id === id){
            item.quantity = 0;
        }
    })
    renderTotalBill(items)
}

function paymentSuccesful(name){
    billPaymentForm.classList.add("hidden")
    restaurantBill.classList.add("hidden")
    greetingSection.innerHTML = `
        <div id="greeting">
            <p>Thanks ${name}! Your Order is on it's way</p>
        </div>
    `
    greetingSection.classList.remove("hidden")
    items.length = 0
}

function renderTotalBill(items){
    if (!greetingSection.classList.contains("hidden")){
        greetingSection.classList.add("hidden")
    }
    let totalPayable = 0
    finalBill.innerHTML = items.map(function(item){
        if (item.quantity > 0){
            totalPayable += item.price * item.quantity
            return `
                <div id="item">
                    <div>
                        <p class="item-and-quantity">${item.name}</p>
                        <button class="remove-item" data-remove="${item.id}">remove</button>
                    </div>
                    <p class="final-item-price">$${item.price * item.quantity}</p>
                </div>
            `
        }
    }).join('')
    if (totalPayable > 0){
        finalBill.innerHTML += `
            <div id="final-payable">
                <p class="item-and-quantity">Total price:</p>
                <p id="bill-amount" class="final-item-price">$${totalPayable}</p>
            </div>
            <button id="proceed-payment" class="complete-order">Complete Order</button>
        `
        restaurantBill.classList.remove("hidden")
    } else {
        restaurantBill.classList.add("hidden")
    }
}

function renderMenu(){
    if (items.length === 0){
        for (let item of menuArray){
            items.push({
                id: `${item.id}`,
                name: item.name,
                price: item.price,
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
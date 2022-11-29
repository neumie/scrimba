import { menuArray } from "./data.js";

const main = document.getElementsByTagName('main')[0];
const checkout = document.getElementById('checkout');
const modal = document.getElementById('card-modal');

let order = [];

document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        addItemToOrder(e.target.dataset.id);
    } else if (e.target.dataset.remove) {
        removeItemFromOrder(e.target.dataset.remove);
    } else if (e.target.dataset.checkout) {
        modal.style.display = 'block';
    } else if (e.target.dataset.closeModal) {
        modal.style.display = 'none';
    } else if (e.target.dataset.pay) {
        modal.style.display = 'none';
        order = [];
        alert("Thank you for your order!")
    } else return;
    renderCheckout();
});

// Menu

const getMenuHtml = (menuArray) => {
    let html = ``
    for (const menuItem of menuArray) {
        html += getItemHtml(menuItem);
    };
    return html;
};

const getItemHtml = (menuItem) => {
    const { name, ingredients, id, price, image } = menuItem;
    const html = `
                <section class="menu-item" id="${id}">
                    <img class="menu-item-image" src="./images/${image}" alt="${name}">
                    <div class="menu-item-info">
                        <h3>${name}</h3>
                        <p>${ingredients.join(', ')}</p>
                        <h4 class="item-price">$${price}</h4>
                    </div>
                    <button class="add" data-id="${id}">+</button>
                </section>
                `
    return html;
};

// Checkout

const getCheckoutHtml = () => {
    let orderHtml = ``;
    for (const menuItem of order) {
        orderHtml += getCheckoutItemHtml(menuItem);
    }
    const html = `
                <h1>Your order</h1>
                <div id="order">
                    ${orderHtml}
                </div>
                <div class="total">
                    <h3>Total Price:</h3>
                    <h3>$${getTotalPrice(order)}</h3>
                </div>
                <button class="checkout-btn btn" data-checkout="checkout">Complete order</button>
                `
    return html;
};

const getCheckoutItemHtml = (menuItem) => {
    const { name, price, id } = menuItem;
    const html = `
                <div class="order-item">
                    <h3>${name}</h3>
                    <button class="remove" data-remove="${id}">remove</button>
                    <h3>$${price}</h3>
                </div>
                `
    return html
};

// Other

const getTotalPrice = (order) => {
    let totalPrice = 0;
    if (!order) return 0;
    for (const menuItem of order) {
        totalPrice += menuItem.price;
    }
    return totalPrice;
}

const addItemToOrder = (menuItemId) => {
    order.push(menuArray[menuItemId]);
};

const removeItemFromOrder = (menuItemId) => {
    for (const i in order) {
        if (order[i].id == menuItemId) {
            order.splice(i, 1);
            return;
        }
    }
};

// Rendering

const renderMain = () => {
    main.innerHTML = getMenuHtml(menuArray);
};

const renderCheckout = () => {
    if (!order[0]) checkout.style.display = 'none'
    else {
        checkout.style.display = 'flex'
        checkout.innerHTML = getCheckoutHtml();
    }
}

renderMain();
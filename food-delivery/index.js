import { menuArray } from "./data.js";

const main = document.getElementsByTagName('main')[0];

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
                        <h4 class="price">$${price}</h4>
                    </div>
                    <button class="add" data-id="${id}">+</button>
                </section>
                `
    return html;
};

const render = () => {
    main.innerHTML = getMenuHtml(menuArray);
};

render();
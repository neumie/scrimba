const colorsDiv = document.getElementById('colors');
const submitBtn = document.getElementById('submit-btn');
const hexSelector = document.getElementById('hex-selector');
const modeSelector = document.getElementById('mode-selector');

const renderColors = (colors) => {
    colorsDiv.innerHTML = '';
    for (let i = 0; i < colors.length; i++) {
        console.log('here')
        colorsDiv.innerHTML +=   `
                                <div class="color" style="background-color:${colors[i].hex.value}"></div>
                                `
    }
};

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const hex = hexSelector.value.substring(1);
    const mode = modeSelector.value.toLowerCase();

    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`)
        .then(res => res.json())
        .then(data => renderColors(data.colors));
});
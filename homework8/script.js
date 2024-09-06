const inputField = document.getElementById('inputField');
const spanContainer = document.getElementById('spanContainer');

inputField.addEventListener('focus', () => {
    inputField.style.borderColor = 'green';
});

inputField.addEventListener('blur', () => {
    inputField.classList.remove('green-border');

    const inputValue = parseInt(inputField.value);

    if (inputValue >= 0) {
        createPriceSpan(inputValue);
        inputField.style.borderColor = 'black';
    }
    else {
        createErrorMessageSpan(inputValue);
        inputField.style.borderColor = 'red';
    }
});

function createPriceSpan(value) {
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `Current price: ${value}`;
    priceSpan.classList.add('price');

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'X';

    cancelButton.addEventListener('click', () => {
        clearSpanContainer();
        inputField.value = '';
    });

    priceSpan.appendChild(cancelButton);

    addToSpanContainer(priceSpan);
}

function createErrorMessageSpan() {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error');

    errorSpan.textContent = 'Please enter correct price';
    errorSpan.style.color = 'red';

    addToSpanContainer(errorSpan);
}

function addToSpanContainer(element) {
    clearSpanContainer();

    spanContainer.appendChild(element);
}

function clearSpanContainer() {
    while (spanContainer.firstChild) {
        spanContainer.removeChild(spanContainer.firstChild);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    initialTable();
    document.body.addEventListener('click', onBodyClick);
})

function initialTable() {

    const field = document.getElementById('mainField');

    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');

    table.appendChild(tableBody);

    for (let i = 0; i < 30; i++) {

        let trElement = document.createElement('tr');

        for (let j = 0; j < 30; j++) {

            let tdElement = document.createElement('td');
            tdElement.setAttribute('id', `row-${i} col-${j}`);
            tdElement.style.backgroundColor = 'white';
            trElement.appendChild(tdElement);
        }

        tableBody.appendChild(trElement);
    }

    table.addEventListener('click', onTableClick);

    field.appendChild(table);
}

function onTableClick() {
    let selectedCell = event.target;
    event.stopPropagation();

    if (selectedCell.tagName === 'TD')
    {
        console.log(`clicked on ${selectedCell.id}`);

        if (selectedCell.classList.contains('invert-color')) {
            selectedCell.classList.remove('invert-color');
        }
        else {
            selectedCell.classList.add('invert-color');
        }
    }
}

function onBodyClick() {
    const bodyElement = document.body;

    if (bodyElement.classList.contains('invert-color')) {
        bodyElement.classList.remove('invert-color');
    }
    else {
        bodyElement.classList.add('invert-color');
    }
}
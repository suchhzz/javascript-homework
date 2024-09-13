'use strict'

let playground;
let playerTank;

let enemyMoveDelay = 200;

document.addEventListener('DOMContentLoaded', function() {
    initializePlayground();

    playground = new Playground();

    playerTank = new Tank(0, 20, 25, 'D', 'player-cell');

    let enemyTank1 = new Tank(1, 40, 20, 'S', 'enemy-cell');
    let enemyTank2 = new Tank(2, 40, 40, 'S', 'enemy-cell');
    let enemyTank3 = new Tank(3, 30, 43, 'S', 'enemy-cell');
    let enemyTank4 = new Tank(4, 33, 28, 'S', 'enemy-cell');
    let enemyTank5 = new Tank(5, 40, 30, 'S', 'enemy-cell');
    let enemyTank6 = new Tank(6, 30, 5, 'S', 'enemy-cell');
    let enemyTank7 = new Tank(7, 10, 45, 'S', 'enemy-cell');
    let enemyTank8 = new Tank(8, 10, 5, 'S', 'enemy-cell');

    playground.addPlayer(playerTank);
    playground.addEnemy(enemyTank1);
    playground.addEnemy(enemyTank2);
    playground.addEnemy(enemyTank3);
    playground.addEnemy(enemyTank4);
    playground.addEnemy(enemyTank5);
    playground.addEnemy(enemyTank6);
    playground.addEnemy(enemyTank7);
    playground.addEnemy(enemyTank8);

    playground.setTankPosition(playerTank);
    playground.setTankPosition(enemyTank1);
    playground.setTankPosition(enemyTank2);
    playground.setTankPosition(enemyTank3);
    playground.setTankPosition(enemyTank4);
    playground.setTankPosition(enemyTank5);
    playground.setTankPosition(enemyTank6);
    playground.setTankPosition(enemyTank7);
    playground.setTankPosition(enemyTank8);

    let enemyInterval1 = setInterval(function () {enemyPlay(enemyTank1, enemyInterval1)}, enemyMoveDelay);
    let enemyInterval2 = setInterval(function () {enemyPlay(enemyTank2, enemyInterval2)}, enemyMoveDelay);
    let enemyInterval3 = setInterval(function () {enemyPlay(enemyTank3, enemyInterval3)}, enemyMoveDelay);
    let enemyInterval4 = setInterval(function () {enemyPlay(enemyTank4, enemyInterval4)}, enemyMoveDelay);
    let enemyInterval5 = setInterval(function () {enemyPlay(enemyTank5, enemyInterval5)}, enemyMoveDelay);
    let enemyInterval6 = setInterval(function () {enemyPlay(enemyTank6, enemyInterval6)}, enemyMoveDelay);
    let enemyInterval7 = setInterval(function () {enemyPlay(enemyTank7, enemyInterval7)}, enemyMoveDelay);
    let enemyInterval8 = setInterval(function () {enemyPlay(enemyTank8, enemyInterval8)}, enemyMoveDelay);
});

document.addEventListener('keydown', handleKeyDown);

function enemyPlay(enemyTank, intervalId) {

    if (enemyTank.isDestroyed)  {
        clearInterval(intervalId);
        return;
    }

    let enemyMove = Math.floor(Math.random() * (2 + 1));

    if (enemyMove) {
        let enemyNewDirection = Math.floor(Math.random() * (4 + 1));

        switch (enemyNewDirection) {
            case 0: 
                enemyTank.direction = 'W';
                break;
            case 1:
                enemyTank.direction = 'S';
                break;
            case 3: 
                enemyTank.direction = 'A';
                break;
            case 4:
                enemyTank.direction = 'D';
                break;
        }

        playground.playerMove(enemyTank.direction, enemyTank);
    }
    else {
        playground.playerShoot(enemyTank);
    }
}


function handleKeyDown() {

    if (playerTank.isDestroyed) {
        return;
    }

    const allowedKeys = ['w', 'a', 's', 'd', ' '];

    if (allowedKeys.includes(event.key.toLowerCase())) {


        console.log(event.key);

        switch (event.key.toLowerCase()) {
            case 'w':
                updateInterfaceDirection('W');
                playground.playerMove('W', playerTank);
                break;
            case 'a':
                updateInterfaceDirection('A');
                playground.playerMove('A', playerTank);
                break;
            case 's':
                updateInterfaceDirection('S');
                playground.playerMove('S', playerTank);
                break;
            case 'd':
                updateInterfaceDirection('D');
                playground.playerMove('D', playerTank);
                break;
            case ' ':
                playground.playerShoot(playerTank);
                break;
        }
    }
}

function initializePlayground() {
    const mainTable = document.getElementById('playground');

    const tableBody = document.createElement('tbody');

    for (let i = 0; i < 50; i++) {

        let trElement = document.createElement('tr');

        for (let j = 0; j < 50; j++) {

            let tdElement = document.createElement('td');
            tdElement.setAttribute('id', `row-${i}-col-${j}`);
            trElement.appendChild(tdElement);
        }

        tableBody.appendChild(trElement);
    }

    mainTable.appendChild(tableBody);
}

function updateInterfaceDirection(pressedKey) {
    let directionInterfaceText = document.getElementById('direction');
    directionInterfaceText.textContent = pressedKey;
}
'use strict';

class Tank {
    constructor(id, Xpos, Ypos, direction, type) {
        this.id = id;
        this.Xpos = Xpos;
        this.Ypos = Ypos;
        this.direction = direction;
        this.tankType = type;
    }

    hit() {
        this.healthPoints -= 25;
    }

    destroy() {
        this.isDestroyed = true;
    }

    id;
    Xpos;
    Ypos;
    direction;
    tankType;
    healthPoints = 100;
    isDestroyed = false;
}

class Wall {

    constructor(Xpos, Ypos) {
        this.Xpos = Xpos;
        this.Ypos = Ypos;
    }
    Xpos;
    Ypos;
}

class Playground {

    playerTank;
    playgroundTanksArray = [];
    walls = [];

    constructor() {
        this.initialWalls();
    }

    initialWalls() {

        this.createWalls();

        this.walls.forEach(wall => {
            document.getElementById(`row-${wall.Ypos}-col-${wall.Xpos}`).classList.add('wall-cell');
        });
    }

    createWalls() {
        for (let i = 10; i < 40; i++) {
            this.walls.push(new Wall(25, i));
        }

        for (let i = 10; i < 40; i++) {
            this.walls.push(new Wall(i, 40));
        }

        for (let i = 10; i < 40; i++) {
            this.walls.push(new Wall(i, 10));
        }

        for (let i = 0; i < 10; i++) {
            this.walls.push(new Wall(i, 25));
        }
        
        for (let i = 40; i < 50; i++) {
            this.walls.push(new Wall(i, 25));
        }
    }

    addPlayer(playerTank) {
        this.playerTank = playerTank;
        this.playgroundTanksArray.push(playerTank);
    }

    addEnemy(enemyTank) {
        this.playgroundTanksArray.push(enemyTank);
    }

    tankMove(direction, tank) {

        tank.direction = direction;

        this.cleanTankPosition(tank);

        switch (tank.direction) {
            case 'W':
                if (this.checkBorder(tank, tank.Xpos, tank.Ypos - 2) && this.checkWallBorder(tank.Xpos, tank.Ypos - 1)) {
                    tank.Ypos--;
                }
                break;
            case 'S':
                if (this.checkBorder(tank, tank.Xpos, tank.Ypos + 2) && this.checkWallBorder(tank.Xpos, tank.Ypos + 1)) {
                    tank.Ypos++;
                }
                break;
            case 'A':
                if (this.checkBorder(tank, tank.Xpos - 2, tank.Ypos) && this.checkWallBorder(tank.Xpos - 1, tank.Ypos)) {
                    tank.Xpos--;
                }
                break;
            case 'D':
                if (this.checkBorder(tank, tank.Xpos + 2, tank.Ypos) && this.checkWallBorder(tank.Xpos + 1, tank.Ypos)) {
                    tank.Xpos++;
                }
                break;
        }

        this.setTankPosition(tank);
    }

    tankShoot(tank) {

        let shootInterval = 50;
        let shootXpos = tank.Xpos;
        let shootYpos = tank.Ypos;
        let shootDirection = tank.direction;

        let previousShootXPos = -1;
        let previousShootYPos = -1;

        const intervalId = setInterval(() => {

            if (previousShootXPos !== -1 || previousShootYPos !== -1) {

                let previousCell = document.getElementById(`row-${previousShootYPos}-col-${previousShootXPos}`);

                previousCell.classList.remove('shoot-cell');
            }

            switch (shootDirection) {
                case 'W':
                    shootYpos--;
                    break;
                case 'A':
                    shootXpos--;
                    break;
                case 'S':
                    shootYpos++;
                    break;
                case 'D':
                    shootXpos++;
                    break;
            }

            const cell = document.getElementById(`row-${shootYpos}-col-${shootXpos}`);
        
            if (cell) {
                cell.classList.add('shoot-cell');
                previousShootXPos = shootXpos;
                previousShootYPos = shootYpos;
            }

            let hittedTank = this.checkHit(shootXpos, shootYpos, tank.tankType);

            if (hittedTank) {
                hittedTank.hit();

                if (hittedTank.id === this.playerTank.id) {
                    setPlayerHealthPoints(hittedTank.healthPoints);
                }

                if (hittedTank.healthPoints <= 0) {
                    this.destroyTank(hittedTank);
                }

                cell.classList.remove('shoot-cell');
                clearInterval(intervalId);
            }

            if (this.checkWallShoot(shootXpos, shootYpos) || shootXpos < 0 || shootXpos >= 50 || shootYpos < 0 || shootYpos >= 50) {
                clearInterval(intervalId);
            }

        }, shootInterval);
    }

    checkBorder(tank, Xpos, Ypos) {
        if (Xpos > 49 || Xpos < 0 || Ypos > 49 || Ypos < 0) {
            return false;
        }

        for (const otherTank of this.playgroundTanksArray) {

            if (otherTank === tank) {
                continue;
            }
    
            const otherTankMinX = otherTank.Xpos - 1;
            const otherTankMaxX = otherTank.Xpos + 1;
            const otherTankMinY = otherTank.Ypos - 1;
            const otherTankMaxY = otherTank.Ypos + 1;
    
            if (Xpos >= otherTankMinX && Xpos <= otherTankMaxX && 
                Ypos >= otherTankMinY && Ypos <= otherTankMaxY) {
                return false;
            }
        }

        return true;
    }

    checkWallBorder(Xpos, Ypos) {
        for (const wall of this.walls) {
            if (Xpos - 1 <= wall.Xpos && Xpos + 1 >= wall.Xpos && Ypos - 1 <= wall.Ypos && Ypos + 1 >= wall.Ypos) {
                return false;
            }
        }
        return true;
    }

    checkHit(shootXpos, shootYpos, tankType) {

        const hittedTank = this.playgroundTanksArray.find(tank => 
            tank.tankType !== tankType && 
            (shootXpos >= tank.Xpos - 1 && shootXpos <= tank.Xpos + 1) &&
            (shootYpos >= tank.Ypos - 1 && shootYpos <= tank.Ypos + 1)
        );

        return hittedTank;
    }

    checkWallShoot(shootXpos, shootYpos) {
        for (const wall of this.walls) {
            if (shootXpos === wall.Xpos && shootYpos === wall.Ypos) {
                return true;
            }
        }

        return false;
    }

    setTankPosition(tank) {
        for (let x = tank.Xpos - 1; x <= tank.Xpos + 1; x++) {
            for (let y = tank.Ypos - 1; y <= tank.Ypos + 1; y++) {
                document.getElementById(`row-${y}-col-${x}`).classList.add(tank.tankType);
            }
        }
    }
    cleanTankPosition(tank) {
        for (let y = tank.Ypos - 1; y <= tank.Ypos + 1; y++) {
            for (let x = tank.Xpos - 1; x <= tank.Xpos + 1; x++) {
                document.getElementById(`row-${y}-col-${x}`).classList.remove(tank.tankType);
            }
        }
    }

    destroyTank(destroyedTank) {
        this.playgroundTanksArray = this.playgroundTanksArray.filter(tank => tank.id !== destroyedTank.id);
        this.cleanTankPosition(destroyedTank);
        destroyedTank.destroy();
    }
}

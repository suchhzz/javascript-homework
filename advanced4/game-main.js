class Tank {
    constructor(id, Xpos, Ypos, direction, type) {
        this.id = id;
        this.Xpos = Xpos;
        this.Ypos = Ypos;
        this.direction = direction;
        this.tankType = type;
    }

    hitted() {
        this.healthPoints -= 25;
    }

    destroyed() {
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

    playground;
    playerTank;
    playgroundTanksArray = [];

    walls = [];

    constructor() {

        this.initializePlayground();
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

    initializePlayground() {
        this.playground = Array.from({ length: 50 }, () => 
            Array(50).fill(0)
        );
    }

    addPlayer(playerTank) {
        this.playerTank = playerTank;
        this.playgroundTanksArray.push(playerTank);
    }

    addEnemy(enemyTank) {
        this.playgroundTanksArray.push(enemyTank);
    }

    playerMove(direction, tank) {

        tank.direction = direction;

        this.cleanTankPosition(tank);

        switch (tank.direction) {
            case 'W':
                if (this.checkBorder(tank, tank.Xpos, tank.Ypos - 2)) {
                    tank.Ypos--;
                }
                break;
            case 'S':
                if (this.checkBorder(tank, tank.Xpos, tank.Ypos + 2)) {
                    tank.Ypos++;
                }
                break;
            case 'A':
                if (this.checkBorder(tank, tank.Xpos - 2, tank.Ypos)) {
                    tank.Xpos--;
                }
                break;
            case 'D':
                if (this.checkBorder(tank, tank.Xpos + 2, tank.Ypos)) {
                    tank.Xpos++;
                }
                break;
        }

        this.setTankPosition(tank);
    }

    checkBorder(tank, xPos, yPos) {
        if (xPos > 49 || xPos < 0 || yPos > 49 || yPos < 0) {
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
    
            if (xPos >= otherTankMinX && xPos <= otherTankMaxX && 
                yPos >= otherTankMinY && yPos <= otherTankMaxY) {
                return false;
            }
        }

        for (const wall of this.walls) {
            if (xPos === wall.Xpos && yPos === wall.Ypos) {
                return false;
            }
        }
        return true;
    }

    playerShoot(tank) {

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
                hittedTank.hitted();

                if (hittedTank.id === this.playerTank.id) {
                    setPlayerHealthPoints(hittedTank.healthPoints);
                }
    
                console.log(`tank id ${hittedTank.id} hp: ${hittedTank.healthPoints}`);

                if (hittedTank.healthPoints <= 0) {
                    this.destroyTank(hittedTank);
                }

                cell.classList.remove('shoot-cell');
                clearInterval(intervalId);
            }

            if (this.checkWall(shootXpos, shootYpos) || shootXpos < 0 || shootXpos >= 50 || shootYpos < 0 || shootYpos >= 50) {
                clearInterval(intervalId);
            }

        }, shootInterval);
    }

    checkHit(shootXpos, shootYpos, tankType) {

        const hittedTank = this.playgroundTanksArray.find(tank => 
            tank.tankType !== tankType && 
            (shootXpos >= tank.Xpos - 1 && shootXpos <= tank.Xpos + 1) &&
            (shootYpos >= tank.Ypos - 1 && shootYpos <= tank.Ypos + 1)
        );

        return hittedTank;
    }

    checkWall(shootXpos, shootYpos) {
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
        destroyedTank.destroyed();
    }
}

function setPlayerHealthPoints(healthpoints) {
    document.getElementById(`healthPoints`).textContent = healthpoints;
}
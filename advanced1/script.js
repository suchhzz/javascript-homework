"use strict";

function Hamburger(size, stuffing) { 

    this.availableSizes = [Hamburger.SIZE_SMALL, Hamburger.SIZE_LARGE];
    this.availableStuffings = [Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_SALAD, Hamburger.STUFFING_POTATO];
    this.availableToppings = [Hamburger.TOPPING_SPICE, Hamburger.TOPPING_MAYO];

    if (!size) {
        throw new Error('size is required');
    }
    if (!stuffing) {
        throw new Error('stuffing is required');
    }

    if (!this.checkInputCorrect(size, this.availableSizes)) {
        throw new Error (`invalid size ${size}`);
    }

    if (!this.checkInputCorrect(stuffing, this.availableStuffings)) {
        throw new Error (`invalid stuffing ${stuffing}`);
    }

    this.size = size;
    this.stuffings = [stuffing];
    this.toppings = [];

}

Hamburger.SIZE_SMALL = 'SMALL';
Hamburger.SIZE_BIG = 'BIG';

Hamburger.STUFFING_CHEESE = 'CHEESE';
Hamburger.STUFFING_SALAD = 'SALAD';
Hamburger.STUFFING_POTATO = 'POTATO';

Hamburger.TOPPING_SPICE = 'SPICE';
Hamburger.TOPPING_MAYO = 'MAYO';

Hamburger.prototype.calculatePrice = function() {
    var price = this.calculateSizePrice() + this.calculateStuffingPrice() + this.calculateToppingPrice();
    return price;
};

Hamburger.prototype.calculateCalories = function() {
    var calories = this.calculateSizeCalorie() + this.calculateStuffingCalorie() + this.calculateToppingCalorie();
    return calories;
};

Hamburger.prototype.getToppings = function() {
    return this.toppings;
};

Hamburger.prototype.getStuffings = function() {
    return this.stuffings;
};

Hamburger.prototype.getSize = function() {
    return this.size;
};

Hamburger.prototype.addTopping = function(topping) {
    if (this.toppings.indexOf(topping) !== -1) {
        throw new Error('topping has already been added');
    }

    if (!this.checkInputCorrect(topping, this.availableToppings)) {
        throw new Error (`invalid topping ${topping}`);
    }

    this.toppings.push(topping);
};

Hamburger.prototype.removeTopping = function(topping) {
    var index = this.toppings.indexOf(topping);
    if (index === -1) {
        throw new Error('topping was not found');
    }
    
    if (!this.checkInputCorrect(topping, this.availableToppings)) {
        throw new Error (`invalid topping ${topping}`);
    }

    this.toppings.splice(index, 1);
};

Hamburger.prototype.addStuffing = function(stuffing) {
    if (this.stuffings.indexOf(stuffing) !== -1) {
        throw new Error('stuffing has already been added');
    }
    
    if (!this.checkInputCorrect(stuffing, this.availableStuffings)) {
        throw new Error (`invalid stuffing ${stuffing}`);
    }

    this.stuffings.push(stuffing);
};

Hamburger.prototype.removeStuffing = function(stuffing) {
    var index = this.stuffings.indexOf(stuffing);
    if (index === -1) {
        throw new Error('stuffing was not found');
    }

    if (!this.checkInputCorrect(stuffing, this.availableStuffings)) {
        throw new Error (`invalid stuffing ${stuffing}`);
    }

    this.stuffings.splice(index, 1);
};


Hamburger.prototype.calculateSizePrice = function() {
    switch (this.size) {
        case Hamburger.SIZE_SMALL:
            return 50;
        case Hamburger.SIZE_BIG:
            return 100;
        default:
            throw new Error('incorrect size value');
    }
};

Hamburger.prototype.calculateSizeCalorie = function() {
    switch (this.size) {
        case Hamburger.SIZE_SMALL:
            return 20;
        case Hamburger.SIZE_BIG:
            return 40;
        default:
            throw new Error('incorrect size value');
    }
};

Hamburger.prototype.calculateStuffingPrice = function() {
    var stuffingPrice = 0;
    for (var i = 0; i < this.stuffings.length; i++) {
        stuffingPrice += this.getStuffingPrice(this.stuffings[i]);
    }
    return stuffingPrice;
};

Hamburger.prototype.calculateToppingPrice = function() {
    var toppingPrice = 0;
    for (var i = 0; i < this.toppings.length; i++) {
        toppingPrice += this.getToppingPrice(this.toppings[i]);
    }
    return toppingPrice;
};

Hamburger.prototype.getStuffingPrice = function(stuffing) {
    switch (stuffing) {
        case Hamburger.STUFFING_CHEESE:
            return 10;
        case Hamburger.STUFFING_SALAD:
            return 20;
        case Hamburger.STUFFING_POTATO:
            return 15;
        default:
            throw new Error('stuffing value error');
    }
};

Hamburger.prototype.getToppingPrice = function(topping) {
    switch (topping) {
        case Hamburger.TOPPING_SPICE:
            return 15;
        case Hamburger.TOPPING_MAYO:
            return 20;
        default:
            throw new Error('topping value error');
    }
};

Hamburger.prototype.calculateStuffingCalorie = function() {
    var stuffingCalorie = 0;
    for (var i = 0; i < this.stuffings.length; i++) {
        stuffingCalorie += this.getStuffingCalorie(this.stuffings[i]);
    }
    return stuffingCalorie;
};

Hamburger.prototype.calculateToppingCalorie = function() {
    var toppingCalorie = 0;
    for (var i = 0; i < this.toppings.length; i++) {
        toppingCalorie += this.getToppingCalorie(this.toppings[i]);
    }
    return toppingCalorie;
};

Hamburger.prototype.getStuffingCalorie = function(stuffing) {
    switch (stuffing) {
        case Hamburger.STUFFING_CHEESE:
            return 20;
        case Hamburger.STUFFING_SALAD:
            return 5;
        case Hamburger.STUFFING_POTATO:
            return 10;
        default:
            throw new Error('stuffing value error');
    }
};

Hamburger.prototype.getToppingCalorie = function(topping) {
    switch (topping) {
        case Hamburger.TOPPING_SPICE:
            return 0;
        case Hamburger.TOPPING_MAYO:
            return 5;
        default:
            throw new Error('topping value error');
    }
};

Hamburger.prototype.checkInputCorrect = function(input, array) {
    return array.includes(input);
}

// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит? 
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер? 
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length); // 1

// не передали обязательные параметры
var h2 = new Hamburger(); // => HamburgerException: no size given
   
// передаем некорректные значения, добавку вместо размера
var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE); 
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_MAYO); 
// HamburgerException: duplicate topping 'TOPPING_MAYO'

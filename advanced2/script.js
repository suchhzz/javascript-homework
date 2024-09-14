"use strict";

class Hamburger {
    static SIZE_SMALL = 'SMALL';
    static SIZE_BIG = 'BIG';

    static STUFFING_CHEESE = 'CHEESE';
    static STUFFING_SALAD = 'SALAD';
    static STUFFING_POTATO = 'POTATO';

    static TOPPING_SPICE = 'SPICE';
    static TOPPING_MAYO = 'MAYO';

    #toppings = [];
    #stuffings = [];
    #size;

    #availableSizes = [Hamburger.SIZE_SMALL, Hamburger.SIZE_BIG];
    #availableStuffings = [Hamburger.STUFFING_CHEESE, Hamburger.STUFFING_SALAD, Hamburger.STUFFING_POTATO];
    #availableToppings = [Hamburger.TOPPING_MAYO, Hamburger.TOPPING_SPICE];

    constructor(size, stuffing) {

        if (!size) {
            throw new Error ('no size given');
        }
        if (!stuffing) {
            throw new Error ('no stuffing given');
        }

        if (!this.#checkInputCorrect(size, this.#availableSizes)) {
            throw new Error (`incorrect size ${size}`);
        }
        if (!this.#checkInputCorrect(stuffing, this.#availableStuffings)) {
            throw new Error (`incorrect stuffing ${stuffing}`);
        }

        this.#size = size;

        this.#stuffings.push(stuffing);
    }
    
    calculatePrice() {
        let price = 0;

        price += this.#calculateSizePrice();
        price += this.#calculateStuffingPrice();
        price += this.#calculateToppingPrice();

        return price;
    }

    calculateCalories() {
        let calorie = 0;

        calorie += this.#calculateSizeCalorie();
        calorie += this.#calculateStuffingCalorie();
        calorie += this.#calculateToppingCalorie();

        return calorie;
    }

    getToppings() {
        return this.#toppings;
    }

    getStuffings() {
        return this.#stuffings;
    }

    getSize() {
        return this.#size;
    }

    addTopping(topping) {
        if (this.#toppings.find(t => t === topping)) {

            throw new Error('topping has already been added');
        }

        if (!this.#checkInputCorrect(topping, this.#availableToppings)) {
            throw new Error (`incorrect topping ${topping}`);
        }

        this.#toppings.push(topping);
    }

    removeTopping(topping) {
        if (!this.#toppings.find(t => t === topping)) {

            throw new Error('topping was not found');
        }

        if (!this.#checkInputCorrect(topping, this.#availableToppings)) {
            throw new Error (`incorrect topping ${topping}`);
        }

        this.#toppings = this.#toppings.filter(t => t !== topping);
    }

    addStuffing(stuffing) {
        if (this.#stuffings.find(s => s === stuffings)) {

            throw new Error('stuffing has already been added');
        }

        if (!this.#checkInputCorrect(stuffing, this.#availableStuffings)) {
            throw new Error (`incorrect stuffing ${stuffing}`);
        }

        this.#stuffings.push(stuffing);
    }

    removeStuffing(stuffing) {
        if (!this.#stuffings.find(s => s === stuffing)) {

            throw new Error('stuffing was not found');
        }

        if (!this.#checkInputCorrect(stuffing, this.#availableStuffings)) {
            throw new Error (`incorrect stuffing ${stuffing}`);
        }

        this.#stuffings = this.#stuffings.filter(s => s !== stuffing);
    }

    #calculateSizePrice() {

        switch (this.#size) {
            case Hamburger.SIZE_SMALL:
                return 50;
            case Hamburger.SIZE_BIG:
                return 100;
            default:
                throw new Error('incorrect size value');
        }
    }

    #calculateSizeCalorie() {
        switch (this.#size) {
            case Hamburger.SIZE_SMALL:
                return 20;
            case Hamburger.SIZE_BIG:
                return 40;
            default:
                throw new Error('incorrect size value');
        }
    }

    #calculateStuffingPrice() {
        let stuffingPrice = 0;

        for (let i = 0; i < this.#stuffings.length; i++) {
            stuffingPrice += this.#getStuffingPrice(this.#stuffings[i]);
        }

        return stuffingPrice;
    }

    #calculateToppingPrice() {
        let toppingPrice = 0;

        for (let i = 0; i < this.#toppings.length; i++) {
            toppingPrice += this.#getToppingPrice(this.#toppings[i]);
        }

        return toppingPrice;
    }

    #getStuffingPrice(stuffing) {

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
    }

    #getToppingPrice(topping) {
        switch (topping) {
            case Hamburger.TOPPING_SPICE:
                return 15;
            case Hamburger.TOPPING_MAYO:
                return 20;
            default: 
            throw new Error('topping value error');
        }
    }

    #calculateStuffingCalorie() {
        let stuffingCalorie = 0;

        for (let i = 0; i < this.#stuffings.length; i++) {
            stuffingCalorie += this.#getStuffingCalorie(this.#stuffings[i]);
        }

        return stuffingCalorie;
    }

    #calculateToppingCalorie() {
        let toppingCalorie = 0;

        for (let i = 0; i < this.#toppings.length; i++) {
            toppingCalorie += this.#getToppingCalorie(this.#toppings[i]);
        }

        return toppingCalorie;
    }

    #getStuffingCalorie(stuffing) {
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
    }

    #getToppingCalorie(topping) {
        switch (topping) {
            case Hamburger.TOPPING_SPICE:
                return 0;
            case Hamburger.TOPPING_MAYO:
                return 5;
            default: 
            throw new Error('topping value error');
        }
    }

    #checkInputCorrect(input, array) {
        return array.find(i => i == input);
    }
}

   // маленький гамбургер с начинкой из сыра
let hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
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
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

    constructor(size, stuffing) {
        this.#size = size;

        stuffing.push(stuffing);
    }
    
    getPrice() {
        let price = 0;

        price += this.#calculateSizePrice();
        price += this.#calculateStuffingPrice();
        price += this.#calculateToppingPrice();

        return price;
    }

    getCalorie() {
        let calorie = 0;

        calorie += this.#calculateSizeCalorie();
        calorie += this.#calculateStuffingCalorie();
        calorie += this.#calculateToppingCalorie();

        return calorie;
    }

    #calculateSizePrice() {

        switch (this.#size) {
            case 'SMALL':
                return 50;
            case 'BIG':
                return 100;
            default:
                throw new Error('incorrect size value');
        }
    }

    #calculateSizeCalorie() {
        switch (this.#size) {
            case 'SMALL':
                return 20;
            case 'BIG':
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
            case 'CHEESE':
                return 10;
            case 'SALAD':
                return 20;
            case 'POTATO':
                return 15;
            default:
                throw new Error('stuffing value error');
        }
    }

    #getToppingPrice(topping) {
        switch (topping) {
            case 'SPICE':
                return 15;
            case 'MAYO':
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
            case 'CHEESE':
                return 20;
            case 'SALAD':
                return 5;
            case 'POTATO':
                return 10;
            default:
                throw new Error('stuffing value error');
        }
    }

    #getToppingCalorie(topping) {
        switch (topping) {
            case 'SPICE':
                return 0;
            case 'MAYO':
                return 5;
            default: 
            throw new Error('topping value error');
        }
    }
}

let hamburger = new Hamburger();


const rxjs = require('rxjs')
const { map, reduce } = require('rxjs/operators');
const { from } = rxjs;

priceCalculator = (items) => {

    let price = 0;

    from(items).pipe(

        map(item => item[0]),

        map(item => {
            let { unitPrice: price, quantity: qty, discount } = item;
            return ((price * qty) - (discount * qty));
        }),

        reduce((a, b) => a + b)

    ).subscribe(p => price = p);

    return price;

}


class ShoppingCart {

    items = new Map();

    constructor() {
        let id = 0;
    }

    getCustomerId = () => {
        return this.customerId;
    }

    getId = () => {
        return id;
    }

    isEmpty = () => {

        return this.items.size <= 0
    }

    removeItem = (item) => {

        if (!this.items.isEmpty()) {
            this.items.delete(item);
        }

        return this.items;
    }

    changeQuantity = (item, qty) => {

        let init = this.items.get(item);

        if (init == 1) this.items.delete(item);

        if (inti > 0) this.items.set(item, init - qty);

        return this.items;
    }

    //add single item
    addItem = (item) => {

        let initValue = this.cart.items.get(item);

        if (initValue > 0) {
            this.cart.items.set(item, initValue + 1)
        }
        else {
            this.cart.items.set(item, 1);
        }
        return this;
    }


    //add multiple items
    addItem = (item, qty) => {

        if (qty != 0) {

            let initValue = this.cart.items.get(item);

            if (initValue > 0) {
                this.cart.items.set(item, initValue + qty)
            }
            else {
                this.cart.items.set(item, qty);
            }
        }

        return this;
    }


    getTotalPrice = () => {
        return priceCalculator(this.items);
    }


    /**
     * ---------------------------------------------
     * Builder class for Shopping Cart
     */

    static CartBuilder = class {

        cart = new ShoppingCart();

        setCustomerId(id) {
            this.cart.customerId = id;
            return this;
        }

        setId(id) {
            this.cart.id = id;
            return this;
        }

        //add single item
        addItem(item) {

            let initValue = this.cart.items.get(item);

            if (initValue > 0) {
                this.cart.items.set(item, initValue + 1)
            }
            else {
                this.cart.items.set(item, 1);
            }
            console.log("cart: " + this.cart);

            return this;
        }


        //add multiple items
        addItem(item, qty) {

            if (qty != 0) {

                let initValue = this.cart.items.get(item);

                if (initValue > 0) {
                    this.cart.items.set(item, initValue + qty)
                }
                else {
                    this.cart.items.set(item, qty);
                }
            }

            return this;
        }

        build() {

            return this.cart;
        }

    }
}

module.exports = { ShoppingCart }
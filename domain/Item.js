class Item {

    constructor() {
        let name
        let id
        let unitPrice
        let discount
    }

    getId = () => {
        return this.id;
    }

    getName = () => {
        return this.name;
    }

    getPrice = () => {
        return this.unitPrice;
    }

    getDiscount = () => {
        return this.discount;
    }


    /**
     * Builder for Item
     */

    static ItemBuilder = class {

        constructor() {
            this.item = new Item();
        }

        setId(id) {
            this.item.id = id;
            return this;
        }

        setName(name) {
            this.item.name = name;
            return this;
        }

        setUnitPrice(price) {
            this.item.unitPrice = price;
            return this;
        }

        setDiscount(discount) {
            this.item.discount = discount;
            return this;
        }

        build() {
            return this.item;
        }
    }


}


module.exports = { Item }



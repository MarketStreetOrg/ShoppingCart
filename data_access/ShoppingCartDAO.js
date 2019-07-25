const { GenericDAO } = require("./GenericDAO");
const mongoose = require('mongoose')
const { from } = require('rxjs')
const { map } = require('rxjs/operators')
const env =require('dotenv')

const {parsed:config} = env.config();

class ShoppingCartDAO extends GenericDAO {

    constructor() {
        super()
        mongoose.connect(config.mongoURL, { useNewUrlParser: true })

        this.Cart = mongoose.model('Cart',
            {
                dateCreated: Date,
                dateModified: Date,
                items: []
            })
    }

    create = async (ShoppingCart) => {

        let CartModel = new this.Cart();

        let items = []

        from(ShoppingCart.items).pipe(

            map(items => {
                const [item, qty] = items
                return { item: item, quantity: qty }
            })

        ).forEach(item => {
            const { name, unitPrice, discount } = item.item;
            const quantity = item.quantity;
            items.push({ name: name, unitPrice: unitPrice, discount: discount, quantity: quantity });
        });

        CartModel.set('items', items)
        CartModel.set('dateCreated', Date.now());

        await CartModel.save().then(
            console.log("Cart has been created")
        );

    }

    remove = (id) => {
        this.Cart.deleteOne({ _id: id })
    }

    findOne = async (id) => {
        let data = null;
        await this.Cart.findOne({ _id: id }).then(res => {
            data = res
        }).catch(console.log)
        return data;
    }

    findAll = async () => {
        let data = null;
        await this.Cart.find().then(res => {
            data = res
        })
        return data;
    }

    update = async (id, c) => {
        let data

        let items = [];

        from(c.items).pipe(
            map(item => {
                const { name, unitPrice, discount } = item[0]
                const quantity = item[1]
                return { name: name, unitPrice: unitPrice, discount: discount, quantity: quantity };
            })
        ).forEach(item => items.push(item));

        await this.Cart.updateOne({ _id: id }, {
            $set: {
                items: items,
                dateModified: Date.now()
            }
        }, { upsert: true }).then(res => {
            data = res;
        }).catch(console.error)

        return data;
    }
}

module.exports = { ShoppingCartDAO }

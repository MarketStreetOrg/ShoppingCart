const express = require('express')
const {router}=require('./router')
const {Item} = require('./domain/Item')
const { ShoppingCart } = require('./domain/ShoppingCart')

let app = express();

let item1 = new Item.ItemBuilder()
    .setName("Sugar")
    .setUnitPrice(3.5)
    .setDiscount(0.1)
    .build();

let item2 = new Item.ItemBuilder()
    .setName("salt")
    .setUnitPrice(1.5)
    .setDiscount(0.25)
    .build();

let item3 = new Item.ItemBuilder()
    .setName("shoes")
    .setDiscount(1)
    .setUnitPrice(35.9)
    .build();

let cart = new ShoppingCart.CartBuilder()
    .addItem(item1, 4)
    .addItem(item2, 11)
    .addItem(item3, 5)
    .build();

console.log(cart.calculateTotalPrice())

app.set('x-powered-by',false)
app.use(router)

app.listen(8081, "localhost").on('listening', () => {

    console.log("Server is listening")

});
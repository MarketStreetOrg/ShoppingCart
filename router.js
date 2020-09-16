const express = require('express')
const cors = require('cors')

//Domain
const { ShoppingCart } = require('./domain/ShoppingCart')

//Service 
const { ShoppingCartService } = require('./services/ShoppingCartService')

//middleware
const jsonParser = express.json();

const router = express.Router();

const cartService = new ShoppingCartService();

corsOptions = {
    origin: "http://localhost:8081/",
    methods: "GET,PUT,POST"
}

router
    .all('/', cors(corsOptions), (req, res, next) => {

        cartService.findAll().then(data => {
            res.json(data)

        }).then(data => { return next(); }).catch(console.log)
    })

    .get('/cart', (req, res, next) => {

        const { id } = req.query;

        cartService.findOne(id).then(data => {

            res.json(data)

            next();
        });
    })

    .post('/cart', jsonParser, (req, res, next) => {

        let data = req.body;
        const { items, customerId } = data
        console.log(data);

        let cart = new ShoppingCart.CartBuilder();

        cart.setId(customerId);

        cart.setCustomerId(customerId);

        items.forEach(item => {
            cart.addItem(item, item.quantity)
        });

        cart.build();

        cartService.create(cart.cart).then(result => {
            res.json(result);
        });

    })

    .put('/cart', jsonParser, (req, res, next) => {

        const { id } = req.query;

        let data = req.body;
        const { items } = data

        let cart = new ShoppingCart.CartBuilder();

        items.forEach(item => {
            cart.addItem(item, item.quantity)
        });

        cartService.update(id, cart.build()).then(next());
    })

module.exports = { router }
const { GenericService } = require('./GenericService')
const { ShoppingCartDAO } = require('../data_access/ShoppingCartDAO')

class ShoppingCartService extends GenericService {

    constructor(DAO) {
        super(GenericService.prototype)
        this.dao = DAO ? DAO : new ShoppingCartDAO();
    }

    create(data) {
        this.dao.create(data);
    }

    findAll() {
        return this.dao.findAll();
    }

    findOne(id) {
        return this.dao.findOne(id);
    }

    update(id,cart) {
        return this.dao.update(id, cart)
    }

    remove(id) {
        return this.dao.remove(id);
    }

}

module.exports = { ShoppingCartService }
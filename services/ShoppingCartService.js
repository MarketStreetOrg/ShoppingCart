const { GenericService } = require('./GenericService')
const { ShoppingCartDAO } = require('../data_access/ShoppingCartDAO')

class ShoppingCartService extends GenericService {

    constructor(DAO) {
        super(GenericService.prototype)
        this.dao = DAO ? DAO : new ShoppingCartDAO();
    }

    async create(data) {
        return this.dao.create(data);
    }

    async findAll() {
        return this.dao.findAll();
    }

    async findOne(id) {
        return this.dao.findOne(id);
    }

    async update(id,cart) {
        return this.dao.update(id, cart)
    }

    async remove(id) {
        return this.dao.remove(id);
    }

}

module.exports = { ShoppingCartService }
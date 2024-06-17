const { BaseController } = require('./BaseController');

class CarsController extends BaseController {
    constructor() {
        super()
        this.API_CARS = '/cars'
        this.API_CARS_ID = '/cars/{id}'
        this.API_CARS_BRANDS = '/cars/brands'
        this.API_CARS_MODELS = '/cars/models'
    }

    async getCars() {
        return this.get(this.API_CARS)
    }

    async getBrands() {
        return this.get(this.API_CARS_BRANDS)
    }

    async getModels() {
        return this.get(this.API_CARS_MODELS)
    }

    async createCar(carBrandId, carModelId, mileage) {
        return this.post(this.API_CARS, {
            carBrandId,
            carModelId,
            mileage,
        })
    }

    async deleteCarById(id) {
        return this.delete(this.API_CARS_ID.replace('{id}', id))
    }
}

module.exports.CarsController = CarsController
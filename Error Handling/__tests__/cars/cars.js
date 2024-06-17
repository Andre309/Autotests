const { CarsController } = require('../../src/controllers/CarsController');

const carsController = new CarsController()

describe('Check Cars API', () => {
    beforeAll(async () => {
        await carsController.login()
    })

    afterAll(async () => {
        const carsResponse = await carsController.getCars()
        const carIds = carsResponse.data.data.map((c) => c.id)
        for (const carId of carIds) {
            const res = await carsController.deleteCarById(carId)
        }
    })

    test('User can get all cars', async () => {
        const carsResponse = await carsController.getCars()
        expect(carsResponse.status).toBe(200)
    })

    test('User can create a new car', async () => {
        let carsResponse = await carsController.getCars()
        const carList = [...carsResponse.data.data]
        const newCarResponse = await carsController.createCar(1, 1, 1020)
        carsResponse = await carsController.getCars()
        const newCarList = carsResponse.data.data
        expect(newCarList.length).toBe(carList.length + 1)
        expect(
            newCarList.find((car) => car.id === newCarResponse.data.data.id)
        ).toBeDefined()
    })
})
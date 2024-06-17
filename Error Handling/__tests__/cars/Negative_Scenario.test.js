const { CarsController } = require('../../src/controllers/CarsController');

const carsController = new CarsController();

jest.setTimeout(30000);

describe('Check Cars API - Negative Scenarios', () => {
    beforeAll(async () => {
        await carsController.login();
    });

    afterAll(async () => {
        const carsResponse = await carsController.getCars()
        const carIds = carsResponse.data.data.map((c) => c.id)
        for (const carId of carIds) {
            const res = await carsController.deleteCarById(carId)
        }
    });

    test('Attempt to create a car with a non-existent carBrandId', async () => {
        const carBrandId = 'fd'; // невалідний carBrandId
        const carModelId = 1; // валідний carModelId
        const mileage = 1020;

        const response = await carsController.createCar(carBrandId, carModelId, mileage);

        expect(response.status).toBe(400);
        expect(response.data.message).toBeDefined();
    });

    test('Attempt to create a car with a non-existent carModelId', async () => {
        const carBrandId = 1; // валідний carBrandId
        const carModelId = 99; // неіснуючий carModelId
        const mileage = 1020; //валідний кілометраж

        const response = await carsController.createCar(carBrandId, carModelId, mileage);

        expect(response.status).toBe(404);
        expect(response.data.message).toBeDefined();
    });

    test('Attempt to create a car with invalid mileage', async () => {
        const carBrandId = 1; // валідний carBrandId
        const carModelId = 1; // валідний carModelId
        const mileage = -100; // невалідний кілометраж

        const response = await carsController.createCar(carBrandId, carModelId, mileage);

        expect(response.status).toBe(400);
        expect(response.data.message).toBeDefined();
    });
});

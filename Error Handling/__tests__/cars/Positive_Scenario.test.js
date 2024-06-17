const { CarsController } = require('../../src/controllers/CarsController');

const carsController = new CarsController();

// Збільшення таймауту для всіх тестів у файлі
jest.setTimeout(30000);

describe('Check Cars API', () => {
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

    test('User can get all cars', async () => {
        const carsResponse = await carsController.getCars();
        expect(carsResponse.status).toBe(200);
    });

    test('User can create cars for all brands and models', async () => {
        // Get all car brands
        const brandsResponse = await carsController.getBrands();
        expect(brandsResponse.status).toBe(200);
        const brands = brandsResponse.data.data;

        // Get all car models
        const modelsResponse = await carsController.getModels();
        expect(modelsResponse.status).toBe(200);
        const models = modelsResponse.data.data;

        // Get initial car list
        let carsResponse = await carsController.getCars();
        const initialCarList = carsResponse.data.data;
        const initialCarCount = initialCarList.length;
        console.log(`Initial car list:`, initialCarList);

        const newCarResponses = [];

        for (const brand of brands) {
            const brandModels = models.filter(model => model.carBrandId === brand.id);
            if (brandModels.length === 0) {
                console.warn(`Не знайдено моделі для бренду: ${brand.title} (ID: ${brand.id})`);
                continue;
            }
            for (const model of brandModels) {
                console.log(`Створено машину для бренду ${brand.title} (ID: ${brand.id}), модель ${model.title} (ID: ${model.id})`);
                const newCarResponse = await carsController.createCar(brand.id, model.id, 1020);
                console.log(`New ${brand.title} ${model.title} car response:`, newCarResponse.data);

                // Перевірка респонсу для кожної створеної машини
                expect(newCarResponse.status).toBe(201);

                newCarResponses.push(newCarResponse);
            }
        }

        // Отримати оновлений список машин
        carsResponse = await carsController.getCars();
        const updatedCarList = carsResponse.data.data;
        console.log(`Updated car list:`, updatedCarList);

        // Перевірити, чи правильно збільшилася загальна кількість автомобілів
        expect(updatedCarList.length).toBe(initialCarCount + newCarResponses.length);

        // Перевірити, чи всі новостворені автомобілі є в оновленому списку
        newCarResponses.forEach(newCarResponse => {
            expect(
                updatedCarList.find((car) => car.id === newCarResponse.data.data.id)
            ).toBeDefined();
        });
    });
});

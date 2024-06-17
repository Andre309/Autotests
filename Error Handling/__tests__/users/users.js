const { UsersController } = require('../../src/controllers/UsersController.js');

const usersController = new UsersController()

test('Get current user profile', async () => {
    await usersController.login()
    const res = await usersController.getUserProfile()
    expect(res.status).toBe(200)
    expect(res.data.data.name).toBe('Andrii')
})

test('Check users settings', async () => {});
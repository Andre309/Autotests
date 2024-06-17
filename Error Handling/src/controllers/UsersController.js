const { BaseController } = require('./BaseController');

class UsersController extends BaseController {
    constructor() {
        super()
        this.API_USERS_PROFILE = '/users/profile'
        this.API_USERS_CURRENT = '/users/current'
    }

    async getUserProfile() {
        return this.get(this.API_USERS_PROFILE)
    }

    async getCurrentUser() {
        return this.get(this.API_USERS_CURRENT)
    }
}

module.exports.UsersController = UsersController
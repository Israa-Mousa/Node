"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
        this.data = [
            { id: 1, name: 'Israa', email: 'israa@example.com', age: 30, role: 'Admin' },
            { id: 2, name: 'Mousa', email: 'mousa@example.com', age: 28, role: 'Teacher' }
        ];
    }
}
exports.UserRepository = UserRepository;

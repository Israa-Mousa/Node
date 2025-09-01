"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class CourseRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
        this.data = [
            { id: 1, title: 'Frontend Basics', description: 'Learn HTML, CSS, JS' },
            { id: 2, title: 'Backend Node.js', description: 'Express, APIs, etc' },
        ];
    }
}
exports.CourseRepository = CourseRepository;
exports.default = CourseRepository;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = require("./Repository/UserRepository");
const CourseRepository_1 = require("./Repository/CourseRepository");
const BookingRepository_1 = require("./Repository/BookingRepository");
function runTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = new UserRepository_1.UserRepository();
        const courses = new CourseRepository_1.CourseRepository();
        const bookings = new BookingRepository_1.BookingRepository();
        console.log('All Users:', yield users.getAll());
        console.log('course by ID (2):', yield courses.getById(2));
        console.log('All Course:', yield courses.getAll());
        console.log('User by ID (2):', yield users.getById(2));
        console.log('Create User:', yield users.create({
            id: 3, name: 'Nada', email: 'nada@example.com', age: 29, role: 'Teacher'
        }));
        console.log('All Courses:', yield courses.getAll());
        console.log('All Bookings:', yield bookings.getAll());
        console.log('Filter Bookings (status = true):', yield bookings.findByFilter({ status: true }));
    });
}
runTests();

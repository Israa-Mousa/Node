"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
class BookingRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
        this.data = [
            {
                id: 1,
                userId: 1,
                courseId: 2,
                bookingDate: new Date('2025-07-25'),
                status: true,
                availableSeats: 10,
                totalPrice: 120
            },
            {
                id: 2,
                userId: 2,
                courseId: 1,
                bookingDate: new Date('2025-07-20'),
                status: false,
                availableSeats: 0,
                totalPrice: 0
            }
        ];
    }
}
exports.BookingRepository = BookingRepository;

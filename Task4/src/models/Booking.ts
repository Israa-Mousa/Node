export interface Booking {
    id: number;
    userId: number; 
    courseId: number;
    bookingDate: Date; 
    status: boolean;  
    availableSeats : number;
    totalPrice: number;
  }

import { z } from 'zod';

const roomBookingSchema = z.object({
  roomType: z.string(),
  // dueDate: z.string().date(),
  dueDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  numberOfGuests: z.number().min(1).max(4),
  // price: z.number().positive(),
  price: z.number().positive().refine(value => {
    return Number.isInteger(value * 100);
  }, {
    message: "Price must have at most two decimal places",
  }),
});

// Example usage
const exampleRoomBooking = {
  roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300,
};

roomBookingSchema.parse(exampleRoomBooking); // Valid

const invalidBooking = {
  roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300.001,
};

roomBookingSchema.parse(invalidBooking); // Invalid

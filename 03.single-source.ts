// - schema will serve both runtime validation as well as compile-time
// - runtime validation
// - compile-time types
// - change the schema, the rest will adapt

import { z } from 'zod';

const roomBookingSchema = z.object({
  // roomType: z.string(), // uncomment
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

type RoomBooking = z.infer<typeof roomBookingSchema>

// Example valid booking object
const validBooking: RoomBooking = {
  // roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300,
};

// Synchronous parse for valid booking
roomBookingSchema.parse(validBooking);

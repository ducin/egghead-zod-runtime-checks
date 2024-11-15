import { z } from 'zod';

// schema - single source of truth:
// (1) compile-time TYPES
// (2) runtime validation FUNCTIONS

const roomBookingSchema = z.object({
  roomType: z.string(), 
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

// 1
type RoomBooking = z.infer<typeof roomBookingSchema>

const booking: RoomBooking = {
  // roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300,
} as any;

// 2
roomBookingSchema.parse(booking)

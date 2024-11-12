// - arrays with min, max, length (this info is LOST when inferring TS type)

import { z } from 'zod';

// Define a schema for guest details
const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

// Define the nestedRoomBookingSchema with min, max, and nonEmpty arrays
const nestedRoomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  guestDetails: z.array(guestDetailsSchema).min(1).max(4),
  guestDetailsNonempty: z.array(guestDetailsSchema).nonempty(),
});

// Infer the types of guestDetails and guestDetailsNonempty
type GuestDetails = z.infer<typeof nestedRoomBookingSchema.shape.guestDetails>;
type GuestDetailsNonempty = z.infer<typeof nestedRoomBookingSchema.shape.guestDetailsNonempty>;

// Example booking JSON object
const exampleBooking = {
  roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300,
  guestDetails: [], // This compiles, but will fail validation
  guestDetailsNonempty: [], // This should cause a TypeScript compilation error
};

// both properties obviously fail at runtime validation
nestedRoomBookingSchema.parse(exampleBooking);

// This compiles, but will fail validation
const empty_GuestDetails: GuestDetails = []
const empty_GuestDetailsNonempty: GuestDetailsNonempty = []

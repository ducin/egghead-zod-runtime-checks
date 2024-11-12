// - const c = z.object({a: z.object({b: z.string()})});
// const unWrappedC = c.shape; // returns {a: z.object({b: z.string()})}
// - array, .element

import { z } from "zod";

// Define a schema for guest details
const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

// Define a schema for a suite room booking with nested guest details
const roomBookingSchema = z.object({
  roomType: z.literal("suite"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  amenities: z.array(z.string()).optional(),
  guestDetails: z.array(guestDetailsSchema),
});

// Unwrap the schema using shape
const roomBookingShape = roomBookingSchema.shape;
const guestDetailsShape =
  roomBookingSchema.shape.guestDetails.element;
const amenitiesElementShape =
  roomBookingSchema.shape.amenities.unwrap().element;

// or get the type
type GuestDetails = z.infer<typeof roomBookingSchema.shape.guestDetails.element>;
type GuestDetails_ = z.infer<typeof roomBookingSchema>['guestDetails'][number]
  
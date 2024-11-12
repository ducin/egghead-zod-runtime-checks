// - simple primitives
// - simple `parse`, z.object
// - nesting objects
// - nesting/reusing schemas

import { z } from "zod";

// PART 1: Simple Primitives
const numberOfGuests = z.number().min(1).max(4);
const contactEmail = z.string().email();

// Example usage
numberOfGuests.parse(3); // Valid
contactEmail.parse("john.doe@example.com"); // Valid

// PART 2: Flat z.object
const roomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

// Example usage
const exampleBooking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
};

roomBookingSchema.parse(exampleBooking); // Valid

// PART 3: Nesting Objects
const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

const nestedRoomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  guestDetails: z.array(guestDetailsSchema),
});

// Example usage
const nestedExampleBooking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
  guestDetails: [
    {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
    },
    {
      name: "Jane Smith",
      age: 28,
      email: "jane.smith@example.com",
    },
  ],
};

nestedRoomBookingSchema.parse(nestedExampleBooking); // Valid

// PART 4: Extracting Nested Schema
const roomBookingSchemaWithNested = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  guestDetails: z.array(guestDetailsSchema),
});

// Example usage
roomBookingSchemaWithNested.parse(nestedExampleBooking); // Valid

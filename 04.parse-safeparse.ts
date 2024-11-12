// - parse<T> -> T | throw
// - works seamlessly with TS assertion functions
// - safeParse -> { success: boolean, data/error: ??? }

import { z } from 'zod';

// Define the roomBookingSchema
const roomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

// Example valid booking object
const validBooking = {
  roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300,
};

// Example invalid booking object
const invalidBooking = {
  roomType: 'suite',
  dueDate: 'invalid-date',
  numberOfGuests: 5,
  price: -100,
};

// Synchronous parse for valid booking
const parsedValidBooking = roomBookingSchema.parse(validBooking);
console.log('Synchronous parse successful:', parsedValidBooking);

// TypeScript assertion function
function assertRoomBookingSchemaMatched(data: unknown): asserts data is z.infer<typeof roomBookingSchema> {
  roomBookingSchema.parse(data);
}

// Example usage of the assertion function
const unknownData: unknown = validBooking;
assertRoomBookingSchemaMatched(unknownData);
console.log('Assertion function successful:', unknownData);

// Synchronous parse with invalid data
try {
  const parsedInvalidBooking = roomBookingSchema.parse(invalidBooking);
  console.log('Synchronous parse successful:', parsedInvalidBooking);
} catch (e) {
  if (e instanceof z.ZodError) {
    // console.error('Synchronous parse failed:', (e as z.ZodError).errors);
    console.error('Synchronous parse failed:', e.errors);
  }
}

// Synchronous safeParse with invalid data
const safeParsedInvalidBooking = roomBookingSchema.safeParse(invalidBooking);
if (safeParsedInvalidBooking.success) {
  console.log('Synchronous safeParse successful:', safeParsedInvalidBooking.data);
} else {
  console.error('Synchronous safeParse failed:', safeParsedInvalidBooking.error.errors);
}

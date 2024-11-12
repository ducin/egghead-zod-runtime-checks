// - z.undefined/null/void, any/unknown, never
// - z.optional(z.string()) / z.string.optional()
//   - z.optional() - no args - fails
// - same: z.nullable(z.string()) / z.string.nullable()
// - z.string().nullish()

import { z } from "zod";

// Separate variables showcasing various Zod features
const undefinedSchema = z.undefined();
const nullSchema = z.null();
const voidSchema = z.void();
const anySchema = z.any();
const unknownSchema = z.unknown();
const neverSchema = z.never();

// Example usage of separate variables
console.log(undefinedSchema.parse(undefined)); // Valid
console.log(nullSchema.parse(null)); // Valid
console.log(voidSchema.parse(undefined)); // Valid
console.log(anySchema.parse("any value")); // Valid
console.log(unknownSchema.parse("unknown value")); // Valid
// neverSchema.parse("value"); // This will cause an error

// Define the roomBookingSchema with modifications
const roomBookingSchema = z.object({
  roomType: z.string(),
  // dueDate: z.string().date(),
  dueDate: z.string().date().optional(),
  // numberOfGuests: z.number().min(1).max(4),
  numberOfGuests: z.number().min(1).max(4).nullable(),
  // price: z.number().positive(),
  price: z.number().positive().nullish(),
});

// Example valid booking object
const validBooking = {
  roomType: "suite",
  // dueDate: undefined,
  numberOfGuests: null,
  // price: null,
};

roomBookingSchema.parse(validBooking);

const invalidBooking = {
  roomType: "suite",
  dueDate: null, // FAILS
  numberOfGuests: null,
  price: null,
};

roomBookingSchema.parse(invalidBooking);

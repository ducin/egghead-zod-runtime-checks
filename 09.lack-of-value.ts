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

const roomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date().optional(),
  numberOfGuests: z.number().min(1).max(4).nullable(),
  price: z.number().positive().nullish(),
});

const booking = {
  roomType: "suite",
  dueDate: null,
  numberOfGuests: null,
  price: null,
};

roomBookingSchema.parse(booking);

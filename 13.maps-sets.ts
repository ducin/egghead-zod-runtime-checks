import { z } from "zod";

// Define a schema for guest details
const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

// Define a schema for a suite room booking with amenities as a Set and guest details as a Map
const suiteRoomBookingSchema = z.object({
  roomType: z.literal("suite"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  amenities: z
    .set(z.string(), {
      message: "All amenities must be strings",
    })
    .optional(),
  // or with `z.string().uuid()` as the key
  guestDetails: z.map(z.string(), guestDetailsSchema, {
    message:
      "Guest details must be a Map with string keys and valid guest details as values",
  }),
});

// Example usage
const exampleBooking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
  amenities: new Set(["WiFi", "Breakfast"]),
  guestDetails: new Map([
    [
      "123456789",
      {
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
      },
    ],
    [
      "987654321",
      {
        name: "Jane Smith",
        age: 28,
        email: "jane.smith@example.com",
      },
    ],
  ]),
};

try {
  suiteRoomBookingSchema.parse(exampleBooking);
} catch (e) {
  console.error("Booking validation failed:", (e as z.ZodError).errors);
}

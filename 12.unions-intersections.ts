// - z.union / .or
// - z.intersection / .and

import { z } from "zod";

// Define a schema for a single room booking
const singleRoomBookingSchema = z.object({
  roomType: z.literal("single"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(1),
  price: z.number().positive(),
});

// Define a schema for a double room booking
const doubleRoomBookingSchema = z.object({
  roomType: z.literal("double"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(2),
  price: z.number().positive(),
});

// Define a schema for a suite room booking
const suiteRoomBookingSchema = z.object({
  roomType: z.literal("suite"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  amenities: z.array(z.string()).optional(),
});

// Define a union schema for any type of room booking
const roomBookingSchema = z.union([
  singleRoomBookingSchema,
  doubleRoomBookingSchema,
  suiteRoomBookingSchema,
]);

// Define a schema for a discount
const discountSchema = z.object({
  discountCode: z.string(),
  discountAmount: z.number().positive(),
});

// Define an intersection schema for a room booking with a discount
const discountedRoomBookingSchema = z.intersection(
  roomBookingSchema,
  discountSchema
);

// Example usage
const exampleBooking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
  amenities: ["WiFi", "Breakfast"],
  discountCode: "NEWYEAR2025",
  discountAmount: 50,
};

try {
  discountedRoomBookingSchema.parse(exampleBooking);
  console.log("Booking is valid");
} catch (e) {
  console.error("Booking validation failed:", e.errors);
}

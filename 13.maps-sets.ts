import { z } from "zod";

// z.set(__)
// z.map(__, __)

const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

const roomBookingSchema = z.object({
  roomType: z.literal("suite"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  amenities: z.set(
    z.string({
      message: "every amenitie has to be a string",
    }),
    {
      message: "amenities should be a set",
    }
  ),
  guestDetails: z.map(z.string(), guestDetailsSchema),
});
type RoomBookingSchema = z.infer<typeof roomBookingSchema>;

const booking = {
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
        // age: 30,
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
  roomBookingSchema.parse(booking);
} catch (e) {
  console.error(
    "Booking validation failed:",
    (e as z.ZodError).errors
  );
}

import { z } from "zod";

const singleRoomBookingSchema = z.object({
  roomType: z.literal("single"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(1),
  price: z.number().positive(),
});

const doubleRoomBookingSchema = z.object({
  roomType: z.literal("double"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(2),
  price: z.number().positive(),
});

const suiteRoomBookingSchema = z.object({
  roomType: z.literal("suite"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  amenities: z.array(z.string()).optional(),
});

const roomBookingSchema = z.union([
  singleRoomBookingSchema,
  doubleRoomBookingSchema,
  suiteRoomBookingSchema,
]);
type RoomBookingSchema = z.infer<typeof roomBookingSchema>;

const discountSchema = z.object({
  discountCode: z.string(),
  discountAmount: z.number().positive(),
});

const discountedRoomBookingSchema = z.intersection(
  roomBookingSchema,
  discountSchema
);
type DiscountedRoomBookingSchema = z.infer<
  typeof discountedRoomBookingSchema
>;

const booking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
  amenities: ["WiFi", "Breakfast"],
  discountCode: "NEWYEAR2025",
  discountAmount: 50,
};

try {
  discountedRoomBookingSchema.parse(booking);
  console.log("Booking is valid");
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Booking validation failed:", e.errors);
  }
}

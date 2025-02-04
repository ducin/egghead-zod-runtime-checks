import { z } from "zod";

// Define a literal for a specific room type
const standardRoomLiteral = z.literal("premium");
type T1 = z.infer<typeof standardRoomLiteral>;

// Define an enum for room types
const RoomTypeEnum = z.enum([
  "standard",
  "premium",
  "childrenFriendly",
]);
type T2 = z.infer<typeof RoomTypeEnum>;

// Extract a subset of the enum
const PremiumRoomEnum = RoomTypeEnum.extract(["premium"]);
type T3 = z.infer<typeof PremiumRoomEnum>;

// Exclude a subset from the enum
const NonChildrenRoomEnum = RoomTypeEnum.exclude([
  "childrenFriendly",
]);
type T4 = z.infer<typeof NonChildrenRoomEnum>;

// Define a native enum for existing enums
enum RoomType {
  Standard = "standard",
  Premium = "premium",
  ChildrenFriendly = "childrenFriendly",
}
const NativeRoomTypeEnum = z.nativeEnum(RoomType);
type T5 = z.infer<typeof NativeRoomTypeEnum>;

const roomBookingSchema = z.object({
  roomType: NativeRoomTypeEnum,
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

const exampleBooking = {
  roomType: "premium",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
};

try {
  roomBookingSchema.parse(exampleBooking);
  console.log("Booking is valid");
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Booking validation failed:", e.errors);
  }
}

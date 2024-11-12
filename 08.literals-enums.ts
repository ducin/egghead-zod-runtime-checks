// - z.literal
// - z.enum, enum.VALUE, enum.extract, enum.exclude
// - z.nativeEnum(ENUM) - for existing enums

import { z } from "zod";

// Define a literal for a specific room type
const standardRoomLiteral = z.literal("standard");

// Define an enum for room types
const RoomTypeEnum = z.enum([
  "standard",
  "premium",
  "childrenFriendly",
]);

// Extract a subset of the enum
const PremiumRoomEnum = RoomTypeEnum.extract(["premium"]);

// Exclude a subset from the enum
const NonChildrenRoomEnum = RoomTypeEnum.exclude([
  "childrenFriendly",
]);

// Define a native enum for existing enums
enum RoomType {
  Standard = "standard",
  Premium = "premium",
  ChildrenFriendly = "childrenFriendly",
}

const NativeRoomTypeEnum = z.nativeEnum(RoomType);

// Define a schema for a room booking using the enum
const roomBookingSchema = z.object({
  roomType: RoomTypeEnum,
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

// Example usage
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
  console.error("Booking validation failed:", e.errors);
}

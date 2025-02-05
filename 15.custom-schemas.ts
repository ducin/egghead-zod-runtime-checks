import { z } from "zod";

// Pattern: One uppercase letter followed by three digits
const roomNumberPattern = /^[A-Z]\d{3}$/;

const RoomNumberSchema = z.custom<string>((roomType) => {
  return roomNumberPattern.test(roomType);
}, "Room number must be in format...");

const valid1 = "A101";
const valid2 = "B205";
const valid3 = "C999";
console.log(RoomNumberSchema.parse(valid1));
console.log(RoomNumberSchema.parse(valid2));
console.log(RoomNumberSchema.parse(valid3));

const invalid1 = "101A"; // ❌ error
const invalid2 = "A1"; // ❌ error
const invalid3 = "B2050"; // ❌ error
const invalid4 = "D2B3"; // ❌ error
RoomNumberSchema.parse(invalid1); // ❌ error
RoomNumberSchema.parse(invalid2); // ❌ error
RoomNumberSchema.parse(invalid3); // ❌ error
RoomNumberSchema.parse(invalid4); // ❌ error

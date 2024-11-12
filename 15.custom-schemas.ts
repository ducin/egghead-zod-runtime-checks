import { z } from "zod";

// Custom validation function for room numbers
const RoomNumberSchema = z.custom((roomNumber) => {
  const roomNumberPattern = /^[A-Z]\d{3}$/; // Pattern: One uppercase letter followed by three digits
  //     if (!roomNumberPattern.test(roomNumber)) {
  //         throw new Error("Room number must be in the format 'Letter + 3 Digits' (e.g., A101).");
  //     }
  //     return true; // Return true if validation passes
  // });
  return roomNumberPattern.test(roomNumber); // Return true if valid
}, "Room number must be in the format 'Letter + 3 Digits' (e.g., A101).");

// Example of valid room numbers
const valid1 = "A101"; // Valid room number
const valid2 = "B205"; // Valid room number
const valid3 = "C999"; // Valid room number

// Example of invalid room numbers
const invalid1 = "101A"; // ❌ error: Invalid format
const invalid2 = "A1"; // ❌ error: Invalid format
const invalid3 = "B2050"; // ❌ error: Invalid format
const invalid4 = "D2B3"; // ❌ error: Invalid format

// Validate the valid room numbers
console.log(RoomNumberSchema.parse(valid1)); // Output: A101
console.log(RoomNumberSchema.parse(valid2)); // Output: B205
console.log(RoomNumberSchema.parse(valid3)); // Output: C999

// Validate the invalid room numbers (will throw errors)
RoomNumberSchema.parse(invalid1); // ❌ error message will be logged
RoomNumberSchema.parse(invalid2); // ❌ error message will be logged
RoomNumberSchema.parse(invalid3); // ❌ error message will be logged
RoomNumberSchema.parse(invalid4); // ❌ error message will be logged

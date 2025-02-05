import { z } from "zod";

const array = [1, 2, 3];
const item = array[Infinity];

const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email(),
});

const nestedRoomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  guestDetails: z.array(guestDetailsSchema).min(1).max(4),
  guestDetailsNonempty: z
    .array(guestDetailsSchema)
    .nonempty(),
});

type Booking = z.infer<typeof nestedRoomBookingSchema>;

const exampleBooking: Booking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
  guestDetails: [], // This compiles, but will fail validation
  guestDetailsNonempty: [], // This should cause a TypeScript compilation error
};

nestedRoomBookingSchema.parse(exampleBooking);

// const empty_GuestDetails: GuestDetails = []
// const empty_GuestDetailsNonempty: GuestDetailsNonempty = []

import { z } from "zod";

const guestDetailsSchema = z
  .object({
    name: z.string(),
    age: z.number().min(0),
    email: z.string().email(),
  })
  .strict();

const roomBookingSchema = z
  .object({
    roomType: z.string(),
    dueDate: z.string().date(),
    numberOfGuests: z.number().min(1).max(4),
    price: z.number().positive(),
    guestDetails: z.array(guestDetailsSchema),
  })
  .strict();
type BookingSchema = z.infer<typeof roomBookingSchema>;

const booking = {
  roomType: "suite",
  dueDate: "2023-12-31",
  numberOfGuests: 3,
  price: 300,
  guestDetails: [
    {
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      unnecessaryProperty: "I shouldn't be here!",
    },
  ],
  unnecessaryProperty: "I shouldn't be here!",
};

roomBookingSchema.parse(booking);

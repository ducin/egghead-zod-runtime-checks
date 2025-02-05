import { z } from "zod";

const roomBookingSchema = z.object({
  roomType: z.literal("suite"),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  amenities: z.array(z.string()).optional(),
  guestDetails: z.array(
    z.object({
      name: z.string(),
      age: z.number().min(0),
      email: z.string().email(),
    })
  ),
});

const roomBookingShape = roomBookingSchema.shape;
const guestDetailsSchema =
  roomBookingSchema.shape.guestDetails.element;
const amenitiesElementSchema =
  roomBookingSchema.shape.amenities.unwrap().element;

type GuestDetails = z.infer<
  typeof roomBookingSchema.shape.guestDetails.element
>;
type GuestDetails_ = z.infer<
  typeof roomBookingSchema
>["guestDetails"][number];

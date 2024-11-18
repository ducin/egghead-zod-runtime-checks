import { z } from "zod";

const BookingSchema = z.object({
  roomType: z.string(),
  dueDate: z
    .string({
      message: "invalid due date",
    })
    .date("date format is wrong"),
  numberOfGuests: z
    .number()
    .min(1, "there must be at least one guest")
    .max(4, "at most 4 guests are allowed"),
  price: z.number().positive("negative price, huh?"),
});

type Booking = z.infer<typeof BookingSchema>;

const validBooking: Booking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
};

try {
  // BookingSchema.parse({ ...validBooking, numberOfGuests: 0 });
  // BookingSchema.parse({ ...validBooking, price: -100 });
  BookingSchema.parse({ ...validBooking, dueDate: "-100" });
} catch (e) {
  if (e instanceof z.ZodError) {
    for (const zodIssue of e.issues) {
      console.error(zodIssue.code);
      console.error(zodIssue.message);
      console.error(zodIssue.path);
    }
  }
}

const SPResult = BookingSchema.safeParse({
  ...validBooking,
  dueDate: "-100",
});
if (SPResult.error) {
  console.log(SPResult.error.format());
}

import { z } from 'zod';

const BookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

type Booking = z.infer<typeof BookingSchema>

const validBooking: Booking = {
  roomType: 'suite',
  dueDate: '2025-12-31',
  numberOfGuests: 3,
  price: 300,
};

const invalidBooking: Booking = {
  roomType: 'suite',
  dueDate: 'invalid-date',
  numberOfGuests: 5,
  price: -100,
};

BookingSchema.parse(validBooking)

function assertRoomBookingSchemaMatched(data: unknown):
    asserts data is Booking {
        BookingSchema.parse(data)
    }

declare const x: unknown
// BookingSchema.parse(x)
assertRoomBookingSchemaMatched(x)
x

console.log(BookingSchema.safeParse(validBooking))
console.log(BookingSchema.safeParse(invalidBooking))

const validationResult = BookingSchema.safeParse(validBooking)

if (!validationResult.success){
    validationResult.error
}

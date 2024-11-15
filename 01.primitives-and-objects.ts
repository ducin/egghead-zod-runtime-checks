import { z } from 'zod'

const numberOfGuests = z.number().min(1).max(4)
const contactEmail = z.string().email()

console.log(numberOfGuests.parse(4))
console.log(contactEmail.parse("john.doe@example.com"))

const guestDetailsSchema = z.object({
  name: z.string(),
  age: z.number().min(0),
  email: z.string().email()
})

const roomBookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
  guestDetails: z.array(guestDetailsSchema)
});

const exampleBooking = {
  roomType: "suite",
  dueDate: "2025-12-31",
  numberOfGuests: 3,
  price: 300,
  guestDetails: [{
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com"
  }],
}

console.log(roomBookingSchema.parse(exampleBooking))


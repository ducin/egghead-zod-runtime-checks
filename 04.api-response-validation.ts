import axios from 'axios'
import { z } from 'zod';

// external data sources:
// - HTTP requests, websockets
// - web storage
// - databases, etc.

const API_URL = 'https://jsonplaceholder.typicode.com'

const booking: Booking = {
    roomType: "suite",
    dueDate: "2025-12-31",
    numberOfGuests: 3,
    price: 300,
}

const BookingSchema = z.object({
  roomType: z.string(),
  dueDate: z.string().date(),
  numberOfGuests: z.number().min(1).max(4),
  price: z.number().positive(),
});

type Booking = z.infer<typeof BookingSchema>

const fetchData = async (): Promise<Booking> => {
    const response = await fetch(`${API_URL}/posts/1`)
    return response.json()
}

// fetchData()
//   .then(result => BookingSchema.parse(result))
//   .then(console.log)


const fetchData_axios = async () => {
    const response = await axios.get<Booking>(`${API_URL}/posts/1`)
    return response.data
}

fetchData_axios()
    .then(result => BookingSchema.parse(result))

const state: Booking = JSON.parse(localStorage.getItem('state')!)
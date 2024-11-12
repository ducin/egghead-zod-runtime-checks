// - ending: what are other usecases for ZOD

import axios from 'axios';
import { z } from 'zod';

const API_URL = 'https://jsonplaceholder.typicode.com'

type Booking = {
    roomType: string;
    dueDate: string;
    numberOfGuests: number;
    price: number;
}

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

const fetchData = async () => {
  const response = await fetch(`${API_URL}/posts/1`)
  return response.json() as Promise<Booking>
}

const fetchData_axios = async () => {
  const response = await axios.get<Booking>(`${API_URL}/posts/1`)
  return response.data
}

// console.log(await fetchData())
fetchData()
  .then(BookingSchema.parse)
  .then(console.log)
  // .catch((e) => console.error(`ERROR: ${e.message}`))

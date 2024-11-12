import { Convert, RoomBooking } from "./quicktype-generator";

// Convert.toRoomBooking('{  }')
// Convert.toRoomBooking('{ "age": 5 }')

const json = require('./exampleBooking.json')
const stringified = JSON.stringify(json)
const result = Convert.toRoomBooking(stringified)

console.log(result)
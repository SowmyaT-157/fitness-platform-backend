import { userDetails } from "../types/userDetails"
import { Person } from '../models/userModel'

export const newPerson = async (newUser: userDetails) => {
  const persons = Person.create(newUser)
  return newUser
}

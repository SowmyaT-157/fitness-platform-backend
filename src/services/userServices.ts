import { Users } from "../models/userModel"
import { userDetails } from "../types/userDetails"

export const newPerson = async (newUser: userDetails) => {
    console.log("enter into")
  const persons = await Users.create(newUser)
  console.log("persondaa",persons)
  return newUser
}

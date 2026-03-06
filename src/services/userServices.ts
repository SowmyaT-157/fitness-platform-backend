import { SendEmailCommand, SESClient, VerifyEmailIdentityCommand } from "@aws-sdk/client-ses";
import { Users } from "../models/userModel"
import { userDetails } from "../types/userDetails"
import bcrypt from "bcrypt"

// export const newPerson = async (newUser: userDetails) => {
//     console.log("enter into")
//   const persons = await Users.create(newUser)
//   console.log("persondaa",persons)
//   return newUser
// }


const ses = new SESClient({ region: "ap-south-1" });

export const verifyTheEmail = async (userData: userDetails) => {
  console.log("enter into the service")
  const emailAdres = await ses.send(new VerifyEmailIdentityCommand({
    EmailAddress: userData.email
  }));
  if (emailAdres) {
    console.log("send verification mail to the user")
    return emailAdres
  } else {
    console.log("didn't send the verification mail to the user")
  }
}


export const registerTheUser = async (userData: userDetails) => {
  const code = Math.floor(Math.random() * 1000).toString()
  console.log("comming the verification code", code)
  const userSignUp = await Users.create({
    name: userData.name,
    email: userData.email,
    password: await bcrypt.hash(userData.password, 15),
    isVerified: false,
    otp: code
  });

  console.log("otp is comming", userData.otp)
  console.log("in the service user coming", userSignUp)
  const sendMail = await ses.send(new SendEmailCommand({
    Source: process.env.SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [userData.email]
    },
    Message: {
      Subject: {
        Data: "It is the verification code"
      },
      Body: {
        Text: {
          Data: `It is your verification code ${code}`
        }
      }
    }
  }));
  console.log(sendMail, "comming the ses details")
  return userSignUp
}
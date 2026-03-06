import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Users } from "../models/userModel"
import 'dotenv/config'
import { registerTheUser, verifyTheEmail } from "../services/userServices";
// import { PublishCommand, SNSClient, SubscribeCommand } from "@aws-sdk/client-sns";

// export const snsClient = new SNSClient({region:"ap-south-1" })

// export const subscribeEmail = async (
//   emailAddress : string,
// ) => {
//   const response = await snsClient.send(
//     new SubscribeCommand({
//       Protocol: "email",
//       TopicArn: process.env.ARN,
//       Endpoint: emailAddress,
//     }),
//   );
//   console.log(response);
// }

// const snsNotification = new PublishCommand({
//      TopicArn: process.env.ARN,
//      Message: "successfully created"
//  });
// const response = snsClient.send(snsNotification)


export const registerUser = async (req: Request, res: Response) => {
    try {
        console.log("enter into register")
        const { name, email, password } = req.body;
        const data = { name, email, password };
        console.log("datacoming", data)
        console.log("email comming", data.email)
        const userExist = await Users.findOne({
            where: { email: data.email }
        });
        console.log(data.email, "comming user exist")
        if (!userExist) {
            const register = await registerTheUser(req.body)
            return res.status(201).json({ message: 'verification code send to the email', register });
        }
        else {
            console.log("enter into user exist")
            const registering = await registerTheUser(req.body)
            return res.status(201).json({ message: 'verification code send to the email', registering });
        }
    } catch (error: any) {
        if (error.name === "MessageRejected") {
            const verifyEmail = await verifyTheEmail(req.body)
            console.log(verifyEmail, "verify")
            if (!verifyEmail) {
                return res.status(401).json({ message: "email problem please check your email" })
            } else {
                return res.status(200).json({ message: "verfication email sent your email, click that" })
            }
        }
        return res.status(500).json({ message: 'network error', error });
    }
}













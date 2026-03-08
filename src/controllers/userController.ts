import { Request, Response } from "express"
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Users } from "../models/userModel"
import 'dotenv/config'
import { registerTheUser, verifyOtp, verifyTheEmail } from "../services/userServices";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
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
        const { name, email, password,image } = req.body;
        const data = { name, email, password,image };
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
            return res.status(201).json({ message: 'This email is alaready there' });
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


export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        const data = {email,otp}
        const otpCheck = await verifyOtp(data);
        return res.status(200).json({ message: "successfully verified the account", otpCheck });
    } catch (error) {
        return res.status(400).json({ message: "your email and otp not matched", error });
    }
};



export const signInUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({
            where: { email }
        });
        console.log("datacomming.. ", user)
        console.log("token comming", process.env.JWT_SECRET)

        if (!user) {
            return res.status(404).json('Email not found');
        }
        const passwordValid = await bcrypt.compare(password, user.dataValues.password);
        console.log(passwordValid, "value coming..")

        if (!passwordValid) {
            return res.status(404).json('incorrect password please give the proper credentials');
        }
        const token = jwt.sign(
            { id: user.dataValues.id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            } as SignOptions);

        return res.status(200).send({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            image:user.dataValues.image,
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).send('sign in error');
    }
}



const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  requestChecksumCalculation: "WHEN_REQUIRED", 
});

export const presigned = async (req:Request, res:Response) => {  
const contentType = (req.query.contentType as string) || "image/jpeg";
const fileName = `${uuidv4()}.${contentType.split('/')[1] || 'jpeg'}`;
console.log(fileName,"filename")
   const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    ContentType: contentType, 
  });

  try {
      const url = await getSignedUrl(s3, command, { 
      expiresIn: 300,
      signableHeaders: new Set(["content-type"]), 
    });
     res.status(200).json({message:"successfully uploaded", uploadURL: url, fileName });
  } catch (err) {
     console.error("Error generating pre signed URL:", err);
     res.status(500).json({ message: "Could not generate pre signed URL" });
  }
};










import { Request, Response } from "express"
import { newPerson } from "../services/userServices"
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Users } from "../models/userModel"
import { userDetails } from "../types/userDetails";
import 'dotenv/config'

export const createNewPerson = async (req: Request, res: Response) => {
    console.log("enter into controller")
    try {
        console.log("enter try block")
        const data = req.body
        console.log(data, "request data going")
        const newTask = await newPerson(data)
        console.log(newTask, "data comming..")
        if (newTask) {
            return res.status(201).json({ message: "successfully created", newTask })
        } else {
            return res.status(404).json({ message: "bad request" })
        }
    } catch (error) {
        return res.status(500).json({ message: "network issue", error })
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        console.log("enter into register")
        const { name, email, password } = req.body;
        const userExists = await Users.findOne({
            where: { email }
        });
        console.log("comming user exist")
        if (userExists) {
            console.log("enter into user exist")
            return res.status(400).send('Email is already associated with an account');
        }
        await Users.create({
            name,
            email,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(200).send('Registration successful');
    } catch (err) {
        return res.status(500).send('Error in registering user');
    }
}


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
            return res.status(404).json('incorrect email and password');
        }
        const token = jwt.sign(
            { id: user.dataValues.id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN,
            } as SignOptions);

        res.status(200).send({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            accessToken: token,
        });
    } catch (err) {
        return res.status(500).send('sign in error');
    }
}
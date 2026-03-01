import { Request,Response } from "express"
import { newPerson } from "../services/userServices"

export const createNewPerson = async (req:Request, res:Response) => {
    console.log("enter into controller")
    try {
        console.log("enter try block")
        const data = req.body
        console.log(data,"request data going")
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
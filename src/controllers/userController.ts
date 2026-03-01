import { Request,Response } from "express"
import { newPerson } from "../services/userServices"

export const createNewPerson = async (req:Request, res:Response) => {
    try {
        const data = req.body
        const newTask = await newPerson(data)
        if (newTask) {
            return res.status(201).json({ message: "successfully created", newTask })
        } else {
            return res.status(404).json({ message: "bad request" })
        }
    } catch (error) {
        return res.status(500).json({ message: "network issue", error })
    }
}
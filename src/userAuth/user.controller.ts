import { Request, Response } from "express";
import { userService } from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" });
  }
};



export const userController = {
    createUser
}
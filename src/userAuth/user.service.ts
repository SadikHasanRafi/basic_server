import { closeConnection, connectToDatabase } from "../util/databaseConnection";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (userData: IUser) => {
  console.log("🚀 ~ user.service.ts:5 ~ createUser ~ userData:", userData)
  try {
    await connectToDatabase();      
    const user = new User(userData);
    console.log("🚀 ~ user.service.ts:8 ~ createUser ~ user:", user)
    await user.save();
    await closeConnection();
    return user;
  } catch (error) {
    console.error("Service Error (createUser):", error);
    throw error;
  }
};

 
export const  userService = {
    createUser
}
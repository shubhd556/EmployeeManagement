import connectToDatabase from "./db/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt'
connectToDatabase
const  userRegister = async () => {
    connectToDatabase()
    try 
    {
        const hasPassword = await bcrypt.hash("admin",10)
        const newUser = new User({
            name : "Admin",
            email : "admin@gmail.com",
            password : hasPassword,
            role: "admin"
        })
        await newUser.save()
    }catch(error)
    {
        console.error(error);
    }
}


userRegister();
import { query } from "../database/index.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const register = async (req, res) => {
    try {
        const newUser = req.body
        var salt = bcrypt.genSaltSync(10)
        var hashedValue = bcrypt.hashSync(newUser.password, salt)
    
        await query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [newUser.username, newUser.email, hashedValue])
        res.status(200).json({message: "New user created", data: {username:newUser.username}})
    } catch (error) {
        res.status(500).json({message:"Server error", error:error})
    }

}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const resDB = await query("SELECT * FROM users where email = $1", [email])
        if (resDB.rowCount === 0){
            res.status(401).json({message: "Wrong email or password"})
            return
        }
        console.log("checkpoint 1")
        const user =  resDB.rows[0]

        console.log("checkpoint 2")

        const isMatch = await bcrypt.compare(password, user.password)
        console.log("checkpoint 3")

        if(isMatch){
            console.log("checkpoint 4")

            const token = jwt.sign({id:user.id}, process.env.JWT_SECRET)
            console.log("checkpoint 5")

            res.status(200).json({message: "Login successful", data: user.username, token:token})
            return
        }else{
            res.status(401).json({message:"Wrong email or password"})
            return
        }
    } catch (error) {
        res.status(500).json({message:"Server error", error:error})
    }
}

const auth = {register, login}

export default auth
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
        console.log(req)
        const {email, password} = req.body
        console.log("testtest", email, password)
        const resDB = await query("SELECT * FROM users where email = $1", [email])
        if (resDB.rowCount === 0){
            res.status(401).json({message: "Wrong email or password"})
            return
        }

        const user =  resDB.rows[0]


        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = jwt.sign({id:user.id}, process.env.JWT_KEY)
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
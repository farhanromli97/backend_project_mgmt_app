import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log(decoded)
        if(!decoded?.id) return res.status(401).json({message: "Unauthorised"})
        req.userId = decoded.id
        next()

    } catch (error) {
        res.status(401).json({message: "Unauthorised"})
    }
}

export default isAuthenticated
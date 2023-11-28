import express from "express"
import { dbInit } from "./database/index.js"
import appRoutes from "./routes/index.js"
import cors from "cors"


const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

dbInit()

app.use(appRoutes)

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
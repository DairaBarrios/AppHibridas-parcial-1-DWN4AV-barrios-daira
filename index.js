import express from "express";
import mongoose from "mongoose"
import "dotenv/config"
import autores_routes from "./routes/autores_routes.js"
import auth from "./routes/auth.js"

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("conectado a DB"))
    .catch(() => console.log("error al conectar"))

// mongodump --db=cursos
// mongorestore --uri mongodb+srv://milamarcos98:1234@cluster0.khxruqc.mongodb.net/clase12v "C:\Users\Alumno\Desktop\dump\dump\cursos"

const index = express()
index.use(express.json())
index.use(express.urlencoded({extended: true}))
// index.use("/users", user_routes)
// index.use("/cursos", cursos_routes)
// index.use("/login", auth)
index.use("/autores", autores_routes)
index.use("/login", auth)


const port = process.env.PORT || 3002
index.listen(port)
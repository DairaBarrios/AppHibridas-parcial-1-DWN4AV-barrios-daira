import express from "express";
import cors from 'cors';
import mongoose from "mongoose"
import "dotenv/config"
import autores_routes from "./routes/autores_routes.js"
import libros_routes from "./routes/libros_routes.js"
import auth from "./routes/auth.js"

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("conectado a DB"))
    .catch(() => console.log("error al conectar"))

// mongodump --db=cursos
// mongorestore --uri mongodb+srv://milamarcos98:1234@cluster0.khxruqc.mongodb.net/clase12v "C:\Users\Alumno\Desktop\dump\dump\cursos"


const index = express()

index.use(cors())

index.use(express.json())
index.use(express.urlencoded({extended: true}))
index.use("/autores", autores_routes)
index.use("/libros", libros_routes)
index.use("/users", auth)

index.use(express.static("public"));


const port = process.env.PORT || 3002
index.listen(port)
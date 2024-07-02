import Usuario from "../models/usuarios_model.js"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ruta = express.Router()

ruta.post('/login', (req, res) => {
    Usuario.findOne({email: req.body.email})
    .then(data => {
        if(data){
            // "1234" ==  "$2b$10$em7fCmrtis87yxcYxkun1eFWRBvry2LHFjTgR9aLudAuSF.DFDzP6"
            const passwordValido = bcrypt.compareSync(req.body.password, data.password)
            if(!passwordValido) return res.status(400).json({msj: "password incorrecto"})
            const jwToken = jwt.sign({
        usuario: {
            _id: data._id,
            nombre: data.nombre,
            email: data.email
        }
        }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
        res.json({
            usuario: {
                _id: data._id,
                nombre: data.nombre,
                email: data.email
            }, jwToken
        })
        }else{
            res.status(400).json({msj: "email incorrecto"})
        }
    })
})

ruta.post('/register', async (req, res) => {
    const { email, nombre, password } = req.body;

    // Verificar que la contraseña no esté vacía
    if (!password || !email || !nombre) {
        return res.status(400).json({ msj: "La contraseña o usuario no pueden estar vacía" });
    }

    // Verificar que el nombre de usuario no esté ya en uso
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        return res.status(400).json({ msj: "El nombre de usuario ya está en uso" });
    }

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
        email,
        nombre,
        password: bcrypt.hashSync(password, 10) // Encriptar la contraseña
    });

    try {
        await nuevoUsuario.save();
        res.status(201).json({ msj: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ msj: "Error al registrar el usuario", error });
    }
});

export default ruta;
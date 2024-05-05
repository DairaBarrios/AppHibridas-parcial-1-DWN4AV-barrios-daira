import express from "express"
import {createAutor, getAutores, getAutor, updateAutor} from "../controllers/autores_controller.js"
import Joi from "joi"
import verificarToken from "../middleware/auth.js";

const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string().alphanum().required(),
    apellido: Joi.string().alphanum().required(),
    nacionalidad: Joi.string().alphanum().required(),
    fechaNacimiento: Joi.date().required()
});

ruta.post("", verificarToken, (req, res) => {
    const {error, value} = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error)
    }
    let resultado = createAutor(value);
    resultado
        .then((autor) => {
            res.status(201).json(autor)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

ruta.get("", verificarToken, async (req, res) => {
    const {
        nombre,
        nacionalidad,
        fechaInicio,
        fechaFin,
        page,
        limit,
        campoOrdenamiento,
        direccionOrdenamiento
    } = req.query;

    // Paginación
    const paginacion = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
        sort: {
            [campoOrdenamiento]: direccionOrdenamiento === 'desc' ? -1 : 1
        }
    };

    let resultado = getAutores(nombre, nacionalidad, fechaInicio, fechaFin, paginacion);

    resultado
        .then((autores) => {
            res.status(200).json(autores)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});


ruta.put("/:id", verificarToken, (req, res) => {
    let body = req.body;
    const {error, value} = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error)
    }
    let resultado = updateAutor(req.params.id, value);
    resultado
        .then((autor) => {
            res.status(201).json(autor)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

ruta.get("/:id", verificarToken, (req, res) => {
    let resultado = getAutor(req.params.id);
    resultado
        .then((autor) => {
            res.status(200).json(autor)
        })
        .catch((error) => {
            res.status(404).json({})
        })
});
export default ruta;
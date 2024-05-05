import express from "express"
import {getLibros, createLibro, getLibro, updateLibro, desactivarLibro, activarLibro} from "../controllers/libros_controller.js"
import Joi from "joi"
import verificarToken from "../middleware/auth.js";

const ruta = express.Router();

const schema = Joi.object({
    titulo: Joi.string().required(),
    autor: Joi.string().required(),
    genero: Joi.string().required(),
    isbn: Joi.number().required(),
    editorial: Joi.string(),
    imagen: Joi.string(),
    fechaPublicacion: Joi.date(),
    paginas: Joi.number().required()
});

ruta.get("", verificarToken, (req, res) => {
    const {
        titulo,
        genero,
        nroPaginasInicio,
        nroPaginasFin,
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

    let resultado = getLibros(titulo, genero, nroPaginasInicio, nroPaginasFin, paginacion);

    resultado
        .then((autores) => {
            res.status(200).json(autores)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});

ruta.post("", verificarToken, (req, res) => {
    const {error, value} = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error)
    }
    let resultado = createLibro(value);
    resultado
        .then((autor) => {
            res.status(201).json(autor)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});

ruta.get("/:id", verificarToken, (req, res) => {
    let resultado = getLibro(req.params.id);
    resultado
        .then((autor) => {
            res.status(200).json(autor)
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
    let resultado = updateLibro(req.params.id, body);
    resultado
        .then((autor) => {
            res.status(201).json(autor)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});

ruta.delete("/:id", verificarToken, (req, res) => {
    let body = req.body;
    let resultado = desactivarLibro(req.params.id, body);
    resultado
        .then((autor) => {
            res.status(201).json(autor)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});

ruta.put("/activar/:id", verificarToken, (req, res) => {
    let body = req.body;
    let resultado = activarLibro(req.params.id, body);
    resultado
        .then((autor) => {
            res.status(201).json(autor)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
});

export default ruta;
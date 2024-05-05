import Autores from '../models/autores_model.js';

async function createAutor(autor) {
    let autorNuevo = new Autores({
        nombre: autor.nombre,
        apellido: autor.apellido,
        nacionalidad: autor.nacionalidad,
        fechaNacimiento: autor.fechaNacimiento
    })

    return await autorNuevo.save();
}

async function getAutores(nombre, nacionalidad, fechaInicio, fechaFin, paginacion) {
    const filtro = {};

    if (nombre) {
        filtro.$or = [
            {nombre: {$regex: new RegExp(nombre, 'i')}},
            {apellido: {$regex: new RegExp(nombre, 'i')}}
        ];
    }
    if (nacionalidad) {
        filtro.nacionalidad = {$regex: new RegExp(nacionalidad, 'i')}
    }
    if (fechaInicio && fechaFin) {
        filtro.fechaNacimiento = {
            $gte: new Date(fechaInicio),
            $lte: new Date(fechaFin)
        };
    }

    return Autores.paginate(filtro, paginacion);
}

async function getAutor(id) {
    return Autores.findById(id);
}

async function updateAutor(id, autor) {
    return Autores.findByIdAndUpdate(id, {
        $set: {
            nombre: autor.nombre,
            apellido: autor.apellido,
            nacionalidad: autor.nacionalidad,
            fechaNacimiento: autor.fechaNacimiento
        }

    }, {new: true});
}

async function deactivateAutor(id) {
    return Autores.findByIdAndUpdate(id, {
        $set: {
            activo: false
        }
    }, {new: true});
}

export {createAutor, getAutores, getAutor, updateAutor, deactivateAutor};
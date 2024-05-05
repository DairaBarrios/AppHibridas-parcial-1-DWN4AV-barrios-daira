import Libros from "../models/libros_model.js";
import Autores from "../models/autores_model.js";

async function getLibros(titulo, genero, nroPaginasIncio, nroPaginasFin, paginacion) {
    const filtro = {activo: true};

    if (titulo) {
        filtro.titulo = {$regex: new RegExp(titulo, 'i')}
    }
    if (genero) {
        filtro.genero = {$regex: new RegExp(genero, 'i')}
    }
    if (nroPaginasIncio && nroPaginasFin) {
        filtro.paginas = {
            $gte: nroPaginasIncio,
            $lte: nroPaginasFin
        }
    }

    const options = {
        ...paginacion,
        populate: 'autor'
    };

    return Libros.paginate(filtro, options);
}

async function createLibro(libro) {
    let libroNuevo = new Libros({
        titulo: libro.titulo,
        autor: libro.autor,
        genero: libro.genero,
        isbn: libro.isbn,
        editorial: libro.editorial,
        imagen: libro.imagen,
        fechaPublicacion: libro.fechaPublicacion,
        paginas: libro.paginas
    });
    return await libroNuevo.save();
}

async function getLibro(id) {
    return Libros.findById(id);
}

async function updateLibro(id, libro) {
    return Libros.findByIdAndUpdate(id, {
        $set: {
            titulo: libro.titulo,
            autor: libro.autor,
            genero: libro.genero,
            isbn: libro.isbn,
            editorial: libro.editorial,
            imagen: libro.imagen,
            fechaPublicacion: libro.fechaPublicacion,
            paginas: libro.paginas
        }
    }, {new: true});
}

async function desactivarLibro(id) {
    return Libros.findByIdAndUpdate(id, {
        $set: {
            activo: false
        }
    }, {new: true});
}

async function activarLibro(id) {
    return Libros.findByIdAndUpdate(id, {
        $set: {
            activo: true
        }
    }, {new: true});
}

export {getLibros, createLibro, getLibro, updateLibro, desactivarLibro, activarLibro};
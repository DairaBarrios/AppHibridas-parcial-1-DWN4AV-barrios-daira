import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: Schema.Types.ObjectId, ref: 'Autores',
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: false
    },
    imagen: {
        type: String,
        required: false
    },
    fechaPublicacion: {
        type: Date,
        required: false
    },
    paginas: {
        type: Number,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});

libroSchema.plugin(mongoosePaginate);

const Libros = mongoose.model('Libros', libroSchema);
export default Libros;

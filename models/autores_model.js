import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
});

autorSchema.plugin(mongoosePaginate);

const Autores = mongoose.model('Autores', autorSchema);
export default Autores;

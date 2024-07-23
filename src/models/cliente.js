// src/models/cliente.js
import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  cedula: {
    type: Number,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

let Cliente;

try {
  Cliente = mongoose.model("Cliente");
} catch (error) {
  Cliente = mongoose.model("Cliente", clienteSchema);
}

export default Cliente;

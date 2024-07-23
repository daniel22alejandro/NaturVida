// src models/productos.js
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  cantidadDisponible: {
    type: Number,
    required: true,
  },
  unidadesVendidas: {
    type: Number,
    required: true,
  } 
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;

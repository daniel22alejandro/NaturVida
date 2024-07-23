// src/models/factura.js
import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Producto", 
  }],
  valorTotal: {
    type: Number,
    required: true,
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendedor",
    required: true,
  },
});

export default mongoose.models.Factura || mongoose.model("Factura", facturaSchema);

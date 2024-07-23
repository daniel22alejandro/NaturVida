import mongoose from "mongoose";
const detalleSchema = mongoose.Schema({
  numero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "factura",
    required: true,
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productos",
    required: true,
  },

  cantidad: {
    type: Number,
    required: true,
  },
});
let detalle;

try {
  // Intenta obtener el modelo si ya está definido
  detalle = mongoose.model("detalle");
} catch (error) {
  //Si el modelo no está definido, define uno nuevo
  detalle = mongoose.model("detalle", detalleSchema);
}

export default detalle;

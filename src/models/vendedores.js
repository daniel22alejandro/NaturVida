// src/models/vendedors.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const vendedoresSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash de la contraseña antes de guardar
vendedoresSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

let Vendedor;

try {
  Vendedor = mongoose.model("Vendedor");
} catch (error) {
  Vendedor = mongoose.model("Vendedor", vendedoresSchema);
}

export default Vendedor;


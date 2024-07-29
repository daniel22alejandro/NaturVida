// src/app/api/auth/login/route.js
import { Conexion } from "@/lib/mongoDB";
import Vendedores from "@/models/vendedores";
import { generateToken } from "@/lib/jwt";
import bcryptjs from 'bcryptjs'; 
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { usuario, password } = await request.json();
    await Conexion();
    console.log("Conexión a la base de datos exitosa");

    // Verificar usuario
    const user = await Vendedores.findOne({ usuario });
    if (!user) {
      return NextResponse.json({
        status: 401,
        message: "Usuario incorrecto",
      });
    }
    console.log("Usuario encontrado:", user);

    // Comparar contraseñas
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña almacenada:", user.password);
    console.log("Coinciden:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({
        status: 401,
        message: "Contraseña incorrecta",
      });
    }

    // Generar token
    const token = generateToken(user);

    return NextResponse.json({
      status: 200,
      message: "Login exitoso",
      token: token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Error al intentar iniciar sesión: " + error.message,
    });
  }
}

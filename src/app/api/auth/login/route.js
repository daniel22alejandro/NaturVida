// src/app/api/auth/login/route.js
import { Conexion } from "@/lib/mongoDB";
import Vendedores from "@/models/vendedores";
import { generateToken } from "@/lib/jwt";
import bcrypt from 'bcryptjs'; 
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    await Conexion();

    // Verificar usuario
    const user = await Vendedores.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 401,
        message: "Credenciales incorrectas",
      });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        status: 401,
        message: "Credenciales incorrectas",
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

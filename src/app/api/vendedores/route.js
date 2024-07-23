import { Conexion } from "@/lib/mongoDB";
import vendedores from "@/models/vendedores";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const vendedor = await vendedores.find();
    return NextResponse.json({
      status: 200,
      message: "Vendedores obtenidos correctamente",
      data: vendedor,
    });
  } catch (error) {
    console.error("Error al obtener los vendedores:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener los vendedores: " + error.message,
    });
  }
}

export async function POST(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const hashedPassword = await bcryptjs.hash(data.password, 10);
    const vendedor = await vendedores.create({
      usuario: data.usuario,
      password: hashedPassword,
    });
    return NextResponse.json({
      status: 201,
      message: "Usuario creado correctamente",
      data: vendedor,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al crear el usuario: " + error.message,
    });
  }
}



// src/app/api/clientes/route.js
import { Conexion } from "@/lib/mongoDB";
import clienteModels from "@/models/cliente";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const clientes = await clienteModels.find();
    if (clientes) {
      return NextResponse.json({
        status: 200,
        message: "Clientes listados correctamente",
        data: clientes,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No se encontraron clientes",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Error al intentar listar clientes: " + error.message,
    });
  }
}

export async function POST(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const cliente = await clienteModels.create(data);
    return NextResponse.json({
      status: 201,
      message: "Cliente creado correctamente",
      data: cliente,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Error al intentar crear cliente: " + error.message,
    });
  }
}

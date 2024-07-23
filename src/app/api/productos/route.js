import { Conexion } from "@/lib/mongoDB";
import productos from "@/models/productos";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const producto = await productos.find();
    return NextResponse.json({
      status: 200,
      message: "Productos obtenidos correctamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener los productos: " + error.message,
    });
  }
}

export async function POST(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const producto = await productos.create(data);
    return NextResponse.json({
      status: 201,
      message: "Producto creado correctamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al crear el producto: " + error.message,
    });
  }
}

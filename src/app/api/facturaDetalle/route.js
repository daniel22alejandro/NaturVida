import { Conexion } from "@/lib/mongoDB";
import detalle from "@/models/facturaDetalle";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const clientes = await detalle.find();
    return NextResponse.json({
      status: 200,
      message: "Detalles de factura listados correctamente",
      data: clientes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Error al intentar listar detalles de factura: " + error.message,
    });
  }
}

export async function POST(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const clientes = await detalle.create(data);
    return NextResponse.json({
      status: 201,
      message: "Detalle de factura creado correctamente",
      data: clientes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: "Error al intentar crear detalle de factura: " + error.message,
    });
  }
}

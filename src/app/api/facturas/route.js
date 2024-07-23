import { Conexion } from "@/lib/mongoDB";
import Factura from "@/models/factura";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const facturas = await Factura.find();
    return NextResponse.json({
      status: 200,
      message: "Facturas obtenidas correctamente",
      data: facturas,
    });
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener las facturas: " + error.message,
    });
  }
}

export async function POST(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const nuevaFactura = await Factura.create(data);
    return NextResponse.json({
      status: 201,
      message: "Factura creada correctamente",
      data: nuevaFactura,
    });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al crear la factura: " + error.message,
    });
  }
}

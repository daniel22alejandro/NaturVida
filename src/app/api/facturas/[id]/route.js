import { Conexion } from "@/lib/mongoDB";
import Factura from "@/models/factura";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const facturas = await Factura.findById(id);
    if (!facturas) {
      return NextResponse.json({
        status: 400,
        error: "Factura no encontrada",
      });
    }
    return NextResponse.json({ status: 200, facturas });
  } catch (error) {
    console.error("Error al obtener la factura:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener la factura: " + error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const facturas = await Factura.findByIdAndDelete(id);
    if (!facturas) {
      return NextResponse.json({
        status: 400,
        error: "Factura no encontrada",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Factura eliminada correctamente",
      data: facturas,
    });
  } catch (error) {
    console.error("Error al eliminar la factura:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al eliminar la factura: " + error.message,
    });
  }
}

export async function PUT(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const id = params.id;
    const facturas = await Factura.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!facturas) {
      return NextResponse.json({
        status: 400,
        error: "Factura no encontrada",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Factura actualizada correctamente",
      data: facturas,
    });
  } catch (error) {
    console.error("Error al actualizar la factura:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al actualizar la factura: " + error.message,
    });
  }
}


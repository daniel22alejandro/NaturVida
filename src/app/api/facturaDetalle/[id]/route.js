import { Conexion } from "@/lib/mongoDB";
import detalleModels from "@/models/facturaDetalle";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const detalleFactura = await detalleModels.findById(id);
    if (!detalleFactura) {
      return NextResponse.json({ status: 400, error: "Detalle de factura no encontrado" });
    }
    return NextResponse.json({ status: 200, detalleFactura });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error al intentar obtener detalle de factura: " + error.message });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;

    const detalleFactura = await detalleModels.findByIdAndDelete(id);
    if (!detalleFactura) {
      return NextResponse.json({ status: 400, error: "Detalle de factura no encontrado" });
    }
    return NextResponse.json({ status: 200, detalleFactura });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error al intentar eliminar detalle de factura: " + error.message });
  }
}

export async function PUT(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const id = params.id;
    const detalleFactura = await detalleModels.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!detalleFactura) {
      return NextResponse.json({ status: 400, error: "Detalle de factura no encontrado" });
    }
    return NextResponse.json({ status: 200, detalleFactura });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error al intentar actualizar detalle de factura: " + error.message });
  }
}

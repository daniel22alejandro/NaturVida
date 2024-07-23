import { Conexion } from "@/lib/mongoDB";
import clienteModels from "@/models/cliente";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const cliente = await clienteModels.findById(id);
    if (!cliente) {
      return NextResponse.json({ status: 400, error: "Cliente no encontrado" });
    }
    return NextResponse.json({ status: 200, cliente });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error interno: " + error.message });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;

    const cliente = await clienteModels.findByIdAndDelete(id);
    if (!cliente) {
      return NextResponse.json({ status: 400, error: "Cliente no encontrado" });
    }
    return NextResponse.json({ status: 200, cliente });
  } catch (error) {
    return NextResponse.json({ status: 500, error: "Error interno: " + error.message });
  }
}

export async function PUT(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const data = await request.json();
    const id = params.id;
    const cliente = await clienteModels.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!cliente) {
      return NextResponse.json({ status: 400, error: "Cliente no encontrado" });
    }
    return NextResponse.json({ status: 200, cliente });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, error: "Error interno: " + error.message });
  }
}

import { Conexion } from "@/lib/mongoDB";
import vendedorModels from "@/models/vendedores";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const vendedor = await vendedorModels.findById(id);
    if (!vendedor) {
      return NextResponse.json({
        status: 404,
        error: "Vendedor no encontrado",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Vendedor obtenido correctamente",
      data: vendedor,
    });
  } catch (error) {
    console.error("Error al obtener el vendedor:", error);
    return NextResponse.json({
      status: 500,
      error: "Error interno al obtener el vendedor: " + error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const vendedor = await vendedorModels.findByIdAndDelete(id);
    if (!vendedor) {
      return NextResponse.json({
        status: 404,
        error: "Vendedor no encontrado",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Vendedor eliminado correctamente",
      data: vendedor,
    });
  } catch (error) {
    console.error("Error al eliminar el vendedor:", error);
    return NextResponse.json({
      status: 500,
      error: "Error interno al eliminar el vendedor: " + error.message,
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
    const vendedor = await vendedorModels.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!vendedor) {
      return NextResponse.json({
        status: 404,
        error: "Vendedor no encontrado",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Vendedor actualizado correctamente",
      data: vendedor,
    });
  } catch (error) {
    console.error("Error al actualizar el vendedor:", error);
    return NextResponse.json({
      status: 500,
      error: "Error interno al actualizar el vendedor: " + error.message,
    });
  }
}

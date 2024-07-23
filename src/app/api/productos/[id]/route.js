import { Conexion } from "@/lib/mongoDB";
import productosModels from "@/models/productos";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const producto = await productosModels.findById(id);
    if (!producto) {
      return NextResponse.json({
        status: 400,
        error: "Producto no encontrado",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Producto obtenido correctamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener el producto: " + error.message,
    });
  }
}

export async function DELETE(request, { params }) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();
    const id = params.id;
    const producto = await productosModels.findByIdAndDelete(id);
    if (!producto) {
      return NextResponse.json({
        status: 400,
        error: "Producto no encontrado",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Producto eliminado correctamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al eliminar el producto: " + error.message,
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
    const producto = await productosModels.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!producto) {
      return NextResponse.json({
        status: 400,
        error: "Producto no encontrado",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Producto actualizado correctamente",
      data: producto,
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al actualizar el producto: " + error.message,
    });
  }
}

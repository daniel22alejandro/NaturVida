// src/app/api/productos/detalleProducto/route.js
import { Conexion } from "@/lib/mongoDB";
import Producto from "@/models/productos";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();

    // Encuentra todos los productos
    const productos = await Producto.find();

    // Procesa los productos para formar la respuesta deseada
    const productosDetalles = productos.map(producto => ({
      id: producto._id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidadDisponible: producto.cantidadDisponible,
      unidadesVendidas: producto.unidadesVendidas,
    }));

    return NextResponse.json({
      status: 200,
      message: "Productos obtenidos correctamente",
      data: productosDetalles,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener los productos: " + error.message,
    });
  }
}

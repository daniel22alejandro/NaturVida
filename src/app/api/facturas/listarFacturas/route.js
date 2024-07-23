import { Conexion } from "@/lib/mongoDB";
import Factura from "@/models/factura";
import Cliente from "@/models/cliente"; // Importa explícitamente para asegurarte de que se registre
import Vendedor from "@/models/vendedores"; // Importa explícitamente para asegurarte de que se registre
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(request) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse; // Verifica el token usando el middleware

  try {
    await Conexion();

    // Encuentra todas las facturas e incluye los detalles del cliente y vendedor
    const facturas = await Factura.find()
      .populate({
        path: 'cliente',
        select: 'cedula nombre' // Solo los campos necesarios del cliente
      })
      .populate({
        path: 'vendedor',
        select: 'usuario' // Solo los campos necesarios del vendedor
      })
      .exec();

    // Procesa las facturas para formar la respuesta deseada
    const facturasDetalles = facturas.map(factura => ({
      codigo: factura._id, // Usa el _id como código de la factura
      valor: factura.valorTotal,
      cedulaCliente: factura.cliente ? factura.cliente.cedula : 'No asignado',
      nombreCliente: factura.cliente ? factura.cliente.nombre : 'No asignado',
      nombreVendedor: factura.vendedor ? factura.vendedor.usuario : 'No asignado'
    }));

    return NextResponse.json({
      status: 200,
      message: "Facturas obtenidas correctamente",
      data: facturasDetalles,
    });
  } catch (error) {
    console.error("Error al obtener las facturas:", error);
    return NextResponse.json({
      status: 500,
      error: "Error al obtener las facturas: " + error.message,
    });
  }
}

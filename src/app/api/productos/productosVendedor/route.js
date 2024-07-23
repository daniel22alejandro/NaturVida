import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Conexion } from '@/lib/mongoDB'; // Asegúrate de que esta ruta sea correcta
import Producto from '@/models/productos';
import Factura from '@/models/factura';

export async function GET(req) {
  try {
    // Obtener el ID del vendedor desde los parámetros de la consulta
    const url = new URL(req.url);
    const vendedorId = url.searchParams.get('vendedorId');

    if (!vendedorId) {
      return new NextResponse('ID del vendedor no proporcionado', { status: 400 });
    }

    // Conectar a la base de datos
    const { db } = await Conexion();

    // Realizar la agregación para listar productos vendidos por el vendedor
    const productosVendidos = await db.collection('facturas').aggregate([
      {
        $match: { vendedor: new mongoose.Types.ObjectId(vendedorId) },
      },
      {
        $unwind: '$productos',
      },
      {
        $lookup: {
          from: 'productos',
          localField: 'productos',
          foreignField: '_id',
          as: 'productoInfo',
        },
      },
      {
        $unwind: '$productoInfo',
      },
      {
        $group: {
          _id: '$productoInfo._id',
          nombre: { $first: '$productoInfo.nombre' },
          descripcion: { $first: '$productoInfo.descripcion' },
          precio: { $first: '$productoInfo.precio' },
          cantidadDisponible: { $first: '$productoInfo.cantidadDisponible' },
          unidadesVendidas: { $sum: 1 }, // Contar cuántas veces se ha vendido el producto
        },
      },
    ]).toArray();

    // Comprobar si se encontraron productos vendidos
    if (!productosVendidos || productosVendidos.length === 0) {
      return new NextResponse('No se encontraron productos vendidos para el vendedor', { status: 404 });
    }

    // Devolver los productos en formato JSON
    return new NextResponse(JSON.stringify(productosVendidos), { status: 200 });
  } catch (error) {
    // Registrar y manejar el error
    console.error('Error al obtener los productos vendidos por el vendedor:', error);
    return new NextResponse('Error en el servidor', { status: 500 });
  }
}

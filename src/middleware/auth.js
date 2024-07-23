// src/middleware/auth.js
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export const authMiddleware = async (request) => {
  const token = request.headers.get("token");

  if (!token) {
    return NextResponse.json({ message: "Se requiere un token" }, { status: 401 });
  }

  try {
    verifyToken(token);
  } catch (error) {
    return NextResponse.json({ message: "Token inválido o expirado" }, { status: 401 });
  }
};

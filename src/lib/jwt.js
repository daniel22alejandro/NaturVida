// src/lib/jwt.js
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: '24h',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

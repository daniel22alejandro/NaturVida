/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     responses:
 *       200:
 *         description: Clientes listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Clientes listados correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Id del Cliente
 *                         example: 669e90d0fd6c80e79da012a5
 *                       cedula:
 *                         type: number
 *                         description: La cedula del cliente
 *                         example: 123456789
 *                       nombre:
 *                         type: string
 *                         description: Nombre del cliente
 *                         example: Juan Pérez
 *                       direccion:
 *                         type: string
 *                         description: Dirección del cliente
 *                         example: Carrera 10 #20-30
 *                       telefono:
 *                         type: string
 *                         description: Teléfono del cliente
 *                         example: +57 300 123 4567
 *                       email:
 *                         type: string
 *                         description: Email del cliente
 *                         example: juan.perez@example.com
 *       404:
 *         description: "No se encontraron clientes"
 *       500:
 *         description: "Error al intentar listar clientes"
 *   post:
 *     summary: Crea un nuevo Cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cedula:
 *                 type: number
 *                 description: La cedula del cliente
 *                 example: 123456789
 *               nombre:
 *                 type: string
 *                 description: El nombre del cliente
 *                 example: Juan Pérez
 *               direccion:
 *                 type: string
 *                 description: La dirección del cliente
 *                 example: Carrera 10 #20-30
 *               telefono:
 *                 type: string
 *                 description: El teléfono del cliente
 *                 example: +57 300 123 4567
 *               email:
 *                 type: string
 *                 description: El email del cliente
 *                 example: juan.perez@example.com
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Id del Cliente
 *                   example: 669e90d0fd6c80e79da012a5
 *                 cedula:
 *                   type: number
 *                   description: La cedula del cliente
 *                   example: 123456789
 *                 nombre:
 *                   type: string
 *                   description: El nombre del cliente
 *                   example: Juan Pérez
 *                 direccion:
 *                   type: string
 *                   description: La dirección del cliente
 *                   example: Carrera 10 #20-30
 *                 telefono:
 *                   type: string
 *                   description: El teléfono del cliente
 *                   example: +57 300 123 4567
 *                 email:
 *                   type: string
 *                   description: El email del cliente
 *                   example: juan.perez@example.com
 *       400:
 *         description: Entrada inválida
 *       500:
 *         description: Error al crear el cliente
 */
export const clientesDocs = {};

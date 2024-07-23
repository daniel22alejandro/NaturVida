// src/lib/swagger.js
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "NaturVida Next.js API Documentation",
      version: "1.0.0",
      description: "API documentation for the NaturVida project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/app/api/**/*.js", "./src/models/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const ApiDocs = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(swaggerDocs));
};

export default swaggerDocs;

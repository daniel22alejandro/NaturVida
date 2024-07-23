// server.js
const express = require('express');
const next = require('next');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Next.js API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Next.js project',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, './src/app/api/**/*.js'), path.join(__dirname, './src/models/*.js')],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.prepare().then(() => {
  const server = express();

  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

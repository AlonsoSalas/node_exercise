import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * Swagger definition and options.
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Node Exercise API',
    version: '1.0.0',
    description: 'API documentation for the Node Exercise project',
  },
  servers: [
    {
      url: 'http://localhost:3150',
      description: 'Local server',
    },
  ],
};

/**
 * Options for swagger-jsdoc
 */
const options = {
  swaggerDefinition,
  apis: ['./app/advice/routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };

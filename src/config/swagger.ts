import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "API para gestión de tareas",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    // 🔥 AÑADIDO: autenticación JWT (Authorize en Swagger)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  // 🔥 MEJORADO: rutas más confiables (Windows + ts-node-dev)
  apis: ["src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
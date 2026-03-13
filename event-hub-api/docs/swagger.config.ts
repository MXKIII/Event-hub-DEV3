import type { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.3",
    info: { title: "Event Hub API", version: "1.0.0" },
    servers: [{ url: "http://localhost:8100" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/docs/**/*.ts"],
};

export default swaggerOptions;
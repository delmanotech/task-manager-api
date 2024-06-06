import express from "express";
import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: "1.0.0",
    title: "Task Manager API",
    description: "API for managing projects and tasks",
  },
  baseDir: __dirname,
  filesPattern: "./routes/*.ts",
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
  exposeApiDocs: false,
  apiDocsPath: "/v3/api-docs",
  notRequiredAsNullable: false,
  swaggerUiOptions: {},
  security: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const setupSwagger = (app: express.Application) => {
  expressJSDocSwagger(app)(options);
};

export default setupSwagger;

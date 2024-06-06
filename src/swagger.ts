import express from "express";
import expressJSDocSwagger from "express-jsdoc-swagger";

const options = {
  info: {
    version: "1.0.0",
    title: "Task Manager API",
    description: "API for managing projects and tasks",
  },
  baseDir: __dirname,
  filesPattern:
    process.env.NODE_ENV === "production" ? "./routes/*.js" : "./routes/*.ts",
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
  console.log(process.env.NODE_ENV);
  expressJSDocSwagger(app)(options);
};

export default setupSwagger;

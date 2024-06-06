import mongoose from "mongoose";
import app from "../src/server";

let server: any;

beforeAll(async () => {
  server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

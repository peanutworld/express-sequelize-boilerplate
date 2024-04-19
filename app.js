import express from "express";
import dotenv from "dotenv";
import { notFound } from "./src/middlewares/notFound.js";
import { handleError } from "./src/middlewares/handleError.js";
import notesRoute from "./src/resources/notes/notes.routes.js";
dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

// Middleware
app.use(express.json());

// API routes
app.use("/notes", notesRoute);

app.use(notFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

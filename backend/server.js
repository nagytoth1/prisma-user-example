import express from "express";
import { configDotenv } from "dotenv";
import usersRoutes from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const app = express();
configDotenv();
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
app.use(express.json());
app.use(cors());

// REST API
app.use("/users", usersRoutes);
app.use("/auth", authRoute);

// Frontend hosting
const compiledFrontendDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  "dist"
);
console.debug(compiledFrontendDirectory);
app.use(express.static(compiledFrontendDirectory));
// For any route not found in the static files, send the index.html file
app.get("*", (req, res) => {
  res.sendFile(join(compiledFrontendDirectory, "index.html"));
});

app.listen(BACKEND_PORT, () => {
  console.debug(`server is listening on port ${BACKEND_PORT}`);
});

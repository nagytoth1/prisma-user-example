import express from "express";
import usersRoutes from "./routes/users.js";
import authRoute from "./routes/auth.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
app.use(express.json());
const corsHandler = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", req.headers.origin);
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Allow-Methods,Access-Control-Request-Headers,authorization"
  );
  next();
};
app.use(corsHandler);
app.use(cookieParser());

// REST API
app.use("/users", usersRoutes);
app.use("/auth", authRoute);

// Frontend hosting
const compiledFrontendDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  "dist"
);
app.use(express.static(compiledFrontendDirectory));
// For any route not found in the static files, send the index.html file
app.get("*", (req, res) => {
  res.sendFile(join(compiledFrontendDirectory, "index.html"));
});

app.listen(BACKEND_PORT, () => {
  console.debug(`server is listening on port ${BACKEND_PORT}`);
});

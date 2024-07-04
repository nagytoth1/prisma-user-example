import express from "express";
import { configDotenv } from "dotenv";
import usersRoutes from "./routes/users.js";
import cors from "cors";
const app = express();
configDotenv();
const BACKEND_PORT = process.env.BACKEND_PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/users", usersRoutes);

app.listen(BACKEND_PORT, () => {
  console.debug(`server is listening on port ${BACKEND_PORT}`);
});

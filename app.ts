import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./src/routes/adminRoutes";
import userRoutes from "./src/routes/userRoutes";
import sequelize from "./src/db/connection";

const app = express();
app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed", err));

export default app;

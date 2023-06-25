import express from "express";
import router from "./routes.js";

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`The server is up and running on port ${PORT}`);
});

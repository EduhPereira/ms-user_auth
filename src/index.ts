import { Request, Response, NextFunction } from "express";
import express from "express";
import { userRoute } from "./routes/users.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);

app.listen(3000, () => {
  console.log("App running at port 3000");
});

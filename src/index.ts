import { Request, Response, NextFunction } from "express";
import express from "express";

const app = express();

app.get(
  "/status",
  (request: Request, response: Response, next: NextFunction) => {
    response.send({ status: "online" });
  }
);

app.listen(3000, () => {
  console.log("App running at port 3000");
});

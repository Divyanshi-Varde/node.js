import express, { Request, Response, NextFunction } from "express";
const port = 3000;
import {routes} from "./routes"

const app = express();

app.use(express.json());

// app.use(express.urlencoded({extended:true}))

routes(app)

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

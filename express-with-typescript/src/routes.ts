import { Express, Request, Response, NextFunction } from "express";
import {getBookHandler} from "./books/controllers/books.controller"

export function routes(app: Express) {
  app.get("/json", (req: Request, res: Response) => {
    res.json({
      success: true,
      name: "divyanshi",
    });
  });

  // app.get("/api/books/:bookId/:authorId", (req: Request, res: Response,next:NextFunction) => {
  //   console.log("Book ID:" + req.params.bookId);
  //   console.log("Author ID:" + req.params.authorId);
  //   return res.send(req.params);
  // });

//   const handleGetBookOne = (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
    
//   };

//   const handleGetBookTwo = (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     console.log("Second handler");
//     return res.send(req.params);
//   };

  app.get("/api/books/:bookId/:authorId", getBookHandler);

  app.get("/", (req: Request, res: Response) => {
    return res.redirect("http://example.com");
  });

  app.post("/api/data", (req: Request, res: Response) => {
    console.log(req.body);
    return res.sendStatus(200);
  });

  app.all("/api/all", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  //error handling
  async function throwsError() {
    throw new Error("Boom!");
  }

  app.get("/error", async (req, res) => {
    try {
      await throwsError();
      res.sendStatus(200);
    } catch (e) {
      res.status(400).send("Something went wrong!");
    }
  });
}

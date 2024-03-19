import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { Products } from "./entities/Products";
import { Company } from "./entities/Company";
import dotenv from "dotenv";

const port = 3000;
const app = express();
app.use(express.json());
dotenv.config();

// console.log(process.env);
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Products, Company],
  synchronize: true,
  logging: true,
});

app.get("/", async function (req, res) {
  const companyRepo = AppDataSource.getRepository(Company);
  //   let products: Products[] = [];

  //   let iPhone = new Products();
  //   iPhone.name = "iPhone-15";
  //   iPhone.description = "Smart phone";
  //   iPhone.price = 100000;

  //   let iPad = new Products();
  //   iPad.name = "iPad smart";
  //   iPad.description = "Smart tablet";
  //   iPad.price = 150000;

  //   let macBook = new Products();
  //   macBook.name = "MacBook ";
  //   macBook.description = "Laptop";
  //   macBook.price = 500000;

  //   products.push(iPad, iPhone, macBook);

  //   let company: Company = new Company();

  //   company.name = "Apple";
  //   company.description = "Software company, California";
  //   company.products = products;

  //   const dataInserted = await companyRepo.save(company);
  //   res.json(dataInserted);

  // find or filter a record

  let companyFound = await companyRepo.find({ relations: { products: true } });
  res.send(companyFound);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(port, () => {
      console.log(`Server is listening to port ${port}...`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

import "reflect-metadata";
import { DataSource, LessThan, LessThanOrEqual } from "typeorm";
import express from "express";
import { Products } from "./entities/products.entity";
import { Company } from "./entities/Company.entity";
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

  //   let companyFound = await companyRepo.find({
  //     relations: { products: true },
  //     where: {
  //       products: {
  //         price: LessThanOrEqual(100000),
  //       },
  //     },
  //   });
  //   res.send(companyFound);

  //update a record
  //   const company = await companyRepo.findOne({ where: { id: 3 } });

  //   if (company !== null && company !== undefined) {
  //     company.name = "Apple updated";
  //     if (company.products) {
  //       for (let i = 0; i < company.products.length; i++) {
  //         company.products[i].price = 250000;
  //       }
  //     }

  //     const dataChanged = await companyRepo.save(company);
  //     res.send(dataChanged);
  //   } else {
  //     res.status(404).send("Company not found");
  //   }

  //delete a record

  await companyRepo.delete(3);
  res.send("Record deleted successfully!");
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

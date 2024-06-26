import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./entities/user.entity";
import { Profile } from "./entities/Profile.entity";
import dotenv from "dotenv";

const port = 8000;
const app = express();
app.use(express.json());
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [User, Profile],
  migrationsTableName: "new_table",
  migrations: ["src/migrations/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});

app.get("/", async function (req, res) {
  const userRepo = AppDataSource.getRepository(User);

  //find all records
  //   const allRecords = await userRepo.find();
  //   res.send(allRecords);

  //   create a new record

  //     let user: User = new User();
  //     user.email = "div@gmailcom";
  //     user.firstName = "divyanshi";
  //     user.lastName = "varde";

  //     const userInserted = await userRepo.save(user);
  //     res.json(userInserted);

  //delete a record
  //   await userRepo.delete(2);
  //   res.send("Record deleted!");

  //update a record
  //   await userRepo.update(7, {
  //     firstName: "Hetvi",
  //     lastName: "Patel",
  //     email: "hetvi@gmail.com",
  //   });

  //   res.send("Record updated successfully!");

  //filter records
  const filteredRecords = await userRepo.find({ where: { lastName: "Patel" } });
  res.json(filteredRecords);
});

// app.delete("/", async function (req, res) {
//   const userRepo = AppDataSource.getRepository(User);
//   await userRepo.delete(2);

//   res.send("Record deleted!");
// });

// app.post("/", async function (req, res) {
//   const userRepo = AppDataSource.getRepository(User);
//   let user: User = new User();
//   user.email = "patel@gmail.com";
//   user.firstName = "Diya";
//   user.lastName = "Patel";

//   const userInserted = userRepo.save(user);
//   res.json(userInserted);
// });

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

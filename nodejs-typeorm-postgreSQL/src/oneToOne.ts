import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import { User } from "./entities/User";
import { Profile } from "./entities/Profile";
import dotenv from "dotenv"

const port = 8080;
const app = express();
app.use(express.json());
dotenv.config()

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // entities: ["src/entities/*.ts,.js"],
  entities: [User, Profile],
  synchronize: true,
  logging: true,
});

app.get("/", async function (req, res) {
  const userRepo = AppDataSource.getRepository(User);
  const profileRepo = AppDataSource.getRepository(Profile);

  //find a record
  //   const allRecords = await userRepo.find({ relations: { profile: true } });
  //   res.send(allRecords);

  //create a new record

  //   let profile: Profile = new Profile();
  //   profile.gender = "Female";
  //   profile.photo = "this is the photo";

  //   const profileInserted = await profileRepo.save(profile);

  //   let user: User = new User();
  //   user.email = "div@gmailcom";
  //   user.firstName = "divyanshi";
  //   user.lastName = "varde";
  //   user.profile = profileInserted;
  //   user.profile = profile;

  //   const userInserted = await userRepo.save(user);
  //   res.json(userInserted);

  //update a record

  //   const userFound = await userRepo.findOne({
  //     where: { id: 9 },
  //     relations: ["profile"],
  //   });

  //   if (userFound) {
  //     userFound.email = "varde@gmail.com";
  //     userFound.firstName = "Updated";
  //     userFound.lastName = "updated";
  //     userFound.profile.gender = "male";
  //     userFound.profile.photo = "no photo";

  //     const updatedUser = await userRepo.save(userFound);
  //     res.json(updatedUser);
  //   } else {
  //     res.send("No such user found!");
  //   }

  //delete a record
  await profileRepo.delete(1);
  res.send("Profile deleted successfully!");
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

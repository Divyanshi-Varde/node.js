import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";
import dotenv from "dotenv";
import { StudentEntity } from "./entities/students.entity";
import { CourseEntity } from "./entities/courses.entity";

const port = 4000;
const app = express();
app.use(express.json());
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  // entities: ["src/entities/*.ts,.js"],
  entities: [StudentEntity, CourseEntity],
  synchronize: true,
  logging: true,
});

app.get("/", async function (req, res) {
  const studentRepo = AppDataSource.getRepository(StudentEntity);
  const courseRepo = AppDataSource.getRepository(CourseEntity);

  let courses: CourseEntity[] = [];

  let course1 = new CourseEntity();
  course1.name = "DSA";
  course1.description = "Data structures and algorithms";
  course1.courseCode = 2324;

  let course2 = new CourseEntity();
  course2.name = "OOP";
  course2.description = "Object oriented programming";
  course2.courseCode = 2325;

  let course3 = new CourseEntity();
  course3.name = "FOP";
  course3.description = "Fundamentals of programming";
  course3.courseCode = 2326;

  courses.push(course1, course2, course3);

  let student = new StudentEntity();
  student.name = "Divyanshi Varde";
  student.age = 22;
  student.grade = "O";
  student.courses = courses;

  let newData = await studentRepo.save(student);
  res.send(newData);
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

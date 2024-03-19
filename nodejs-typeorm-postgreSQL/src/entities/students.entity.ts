import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { CourseEntity } from "./courses.entity";

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  grade: string;

  @ManyToMany(() => CourseEntity, { eager: true, cascade: true })
  @JoinTable()
  courses: CourseEntity[];
}

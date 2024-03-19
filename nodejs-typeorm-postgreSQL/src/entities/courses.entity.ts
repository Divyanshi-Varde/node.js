import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description:string

  @Column()
  courseCode: number;
}

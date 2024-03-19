import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Products } from "./Products";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Products, (product) => product.company, { cascade: true })
  products: Products[];
}

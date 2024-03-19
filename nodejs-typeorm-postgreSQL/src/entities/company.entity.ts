import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Products, (product) => product.company, {
    cascade: true,
    eager: true,
  })
  products: Products[];
}

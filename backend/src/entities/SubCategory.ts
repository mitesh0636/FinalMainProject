import { Column, Entity, EntityRepository, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CATEGORY } from "./Category";
import { PRODUCT } from "./Product";

@Entity("SUBCATEGORY")
export class SUBCATEGORY{
@PrimaryGeneratedColumn()
id!:number;

@Column()
subcategoryname!:string;

@ManyToOne(() => CATEGORY, (Cattegor) => Cattegor.subcategory)
category!:CATEGORY;

@OneToMany(() => PRODUCT, (productt) => productt.SubCategory )
product!:PRODUCT[];
}

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CATEGORY } from "./Category";

@Entity("PRODUCTTYPE")
export class PRODUCTTYPE{
@PrimaryGeneratedColumn()
id!:number;

@Column()
typename!:string;

@OneToMany(() => CATEGORY, (Categor) => Categor.producttype)
category!:CATEGORY[];


}

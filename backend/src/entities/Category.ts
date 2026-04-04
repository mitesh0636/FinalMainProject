import { Collection, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PRODUCTTYPE } from "./Producttype";
import { SUBCATEGORY } from "./SubCategory";

@Entity("CATEGORY")
export class CATEGORY{
@PrimaryGeneratedColumn()
id!:number;

@Column()
categoryname!:string;

@ManyToOne(() => PRODUCTTYPE, (producttyp) => producttyp.category)
producttype!:PRODUCTTYPE;

@OneToMany(() => SUBCATEGORY, (subcatte) => subcatte.category)
subcategory!:SUBCATEGORY[];

}
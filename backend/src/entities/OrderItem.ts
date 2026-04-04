import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ORDER } from "./Order";
import { PRODUCT } from "./Product";

@Entity("ORDERITEM")
export class ORDERITEM{
@PrimaryGeneratedColumn()
id!:number;

@Column("decimal", { precision: 10, scale: 2 })
priceAtPurchase!: number;

@Column()
quantity!:number;

@ManyToOne(() => ORDER, (orderr) => orderr.orderitem)
order!:ORDER;

@ManyToOne(() => PRODUCT, (prodcutt) => prodcutt.orderitem)
product!:PRODUCT;

}
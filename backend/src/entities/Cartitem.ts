import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CART } from "./Cart";
import { PRODUCT } from "./Product";

@Entity("CARTITEM")
export class CARTITEM{
@PrimaryGeneratedColumn()
id!:number;

@ManyToOne(() => CART, (cartt) => cartt.cartITEM)
cart!:CART;

@ManyToOne(() => PRODUCT, (prodcut) => prodcut.CartItemP)
productc!:PRODUCT;

@Column()
quantity!:number;



}

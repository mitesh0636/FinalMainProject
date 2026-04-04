import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { CARTITEM } from "./Cartitem";

@Entity("CART")
export class CART{
@PrimaryGeneratedColumn()
id!:number;

@OneToOne(() => User, (user) => user.cart)
@JoinColumn()
user!:User;

@OneToMany(() => CARTITEM, (carttime) => carttime.cart)
cartITEM!:CARTITEM[];
}
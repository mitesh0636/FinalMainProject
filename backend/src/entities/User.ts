import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { CART } from "./Cart";
import { ORDER } from "./Order";

export enum Roleenum{
    ADMINROLE = "admin",
    USERROLE = "user"
}

@Entity("USERS")
export class User{
@PrimaryGeneratedColumn()
id!: number;

@Column()
name!: string;

@Column({unique:true})
email!:string;

@Column({type: "date", nullable: true})
dateofbirth!:Date;

@Column()
password!:string;

@Column()
address!:string;

@Column()
contactno!:string;

@Column({type:"simple-enum", enum:Roleenum, default: Roleenum.USERROLE})
role!:Roleenum

@Column({default: false})
isLocked!:boolean;

@CreateDateColumn({ 
    type: "datetime", 
    default: () => "CURRENT_TIMESTAMP" 
})
createdAt!: Date;

@OneToOne(() => CART, (cart) => cart.user)
cart!:CART;

@OneToMany(() => ORDER, (orderr) => orderr.user)
order!:ORDER[]
}
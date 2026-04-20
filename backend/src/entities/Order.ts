import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ORDERITEM } from "./OrderItem";

export enum OrderStatus {
    ORDERED = "ordered",
    DISPATCHED = "dispatched",
    CANCELLED = "cancelled",
    DELIVERED = "delivered"
}

export enum PAYMENTMETHOD
{
CREDITCARD = "credit",
DEBITCARD = "debit",
BANKTRANSFER = "banktransfer",
CASHONDELIVERY = "cashondelivery"
}

@Entity("ORDER")
export class ORDER{
@PrimaryGeneratedColumn()
id!:number;

@ManyToOne(() => User, (userr) => userr.order)
user!:User

@OneToMany(() => ORDERITEM, (orderrit) => orderrit.order)
orderitem!:ORDERITEM[];

@Column("decimal", { precision: 10, scale: 2 })
TotalPayment!:number;

@Column("decimal", { precision: 10, scale: 2, default: 0 }) 
TaxApplied!: number;

@Column("decimal", { precision: 10, scale: 2, default: 0 }) 
SubTotal!: number;

@CreateDateColumn({ 
    type: "datetime", 
    default: () => "CURRENT_TIMESTAMP" 
})
orderDate!: Date;

@Column({ type: "datetime" })
deliveryDate!: Date;

@Column({type:"simple-enum", enum:OrderStatus})
orderstatus!:OrderStatus;

@Column({type:"simple-enum", enum:PAYMENTMETHOD})
paymentMethod!:PAYMENTMETHOD;

}
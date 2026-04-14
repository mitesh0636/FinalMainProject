import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SUBCATEGORY } from "./SubCategory";
import { ORDERITEM } from "./OrderItem";
import { CARTITEM } from "./Cartitem";

@Entity("PRODUCT")

    export class PRODUCT{
        @PrimaryGeneratedColumn()
        id!:number;

        @Column()
        name!:string;

        @Column()
        description!:string;

        @Column()
        price!:number;

        @Column()
        available!:number;

        @Column()
        imagePath!:string;
      
        @Column({type: "boolean", default: false})
        isDeleted!:boolean;
        
        @ManyToOne(() => SUBCATEGORY, (subcatte) => subcatte.product)
        SubCategory!:SUBCATEGORY;    

        @OneToMany(() => CARTITEM, (carttit) => carttit.productc)
        CartItemP!:CARTITEM[];
        
        @OneToMany(() => ORDERITEM, (orderr) => orderr.product)
        orderitem!:ORDERITEM[];
  
      }


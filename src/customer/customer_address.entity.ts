import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { CustomerEntity } from "./customer.entity";

@Entity("address")
export class AddressEntity{

    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    Street : string;
    @Column()
    Building : string;
    @Column()
    City : string;
    @Column()
    Country : string;
    @Column()
    ZIP : string;
    @OneToOne(() => CustomerEntity, customer => customer.address)
    customer: CustomerEntity;
    
}
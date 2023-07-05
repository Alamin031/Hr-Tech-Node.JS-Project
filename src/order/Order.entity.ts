import { CustomerEntity } from "src/customer/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";



@Entity()
export class Order {
@PrimaryGeneratedColumn()
id: number;

@Column()
  productName: string;
  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: CustomerEntity;
}
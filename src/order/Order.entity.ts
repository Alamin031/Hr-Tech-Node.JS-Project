import { CustomerEntity, ProductReview } from "src/customer/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";



@Entity()
export class Order {
@PrimaryGeneratedColumn()
id: number;

@Column()
  productName: string;
  @OneToMany(() => ProductReview , (ProductReview) => ProductReview.order)
  ProductReview: ProductReview[];
  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: CustomerEntity;
}
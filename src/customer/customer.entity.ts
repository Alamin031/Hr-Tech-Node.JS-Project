import { Order } from "src/order/Order.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("CustomerAdd")
export class CustomerEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
@OneToMany(() => Order, (order) => order.customer)
orders: Order[];
@OneToMany(() => ProductReview, (ProductReview) => ProductReview.customer)
ProductReview: ProductReview[];
}



@Entity("CustomerProductReview")
export class ProductReview{
@PrimaryGeneratedColumn()
id: number;
@Column()
Review: string;
@Column()
Date: Date;
@Column()
Product_Image: string;
@ManyToOne(() => CustomerEntity, (customer) => customer.ProductReview)
customer: CustomerEntity;
}

@Entity("Customer_Dman_Review")
export class Dman_Review{
@PrimaryGeneratedColumn()
id: number;
@Column()
Review: string;
@Column()
Date: Date;
}

@Entity("Customer_Assign_Product")
export class Assign_Product{
@PrimaryGeneratedColumn()
id: number;
@Column()
Problem: string;
@Column()
Date: Date;
@Column()
Pic: string;
}


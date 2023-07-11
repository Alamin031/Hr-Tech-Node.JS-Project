import {Order } from "src/order/Order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./customer_address.entity";


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
@Column()
filenames: string;
// @OneToOne(() => AddressEntity, (address) => address.customer)
@OneToMany(() => Order, (order) => order.customer)
orders: Order[];
@OneToMany(() => ProductReview, (ProductReview) => ProductReview.customer)
ProductReview: ProductReview[];
@OneToMany(() => Assign_Product, (Assign_Product) => Assign_Product.customer)
Assign_Product: Assign_Product[];

@OneToOne(() => AddressEntity, address => address.customer, { cascade: true })
@JoinColumn()
address: AddressEntity;
}


@Entity("CustomerProductReview")
export class ProductReview{
@PrimaryGeneratedColumn()
id: number;
@Column()
Review: string;
@Column()
Date: string;
// @Column()
// Product_Image: string;
@ManyToOne(() => CustomerEntity, (customer) => customer.ProductReview)
customer: CustomerEntity;
@ManyToOne(() => Order, (order) => order.ProductReview)
order: Order;
}

@Entity("Customer_Assign_Product")
export class Assign_Product{
@PrimaryGeneratedColumn()
id: number;
@Column()
Product_Name: string;
@Column()
Problem: string;
@Column()
Date: string;
@Column()
Pic: string;
@Column()
Address: string;
@ManyToOne(() => CustomerEntity, (customer) => customer.Assign_Product)
customer: CustomerEntity;
}

@Entity("Customer_DeliveryMan_Review")
export class DeliveryMan_Review{
@PrimaryGeneratedColumn()
id: number;
@Column()
Review: string;
@Column()
Date: string;
}

// @Entity("Customer_DeliveryMan_Assign_Product")
// export class DeliveryMan_Assign_Product{
// @PrimaryGeneratedColumn()
// id: number;
// @Column()
// Product_Name: string;
// @Column()
// Problem: string;
// @Column()
// Date: string;
// }


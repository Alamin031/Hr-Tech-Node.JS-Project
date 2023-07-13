import {Order } from "src/order/Order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./customer_address.entity";
import { ProductEntity } from "src/admin/admin.entity";


@Entity("CustomerAdd")
export class CustomerEntity{
@PrimaryGeneratedColumn()
customerid: number;
@Column( { name: 'first_name', type: 'varchar', length: 200 } )
firstName: string;

@Column( { name: 'last_name', type: 'varchar', length: 200 } )
lastName: string;
@Column( { name: 'username', type: 'varchar', length: 200 } )
username: string;
@Column( { name: 'date_of_birth', type: 'date'} )
dateOfBirth: Date;

@Column( { name: 'telephone_number', type: 'varchar', length: 200 } )
telephoneNumber: string;

@Column( { name: 'email', type: 'varchar', length: 200 } )
email: string;

@Column( { name: 'password', type: 'varchar', length: 200 } )
password: string;
@Column ( { name: 'profilePic', type: 'varchar', length: 255 } )
profilePic: string;
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
@ManyToOne(() => ProductEntity, (products) => products.ProductReview)
products: ProductEntity;
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


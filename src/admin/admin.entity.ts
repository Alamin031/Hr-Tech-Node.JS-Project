import { ProductReview } from "src/customer/customer.entity";
import { Order } from "src/order/Order.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity("Admin")
export class AdminEntity{
@Column()
name: string;
@PrimaryColumn()
email: string;
@Column()
password: string;
}

@Entity("Products")
export class ProductEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
Product_Name: string;
@Column()
Product_Brands_Name: string;
@Column()
Price: number;
@Column()
Description: string;
@Column()
Product_Image: string;
@Column()
Quantity: number;
@Column()
Product_Category: string;
@Column()
Status: string;
@ManyToOne(() => SupplierEntity, (Supplier) => Supplier.Product)
Supplier: SupplierEntity;
@OneToMany(() => Order, (order) => order.products)
orders: Order[];
@OneToMany(() => ProductReview, (ProductReview) => ProductReview.products)
ProductReview: ProductReview[];


}


@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  message: string;
}
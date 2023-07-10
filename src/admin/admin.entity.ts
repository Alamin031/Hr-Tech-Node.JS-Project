import { SupplierEntity } from "src/supplier/Supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("Admin")
export class AdminEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
}

@Entity("Products")
export class ProductEntity{
@PrimaryGeneratedColumn()
PRODUCT_ID: number;
@Column()
Product_Name: string;
@Column()
Product_Brands_Name: string;
@Column()
Price: string;
@Column()
Description: string;
@Column()
Product_Image: string;
@Column()
Quantity: string;
@Column()
Product_Category: string;
@ManyToOne(() => SupplierEntity, (Supplier) => Supplier.Product)
Supplier: SupplierEntity;

}



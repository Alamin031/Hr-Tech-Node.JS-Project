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
@ManyToOne(() => SupplierEntity, (Supplier) => Supplier.Product)
Supplier: SupplierEntity;
}



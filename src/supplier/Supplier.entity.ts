import { ProductEntity } from "src/admin/admin.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("Suppliers")
export class SupplierEntity{

    @PrimaryGeneratedColumn()
    Supplier_id: number;

    @Column()
    Supplier_name: string;

    @Column()
    Product_Brands_Name: string;
    @OneToMany(() => ProductEntity, (Product) => Product.Supplier)
    Product: ProductEntity[];
}
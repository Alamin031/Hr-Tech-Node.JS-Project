import { ProductEntity } from "src/admin/admin.entity";
import { CustomerEntity, DeliveryMan_Review, ProductReview } from "src/customer/customer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";



@Entity()
export class Order {
@PrimaryGeneratedColumn()
id: number;

@Column( { name: 'order_date', type: 'varchar', length: 255 } )
orderDate: string;

@Column( { name: 'order_status', type: 'varchar', length: 255 } )
orderStatus: string;
@Column()
totalAmount: number;

@Column( { name: 'shipping_address', type: 'varchar', length: 255 } )
shippingAddress: string;
  @OneToMany(() => ProductReview , (ProductReview) => ProductReview.order)
  ProductReview: ProductReview[];
  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  customer: CustomerEntity;
  @ManyToOne(() => ProductEntity, (products) => products.orders)
  products: ProductEntity;
  @OneToMany(() => DeliveryMan_Review, (DeliveryMan_Review) => DeliveryMan_Review.order)
  DeliveryMan_Review: DeliveryMan_Review[];
  

}
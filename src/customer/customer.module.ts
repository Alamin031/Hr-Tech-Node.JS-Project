import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assign_Product, CustomerEntity, Dman_Review, ProductReview } from "./customer.entity";
import { Order } from "src/order/Order.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";



@Module({
    imports: [ TypeOrmModule.forFeature([CustomerEntity,ProductReview,Dman_Review,Assign_Product,Order]),],
    controllers: [CustomerController],
    providers: [CustomerService],
  })
  export class CustomerModule {}
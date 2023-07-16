import { Module } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CustomerController } from "./customer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Assign_Product, CustomerEntity, DeliveryMan_Review, PinCodeEntity, ProductReview } from "./customer.entity";
import {Order } from "src/order/Order.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";
import { ProductEntity } from "src/admin/admin.entity";
import { AddressEntity } from "./customer_address.entity";



@Module({
    imports: [ TypeOrmModule.forFeature([CustomerEntity,ProductReview,DeliveryMan_Review,Assign_Product,Order,ProductEntity,AddressEntity,PinCodeEntity]),],
    controllers: [CustomerController],
    providers: [CustomerService],
  })
  export class CustomerModule {}
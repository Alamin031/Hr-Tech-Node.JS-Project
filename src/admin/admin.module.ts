import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity, ContactEntity, ProductEntity} from "./admin.entity";
import { Order } from "src/order/Order.entity";
import { CustomerEntity, ProductReview } from "src/customer/customer.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";




@Module({
  imports: [ TypeOrmModule.forFeature([AdminEntity,ProductEntity,SupplierEntity,Order,ProductReview,CustomerEntity,ContactEntity])],
  controllers: [AdminController],
    providers: [AdminService],
  })
  export class AdminModule {}
import { Injectable } from "@nestjs/common";
import { AdminDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity, ProductReview } from "src/customer/customer.entity";
import { Order } from "src/order/Order.entity";
import { Repository } from "typeorm";
import { ProductEntity, AdminEntity } from "./admin.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";
import { CustomerDTO } from "src/customer/customer.dto";


@Injectable()
export class AdminService{

    constructor(@InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>, 

    @InjectRepository(Order)
        private orderRepo: Repository<Order>,

    @InjectRepository(ProductReview)
    private ProductReviewRepo: Repository<ProductReview>,
    
    @InjectRepository(ProductEntity)
    private ProductRepo: Repository<ProductEntity>,

    @InjectRepository(SupplierEntity)
    private SupplierRepo: Repository<SupplierEntity>,

    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>
    ){}

    getIndex(): string{
        return "Hellow Aadmin";
    }
    getAdminById(id: number): object{
    return ({id: 2, name: "abc", age:30});
    }
    getAdminByName(mydata: AdminDTO): string{
    return mydata.name;
    }

    addAdmin(data: AdminDTO): object
    {
        return data;
    }
    // addAdmin(data: AdminDTO): string
    // {
    //     return data.email;
    // judi ami ekta valu print kori ta hole ei ta use korbo}

    geCustomerId(id:number): Promise<CustomerEntity>
    {
       console.log(id);
      return this.customerRepo.findOneBy({id:id});
   }

   
   getCustomerName(mydata: CustomerDTO): string{
       return mydata.name;
       }

}
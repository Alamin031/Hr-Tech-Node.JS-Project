import { Injectable } from "@nestjs/common";
import { CustomerDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewUpdateDTO } from "./customer.dto";
import { ReviewDTO } from "./review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CustomerEntity, ProductReview } from "./customer.entity";
import { promises } from "dns";
import { Order } from "src/order/Order.entity";

@Injectable()
export class CustomerService{

    constructor(@InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>, 

    @InjectRepository(Order)
        private orderRepo: Repository<Order>,

    @InjectRepository(ProductReview)
    private ProductReviewRepo: Repository<ProductReview>
    ){}


    geCustomerId(id:number): Promise<CustomerEntity>
     {
        console.log(id);
       return this.customerRepo.findOneBy({id:id});
    }




    getIndex(): string{
        return "Hellow HR";
    }
    
    getCustomerName(mydata: CustomerDTO): string{
        return mydata.name;
        }

    // addCustomer(data: CustomerDTO): object
    // {
    //     return data;
    // }



    async addCustomer(data: CustomerDTO): Promise<CustomerEntity> {
        return this.customerRepo.save(data);
    }

   

    addreview(data: ReviewDTO): object
    {
        return data;
    }
    updateCustomer(data: CustomerUpdateDTO): object
    {
        console.log(data.id);
        console.log(data.name);
        return data;
    }

    updateCustomerId(id:number,data: CustomerUpdateDTO): object
    {
        console.log(id);
        console.log(data);
        return data;
    }
    updateReview(data: ReviewUpdateDTO): object
    {
        console.log(data.id);
        console.log(data.review);
        return data;
    }

    updateReviewId(id:number,data: ReviewUpdateDTO): object
    {
       
        return data;
    }

    dupdateReview(data: DRevieweUpdateDTO): object
    {
       
        console.log(data.review);
        return data;
    }

    dupdateReviewId(id:number,data: DRevieweUpdateDTO): object
    {
        console.log(id);
        console.log(data);
        return data;
    }

    addreviewd(data: DRevieweDTO): object
    {
        return data;
    }

    DRevieweUpdateDTO(data: ReviewUpdateDTO): object {
        throw new Error("Method not implemented.");
    }




    async addOrders(order): Promise<Order> {
        return this.orderRepo.save(order);
    }

    
    async getOrders(id):Promise<CustomerEntity[]>
    {
        return this.customerRepo.find({
            where:{id:id},
            relations: {
                orders: true,
            },
        });
        if (!CustomerEntity) {
            throw new Error("Customer not found.");
        }      
            
    } 



    async getOrderssByCustomer(customerid: number): Promise<CustomerEntity[]> {
        return this.customerRepo.find({
            where: { id: customerid },
            relations:
             {
                orders: true,
            },
        });
    }

     DeleteAccount(id: number): any {
        this.orderRepo.delete(id);
        return {"Success":"Your Oeder Remove Successfully"};
    }
    


        async deleteOrder(orderId: number, customerId: number) {
            await this.orderRepo.delete({ id: orderId, customer: { id: customerId } });
          }


        
        //   async updateOrders(orderId: number, customerId: number, productName: string) {
        //     await this.orderRepo.update(
        //       { id: orderId, customer: { id: customerId } },
        //       { productName },
        //     );
        //   }


      









          


       // async deleteOrder(customerId: number, orderId: number) {
        // const customer = await this.customerRepo.findOne(customerId, {
        // relations: ["orders"],
        // });




        // async searchOrdersByCustomerId(customerId: number) {
        //     const customer = await this.customerRepository.findOne(customerId, {
        //     relations: ["orders"],
        //     });
            
        //     if (!customer) {
        //     throw new Error("Customer not found.");
        //     }
            
        //     return customer.orders;
        //     }
    

}
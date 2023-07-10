import { Injectable } from "@nestjs/common";
import { CustomerDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewUpdateDTO, ReviewDTO } from "./customer.dto";
// import { ReviewDTO } from "./review.dto";
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


// .....................Customer Profile Manage .....................//
// * Feature 1 : Register a new customer
    async register(data: CustomerDTO): Promise<CustomerEntity> {
        return this.customerRepo.save(data);
    }

// * Feature 2 : Update customer profile
    updateprofile(data: CustomerUpdateDTO): object
    {
        console.log(data.id);
        console.log(data.name);
        return data;
    }
    // * Feature 3 : Update customer profile by id
    updateprofileId(id:number,data: CustomerUpdateDTO): object
    {
        console.log(id);
        console.log(data);
        return data;
    }
    async UpdateProfileInfo(id: number, updated_data: CustomerUpdateDTO): Promise<CustomerEntity> {
        await this.customerRepo.update(id, updated_data); // Where to Update , Updated Data
        return this.customerRepo.findOneBy({id: id});
    }

// * Feature 4 : Delete customer profile by id
    DeleteAccount(id: number): any {
        this.customerRepo.delete(id);
        return {"Success":"Account Deleted Successfully"};
    }


  

    // .....................Customer Review Manage .....................//
   
// * Feature 1 : Add a Receive Product Review
    addreview(data: ReviewDTO): object
    {
        return data;
    }
//2 nd way
    async ProductReview(id:number,review_info: ReviewDTO) : Promise<ProductReview> {
        //! Problem : Current logged in Seller_ID is not being added to the book table by using session

        return this.ProductReviewRepo.save(review_info);
    }
//3 rd way
    async addreviews(review): Promise<ProductReview> {
        return this.ProductReviewRepo.save(review);
    }

// * Feature 2 : Update customer review
async UpdatereviewInfo(id:number, updated_data: ReviewDTO): Promise<ProductReview> {    
    await this.ProductReviewRepo.update(id, updated_data); // Where to Update , Updated Data
      return this.ProductReviewRepo.findOneBy({id: id});
    }
    
// * Feature 3 : Delete review Info
    DeletereviewInfo(id: number): any {
        this.ProductReviewRepo.delete(id);
        return {"Success":"Review Deleted Successfully"};
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

    DeleteOrder(id: number): any {
        this.orderRepo.delete(id);
        return {"Success":"Your Oeder Remove Successfully"};
    }
    


        async deleteOrder(orderId: number, customerId: number) {
            await this.orderRepo.delete({ id: orderId, customer: { id: customerId } });
          }



        //   async UpdateBookInfo(b_id:number, updated_data: BookDTO): Promise<BookEntity> {
        
        //     await this.bookRepository.update(b_id, updated_data); // Where to Update , Updated Data
        //     return this.bookRepository.findOneBy({Book_ID: b_id});
    
        // }

        
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
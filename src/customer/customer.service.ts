import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CustomerDTO, CustomerUpdateDTO, CustomerLoginDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewUpdateDTO, ReviewDTO, AssignProductDTO, CustomerPicDTO, editProductDTO } from "./customer.dto";
// import { ReviewDTO } from "./review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Assign_Product, CustomerEntity, DeliveryMan_Review, ProductReview } from "./customer.entity";
import { promises } from "dns";
import { Order } from "src/order/Order.entity";
import * as bcrypt from 'bcrypt';
import { ProductEntity } from "src/admin/admin.entity";
import { ProductDTO } from "src/admin/admin.dto";
import { AddressEntity } from "./customer_address.entity";
import { OrderDTO } from "src/order/order.dto";
import { existsSync } from "fs";
import { join } from "path";


@Injectable()
export class CustomerService{

    constructor(@InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>, 

    @InjectRepository(Order)
        private orderRepo: Repository<Order>,

    @InjectRepository(Assign_Product)
        private assignproductRepo: Repository<Assign_Product>,

    @InjectRepository(ProductEntity)
        private ProductsRepo: Repository<ProductEntity>,

    @InjectRepository(DeliveryMan_Review)
        private DeliveryMan_ReviewRepo: Repository<DeliveryMan_Review>,

        @InjectRepository(AddressEntity)
        private AddressRepo: Repository<AddressEntity>,

    @InjectRepository(ProductReview)
       private ProductReviewRepo: Repository<ProductReview>
    ){}
    

    geCustomerId(id:number): Promise<CustomerEntity>
     {
        console.log(id);
       return this.customerRepo.findOneBy({customerid:id});
    }



    getIndex(): string{
        return "Hellow HR";
    }
    
    getCustomerName(mydata: CustomerDTO): string{
        return mydata.username;
        }

    // addCustomer(data: CustomerDTO): object
    // {
    //     return data;
    // }


// .....................Customer Profile Manage .....................//
// * Feature 1 : Register a new customer
 async registerCustomer(data: CustomerDTO): Promise<CustomerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return await this.customerRepo.save(data);
}
// * Feature 2 : Login customer profile

async login(query:CustomerLoginDTO)
{
    const email = query.email;
    const password = query.password;
    const CustomerDetails = await this.customerRepo.findOneBy({ email : email });        
    if (CustomerDetails === null) {
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            message: "Member not found"
        })
    } else {
        if (await bcrypt.compare(password, CustomerDetails.password)) {
            return CustomerDetails;
        } else {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                message: "Password does not match"
            })
        }
    }
}
// * Feature 3 : Update customer profile

    async updateprofile(data: CustomerUpdateDTO): Promise<CustomerEntity> {
        const { customerid, ...updateData } = data;
        // Find the customer profile that we want to update
        const customer = await this.customerRepo.findOneBy({ customerid });
        if (!customer) {
          throw new NotFoundException('Customer not found');
        }
        // Update the customer's profile with the provided data
        Object.assign(customer, updateData);
        // Save the updated customer entity
        const updatedCustomer = await this.customerRepo.save(customer);
        return updatedCustomer;
      }
    
// * Feature 4 : Update customer profile by id
   
    async UpdateProfileInfo(id: number, updated_data: CustomerUpdateDTO): Promise<CustomerEntity> {
        await this.customerRepo.update(id, updated_data); // Where to Update , Updated Data
        return this.customerRepo.findOneBy({customerid: id});
    }

// * Feature 5 : Delete customer profile by id
    DeleteAccount(id: number): any {
        this.customerRepo.delete(id);
        return {"Success":"Account Deleted Successfully"};
    }

// * Feature 6: View Customer Profile
    async ViewCustomerProfile(id: number): Promise<CustomerEntity> {
        return this.customerRepo.findOneBy({customerid: id});
}
//Now Run this Query in Postman
    async showProfileDetails(CustomerID) {
        return await this.customerRepo.findOneBy({ customerid : CustomerID });
}
// * Feature 8 : View Customer Images
//Now Run this Query in Postman
    async getimagebycustomerid(customerId:number) {
        const mydata:CustomerPicDTO =await this.customerRepo.findOneBy({ customerid:customerId});
        console.log(mydata);
        return  mydata.profilePic;
    }
// Now Stop
    // async getimagebyassignproductidd(customerId:number): Promise<any> {
    //         const mydata:CustomerPicDTO =await this.customerRepo.findOneBy({ customerid:customerId});
    //         console.log(mydata);
    //         return  mydata.profilePic;
    // }

    async showProfileDetailss(customerid) {
        const mydata:CustomerPicDTO =await this.customerRepo.findOneBy({ customerid:customerid});
        console.log(mydata);
        return  mydata.profilePic;
    }

// * Feature 9: Logout
async Logout(id: number): Promise<any> {
    const currentSeller = this.customerRepo.findOneBy({customerid: id});
    if(currentSeller){
        // TODO: Destroy Session
        return "Logout Successfully";
    }else{
        return "Logout Failed";
    }
}
// * Feature 9: Forgot Password
async ForgotPassword(data: CustomerDTO): Promise<CustomerEntity> {
    return this.customerRepo.save(data);
}

// // * Feature 10: Customer Add Address
// async AddAddress(data: AddressEntity): Promise<AddressEntity> {
//     return this.AddressRepo.save(data);
// }

// Feature 10 : Customer Add Address
async createAddress(customer: CustomerEntity, address: AddressEntity): Promise<CustomerEntity> {
    address.customer = customer; //assign customer object to address object 
    await this.AddressRepo.save(address);
    return this.customerRepo.save(customer);
    }

// Feature 11 : Customer Update Address
async UpdateAddressInfo(id:number, updated_data: AddressEntity): Promise<AddressEntity> {
    await this.AddressRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.AddressRepo.findOneBy({id: id});
}

    


  





    // .....................Customer Product Review Manage .....................//
   
// * Feature 1 : Add a Receive Product Review

//1 nd way
    async ProductReview(id:number,review_info: ReviewDTO) : Promise<ProductReview> {
        return this.ProductReviewRepo.save(review_info);
    }
//2 nd way
    async addreview(data: ReviewDTO): Promise<ProductReview> {
        return this.ProductReviewRepo.save(data);
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
 // .....................Customer Assign_Product Manage .....................//

    // * Feature 1 :  customer assignproduct
    async assignproduct(data: AssignProductDTO): Promise<Assign_Product> {
        const salt = await bcrypt.genSalt();
       return this.assignproductRepo.save(data);
    }
 

// Feature 2 : Update Assign_Product Info
async UpdateAssignProductInfo(id:number, updated_data: AssignProductDTO): Promise<Assign_Product> {
    await this.assignproductRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.assignproductRepo.findOneBy({id: id});
}

// Feature 3 : Delete Assign_Product Info
DeleteAssignProductInfo(id: number): any {
    this.assignproductRepo.delete(id);
    return {"Success":"Assign_Product Deleted Successfully"};
}

// Feature 4 : View Assign_Product Info
async ViewAssignProductInfo(id: number): Promise<Assign_Product> {
    return this.assignproductRepo.findOneBy({id: id});
}

// // Feature 7 : View All Assign_Product Info
// async ViewAllAssignProductInfo(): Promise<Assign_Product[]> {
//     return this.assignproductRepo.findAll();
// }

// Feature 6 : View Assign_Product Images
async getimagebyassignproductid(assignproductId:number) {
    const mydata:AssignProductDTO =await this.assignproductRepo.findOneBy({ id:assignproductId});
    console.log(mydata);
    return  mydata.Pic;
        }

        // Feature 6 : View Assign_Product Images And All Info
async getimagebyassignproductidandallinfo(assignproductId:number) {
    const mydata:AssignProductDTO =await this.assignproductRepo.findOneBy({ id:assignproductId});
    console.log(mydata);
    return  mydata;
        }

      // Feature 7 : Who Customer add Assign_Product

        async getassignproductbycustomerid(id):Promise<CustomerEntity[]>{
        return this.customerRepo.find({
            where:{customerid:id},
            relations: {
                Assign_Product: true,
            },
        });                 
    } 

    // .....................Customer product  Manage .....................//

// * Feature 1 : find all product
async findAll(): Promise<ProductEntity[]> {
    return this.ProductsRepo.find();
}

async ViewAllProductInfo(): Promise<ProductEntity[]> {
    return this.ProductsRepo.find();
}



    // .....................Customer DeliveryMan Review Manage .....................//
// * Feature 1 : Add a customer DeliveryMan Review
    async adddeliverymanreview(data: DRevieweDTO): Promise<DeliveryMan_Review> {
        return this.DeliveryMan_ReviewRepo.save(data);
    }

// * Feature 2 : Update customer DeliveryMan Review
async UpdateDeliveryManReviewInfo(id:number, updated_data: DRevieweDTO): Promise<DeliveryMan_Review> {
    await this.DeliveryMan_ReviewRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.DeliveryMan_ReviewRepo.findOneBy({id: id});
}

// * Feature 3 : Delete DeliveryMan Review Info
DeleteDeliveryManReviewInfo(id: number): any {
    this.DeliveryMan_ReviewRepo.delete(id);
    return {"Success":"DeliveryMan Review Deleted Successfully"};
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
       
        console.log(data.Review);
        return data;
    }

    dupdateReviewId(id:number,data: DRevieweUpdateDTO): object
    {
        console.log(id);
        console.log(data);
        return data;
    }

    // addreviewd(data: DRevieweDTO): object
    // {
    //     return data;
    // }

    DRevieweUpdateDTO(data: ReviewUpdateDTO): object {
        throw new Error("Method not implemented.");
    }



    async addOrders(order): Promise<Order> {
        return this.orderRepo.save(order);
    }

    
    async getOrders(id):Promise<CustomerEntity[]>
    {
        return this.customerRepo.find({
            where:{customerid:id},
            relations: {
                orders: true,
            },
        });                 
    } 



    async getOrderssByCustomer(customerid: number): Promise<CustomerEntity[]> {
        return this.customerRepo.find({
            where: { customerid: customerid },
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
            await this.orderRepo.delete({ id: orderId, customer: { customerid: customerId } });
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
        // async productadd(data: ProductDTO): Promise<ProductEntity> {
        //     const salt = await bcrypt.genSalt();
        //    return this.ProductsRepo.save(data);
        // }



        
    // async getUserWithProfile(id: number): Promise<CustomerEntity> {
    //     return this.customerRepo.findOneBy(id, { relations: ['address'] });
    //     }



    // async searchOrder(orderID) {
    //     const orders = await this.orderRepo.findOneBy( { id: orderID } );
    //                 return (`
    //                 --------------------------------------------------
    //                 Order ID: ${orders.id}
    //                 Customer ID: ${orders.customer}
    //                 Order productName: ${orders.productName}
    //                 Order ProductReview: ${orders.ProductReview}
    //                 --------------------------------------------------
    //                 `);

    // }     
        
    // async addToCart(customerID, query: editProductDTO, order: OrderDTO) {
    //     const editProduct = query.editProduct;
    //     const product = await this.ProductsRepo.findOneBy({ id: editProduct });
    //     const member = await this.customerRepo.findOneBy(customerID);
    //     // order.customer = customerID;
    //     const now = new Date();
    //     const date = now.getDate();
    //     const month = now.getMonth();
    //     const year = now.getFullYear();
    //     order.orderDate = `${date}/${month}/${year}`;
    //     order.orderStatus = "Pending";
    //     order.products = product.Product_Name;
    //     order.totalAmount = product.Price;
    //     return this.orderRepo.save(order);
    // }

}
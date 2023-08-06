import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CustomerDTO, CustomerUpdateDTO, CustomerLoginDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewUpdateDTO, ReviewDTO, AssignProductDTO, CustomerPicDTO, editProductDTO, AddAddressDTO } from "./customer.dto";
// import { ReviewDTO } from "./review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Assign_Product, CustomerEntity, DeliveryMan_Review, PinCodeEntity, ProductReview } from "./customer.entity";
import { promises } from "dns";
import { Order } from "src/order/Order.entity";
import * as bcrypt from 'bcrypt';
import { ProductEntity } from "src/admin/admin.entity";
import { ProductDTO } from "src/admin/admin.dto";
import { AddressEntity } from "./customer_address.entity";
import { OrderDTO } from "src/order/order.dto";
import { existsSync } from "fs";
import { join } from "path";




// import { MailerService } from '@nestjs-modules/';



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
       private ProductReviewRepo: Repository<ProductReview>,
       @InjectRepository(PinCodeEntity) private pincodeRepository: Repository<PinCodeEntity>,

    //    private mailerService: MailerService

    ){}


// .....................Customer Profile Manage .....................//
// * Feature 1 : Register a new customer
   async registerCustomer(data: CustomerDTO): Promise<CustomerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return await this.customerRepo.save(data);
}

async registerCustomerr(data: CustomerDTO): Promise<CustomerEntity> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    return await this.customerRepo.save(data);
  }

  async findByEmail(email: string): Promise<CustomerEntity | undefined> {
    return this.customerRepo.findOneBy({ email });
  }

  async findByUsername(username: string): Promise<CustomerEntity | undefined> {
    return this.customerRepo.findOneBy({ username });
  }


async uploadFile(data: CustomerDTO): Promise<CustomerEntity> {
    return await this.customerRepo.save(data);
}


// * Feature 2 : Login customer profile

    async login(query:CustomerLoginDTO){
        const email = query.email;
        const password = query.password;
        const username = query.username;
        const CustomerDetails = await this.customerRepo.findOneBy({ email : email });
        
        if (CustomerDetails === null) {
            throw new NotFoundException
            ({
            status: HttpStatus.NOT_FOUND,
            message: "Your Account Not found. Please Register First"
        })}
        else if (CustomerDetails.username !== username) {
            throw new NotFoundException
            ({
            status: HttpStatus.NOT_FOUND,
            message: "Your Account Not found. Please Register First"
        })}
        else {
            if (await bcrypt.compare(password, CustomerDetails.password)) {
            return CustomerDetails;
        } 
        
        else {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                message: "Password does not match"
            })
        }
    }

}




// async signIn(data: CustomerLoginDTO): Promise<boolean> {

//     const userData = await this.customerRepo.findOneBy({ email: data.email });
//     if (userData !== undefined) {
//       const match: boolean = await bcrypt.compare(data.password, userData.password);
//       return match;
//     }
  
//     return false;
//   }


async Loginn (data:CustomerLoginDTO): Promise<CustomerEntity> {
    const email = data.email;
    const password = data.password;
    const username = data.username;
    const CustomerDetails = await this.customerRepo.findOneBy({ email : email });
        
        if (CustomerDetails === null) {
            throw new NotFoundException
            ({
            status: HttpStatus.NOT_FOUND,
            message: "Your Account Not found. Please Register First"
        })}
        else if (CustomerDetails.username !== username) {
            throw new NotFoundException
            ({
            status: HttpStatus.NOT_FOUND,
            message: "Your user name Not found. Please Register First"
        })}
        else {
            if (await bcrypt.compare(password, CustomerDetails.password)) {
            return CustomerDetails;
        } 
        
        else {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                message: "Password does not match"
            })
        }
    }

}

// async Logout(@Session() session, email: string) {
//     const Search = await this.customerRepo.find({
//       select: {
//         name: true,
//         id: true,
//         password: false
//       },
//       where: {
//         email: email,
//       }
//     });
  
//     session.destroy();
//     return "Logout Successfully";
//   }

// * Feature 3 : View Customer Profile
async ViewCustomerProfile(id: number): Promise<CustomerEntity> {
    return this.customerRepo.findOneBy({customerid: id});
}
//Now Run this Query in Postman
async showProfileDetails(CustomerID) {
    return await this.customerRepo.findOneBy({ customerid : CustomerID });
}


// * Feature 4 : Update customer profile
async UpdateProfileInfo(id: number, updated_data: CustomerUpdateDTO): Promise<CustomerEntity> {
    await this.customerRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.customerRepo.findOneBy({customerid: id});
}

// * Feature 5 : Update customer profile pic
async UpdateProfilePic(id: number, updated_data: CustomerPicDTO): Promise<CustomerEntity> {
    await this.customerRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.customerRepo.findOneBy({customerid: id});
}
// * Feature 6 : Delete customer profile 
    DeleteAccount(id: number): any {
        this.customerRepo.delete(id);
        return {"Success":"Your Account Deleted Successfully"};
    }

    // delete customer account by id




// * Feature 7 : View Customer Images
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

// * Feature 8: Logout
    async Logout(id: number): Promise<any> {
        const currentCustomer = this.customerRepo.findOneBy({customerid: id});
        if(currentCustomer){
        return "Logout Successfully";    // Destroy Session BUT NOT WORKING
    }
    else{
        return "Logout Failed";
    }
}
// * Feature 9: Forgot Password
    async ForgotPassword(data: CustomerDTO): Promise<CustomerEntity> {
        return this.customerRepo.save(data);
}

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


// async AddAddress(data: AddressEntity): Promise<AddressEntity> {
//     return this.AddressRepo.save(data);
// }

 // async AddAddress(id: number, address_info: AddAddressDTO): Promise<AddressEntity> {
    //     return this.AddressRepo.save(address_info);
    // }


// Feature 12 : Customer Delete Address
DeleteAddressInfo(id: number): any {
    this.AddressRepo.delete(id);
    return {"Success":"Address Deleted Successfully"};
}


// .....................Customer Product Review Manage .....................//
   
// * Feature 13 : Add a Receive Product Review
//now run this query in postman
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
// * Feature 14 : Update customer review
async UpdatereviewInfo(id:number, updated_data: ReviewDTO): Promise<ProductReview> {    
    await this.ProductReviewRepo.update(id, updated_data); // Where to Update , Updated Data
      return this.ProductReviewRepo.findOneBy({id: id});
    }

    // Feature 16 : view review by id
    async ViewReviewInfo(id: number): Promise<ProductReview> {
        return this.ProductReviewRepo.findOneBy({id: id});
    }

// * Feature 15 : Delete review Info
    DeletereviewInfo(id: number): any {
        this.ProductReviewRepo.delete(id);
        return {"Success":"Review Deleted Successfully"};
    }

// * Feature 16 : View  Review Info
    async getreviews(customerid):Promise<CustomerEntity[]> {
        console.log(customerid);
        return this.customerRepo.find({
            where:{customerid:customerid},
            relations: {
                ProductReview: true,
            },
        });                 
    }
  

    // Feature 17 : View  Review By Product Id
    async getreviewbyproductid(productid):Promise<ProductEntity[]> {
        console.log(productid);
        return this.ProductsRepo.find({
            where:{id:productid},
            relations: {
                ProductReview: true,
            },
        });
    }



   
    




 // .....................Customer Assign_Product Manage .....................//

    // * Feature 16 :  customer assignproduct
    async assignproduct(data: AssignProductDTO): Promise<Assign_Product> {
        const salt = await bcrypt.genSalt();
       return this.assignproductRepo.save(data);
    }
 

// Feature 17 : Update Assign_Product Info
async UpdateAssignProductInfo(id:number, updated_data: AssignProductDTO): Promise<Assign_Product> {
    await this.assignproductRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.assignproductRepo.findOneBy({id: id});
}

// // Feature 17 : Update Assign_Product Info
// async UpdateAssignProductInfo(id:number, updated_data: AssignProductDTO): Promise<Assign_Product> {
//     await this.assignproductRepo.update(id, updated_data); // Where to Update , Updated Data
//     return this.assignproductRepo.findOneBy({id: id});
// }

// Feature 18 : Delete Assign_Product Info
DeleteAssignProductInfo(id: number): any {
    this.assignproductRepo.delete(id);
    return {"Success":"Assign_Product Deleted Successfully"};
}

  // * Feature 17 : veiw assign product by customer id
  async getproblemsProduct(customerid):Promise<CustomerEntity[]> {
    console.log(customerid);
    return this.customerRepo.find({
        where:{customerid:customerid},
        relations: {
            Assign_Product: true,
        },
    });
}

// Feature 19 : View Assign_Product Info
async ViewAssignProductInfo(id: number): Promise<Assign_Product> {
    return this.assignproductRepo.findOneBy({id: id});
}

// // Feature 7 : View All Assign_Product Info
// async ViewAllAssignProductInfo(): Promise<Assign_Product[]> {
//     return this.assignproductRepo.findAll();
// }

// Feature 20 : View Assign_Product Images
async getimagebyassignproductid(assignproductId:number) {
    const mydata:AssignProductDTO =await this.assignproductRepo.findOneBy({ id:assignproductId});
    console.log(mydata);
    return  mydata.Pic;
        }

// Feature 21 : View Assign_Product Images And All Info
    async getimagebyassignproductidandallinfo(assignproductId:number) {
    const mydata:AssignProductDTO =await this.assignproductRepo.findOneBy({ id:assignproductId});
    console.log(mydata);
    return  mydata;
        }

// Feature 22 : Who Customer add Assign_Product

        async getassignproductbycustomerid(id):Promise<CustomerEntity[]>{
        return this.customerRepo.find({
            where:{customerid:id},
            relations: {
                Assign_Product: true,
            },
            
        }); 
        
                
    } 

    // .....................Customer product  Manage .....................//

// * Feature 23 : find all product
async findAll(): Promise<ProductEntity[]> {
    return this.ProductsRepo.find();
}

async ViewAllProductInfo(): Promise<ProductEntity[]> {
    return this.ProductsRepo.find();
}
async searchproduct(id: number): Promise<ProductEntity> {
      
    return this.ProductsRepo.findOneBy({ id });

}



    // .....................Customer DeliveryMan Review Manage .....................//

// * Feature 24 : Add a customer DeliveryMan Review
    async adddeliverymanreview(data: DRevieweDTO): Promise<DeliveryMan_Review> {
        return this.DeliveryMan_ReviewRepo.save(data);
    }

// * Feature 25 : Update customer DeliveryMan Review
async UpdateDeliveryManReviewInfo(id:number, updated_data: DRevieweDTO): Promise<DeliveryMan_Review> {
    await this.DeliveryMan_ReviewRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.DeliveryMan_ReviewRepo.findOneBy({id: id});
}

// * Feature 26 : Delete DeliveryMan Review Info
DeleteDeliveryManReviewInfo(id: number): any {
    this.DeliveryMan_ReviewRepo.delete(id);
    return {"Success":"DeliveryMan Review Deleted Successfully"};
}

async Updateorder(id: number, updated_data: OrderDTO): Promise<Order> {
    await this.orderRepo.update(id, updated_data); // Where to Update , Updated Data
    return this.orderRepo.findOneBy({id: id});
}
   



async addOrders(order): Promise<Order> {
    return this.orderRepo.save(order);
}



async getOrders(customerid):Promise<CustomerEntity[]> {
    console.log(customerid);
    return this.customerRepo.find({
        where:{customerid:customerid},
        relations: {
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

      async ViewAllorderInfo(): Promise<Order[]> {
        return this.orderRepo.find();
    }

    //show review by customer id
    async getreviewbycustomerid(customerid):Promise<CustomerEntity[]> {
        console.log(customerid);
        return this.customerRepo.find({
            where:{customerid:customerid},
            relations: {
                ProductReview: true,
            },
        });
    }


      async ForgetPassword(email: string){
        // * Generate 6 Digit Code Pin
        const generatePin = (): string => (Math.floor(Math.random() * 900000) + 100000).toString();
      
        const current_customer = await this.customerRepo.findOneBy({ email: email });
        let user_has_pin = await this.pincodeRepository.findOneBy({ customer: await current_customer });
      
        // ! Save the Pin in the Database => Not Working
        if (user_has_pin) {
          // update
          user_has_pin.Pin_Code = generatePin();
          await this.pincodeRepository.update(user_has_pin.Pin_ID, user_has_pin);
        } else {
          // create
          user_has_pin = {
            Pin_ID: undefined, // Pin_ID is autogenerated by the database
            Pin_Code: generatePin(),
            customer: await current_customer,
          };
          await this.pincodeRepository.create(user_has_pin);
        }
      
        // * Customer Email to the Customer
        
  const emailSubject = 'Password Reset Verification Code';
  const emailBody = `
Dear customer,
You have requested to reset your password for your account:

Verification Code: ${user_has_pin.Pin_Code}
Please enter this code on the password reset page to verify your identity. This code will expire after a certain duration for security purposes.
Best regards,
Hr Tech Team
`;


                        // return await this.mailerService.sendMail({
                        //     to: email,
                        //     subject: emailSubject,
                        //     text: emailBody,
                        //   });
      }
//   OTPSendEmail(email: string): any {
//     const buffer = randomBytes(2);
//     const otpCode = buffer.readUInt16BE(0) % 10000;
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'mridoy031@gmail.com',
//         pass: 'xwianrfxkmlevxhb',
//       },
//     });

//     const mailOptions = {
//       from: 'mridoy031@gmail.com',
//       to: email,
//       subject: 'YOUR OTP CODE',
//       text: `Your OTP CODE: ${otpCode}. Do not share your OTP CODE.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

//     return { otpCode };
//   }





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
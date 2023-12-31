import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpException, HttpStatus, NotAcceptableException, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Request, Res, Session, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddAddressDTO, AssignProductDTO, CustomerDTO, CustomerPicDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ForgetPassword, ReviewDTO, ReviewUpdateDTO, editProductDTO } from "./customer.dto";
import { CustomerService } from "./customer.service";
// import { ReviewDTO } from "./review.dto";
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { MulterError, diskStorage } from "multer";
import { AdminDTO } from "src/admin/admin.dto";
import { CustomerEntity } from "./customer.entity";
import { AddressEntity } from "./customer_address.entity";
import session from "express-session";
import { SessionGuard } from "./session.gaurd";
import { OrderDTO } from "src/order/order.dto";
import { ProductEntity } from "src/admin/admin.entity";
import { Order } from "src/order/Order.entity";


@Controller('customer')
export class CustomerController{
   

    constructor(private readonly customerService: CustomerService){}
   
  
// .....................Customer Profile Manage .....................

// * Feature 1 : Register a new customer
  // Registration
  @Post('/registration')
  @UsePipes(new ValidationPipe)
  @UseInterceptors(FileInterceptor('profilePicture',
  { fileFilter(req, file, callback) {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          callback(null, true);
      } 
      else {
          callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'profilePicture'), false)
      }
  },
  limits: { fileSize: 1000000 },
  storage:diskStorage({
      destination: './uploads/customer_register_img',
      filename(req, file, callback) {
          callback(null, Date.now() + file.originalname)
      },
  })
  }))
  async registerCustomer(@Session() session, @Body() data:CustomerDTO, @UploadedFile() profilePicture: Express.Multer.File) {
    data.profilePic = profilePicture.filename;
    // data.profilePic = profilePicture ? profilePicture.filename : null;
    if (!profilePicture || !profilePicture.filename) {
        throw new BadRequestException('Profile picture is required.');
      }
  

    console.log(profilePicture)
      if (data.password !== data.confirmPassword) {
          throw new ForbiddenException({
              status: HttpStatus.FORBIDDEN,
              message: "Password and confirm password does not match."
          });
      }
      const CustomerDetails = await this.customerService.registerCustomer(data);
      session.CustomerID = CustomerDetails.customerid;
      session.email = CustomerDetails.email;
      session.password = CustomerDetails.password;
      console.log(session.email);
      console.log(session.CustomerID);
      console.log(session.password);
      console.log(data);
    //   return this.customerService.registerCustomer(data);
      return "Hello Customer Your Registration successful";
  }


  @Post('/registrationn')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('profilePicture', {
    fileFilter(req, file, callback) {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        callback(null, true);
      } else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'profilePicture'), false)
      }
    },
    limits: { fileSize: 1000000 },
    storage: diskStorage({
      destination: './uploads/customer_register_img',
      filename(req, file, callback) {
        callback(null, Date.now() + file.originalname)
      },
    })
  }))
  async registerCustomerr(@Session() session, @Body() data: CustomerDTO, @UploadedFile() profilePicture: Express.Multer.File) {
    data.profilePic = profilePicture.filename;
    if (!profilePicture || !profilePicture.filename) {
      throw new BadRequestException('Profile picture is required.');
    }
    console.log(profilePicture)
      if (data.password !== data.confirmPassword) {
          throw new ForbiddenException({
              status: HttpStatus.FORBIDDEN,
              message: "Password and confirm password does not match."
          });
      }

         // Check if the email is already registered
    const existingEmailCustomer = await this.customerService.findByEmail(data.email);
    // Check if the username is already taken
    const existingUsernameCustomer = await this.customerService.findByUsername(data.username);

    if (existingEmailCustomer && existingUsernameCustomer) {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'Email and Username are already associated with existing accounts.'
      });
    } else if (existingEmailCustomer) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Email is already associated with an existing account.'
      });
    } else if (existingUsernameCustomer) {
      throw new NotAcceptableException({
        status: HttpStatus.NOT_ACCEPTABLE,
        message: 'Username is already taken.'
      });
    }

    const customerDetails = await this.customerService.registerCustomerr(data);  
    session.customerId = customerDetails.customerid;
    session.email = customerDetails.email;
    session.password = customerDetails.password;
    console.log(session.email);
    console.log(session.customerId);
    console.log(session.password);
    console.log(data);

    return 'Hello Customer, Your registration was successful.';
  }


  // * Feature 2 : Login customer

  @Post('/login')
   async login(@Query() query:CustomerDTO, @Session() session) {
   const CustomerDetails = await this.customerService.login(query);
   session.CustomerID = CustomerDetails.customerid;
   session.email = CustomerDetails.email;
   session.profilePicture = CustomerDetails.profilePic;
   console.log(session.CustomerID);
   return "Login successfull";
}
@Post('/signin')
async Loginn(@Body() data:CustomerDTO, @Session() session) {
    const CustomerDetails = await this.customerService.Loginn(data);
    session.CustomerID = CustomerDetails.customerid;
    session.email = CustomerDetails.email;
    session.profilePicture = CustomerDetails.profilePic;
    console.log(session.CustomerID);
    return "Login successfull";
}


@Post('/signout')
// @UseGuards(SessionGuard)
signout( @Req() req) {
    if (req.session.destroy()) {
        return true;
    }
    else {
        throw new UnauthorizedException("invalid actions");
    }
}

@Get('/getuser/:email')
async getAdminByEmail(email: string): Promise<CustomerEntity> {
    const res = await this.customerService.getAdminByEmail(email);
    if (res !== null) {
        return await this.customerService.getAdminByEmail(email);
    }
    else {
        throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
}

// show admin profil details by email
@Get('/showprofile/:email')
// @UseGuards(SessionGuard)
    showAdminProfileDetails(@Session() session) {
    // console.log(session.email);
    return this.customerService.showAdminProfileDetails(session.email);
}
@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads/customer_register_img' })
}


// * Feature 3 : view customer profile
    @Get('/showprofiledetails')
    @UseGuards(SessionGuard)
    showProfileDetails(@Session() session) {
        return this.customerService.showProfileDetails(session.CustomerID);
}

// * Feature 4 : Update customer profile
@Put('/update_profile_info')
@UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    UpdateProfileInfo( @Session() session, @Body() updated_data:CustomerUpdateDTO): object{
        return this.customerService.UpdateProfileInfo(session.CustomerID,updated_data);
    }

    // * Feature 5 : Update customer profile pic
@Put('/update_profile_pic')
@UseGuards(SessionGuard)
@UseInterceptors(FileInterceptor('profilePicture',
{ fileFilter(req, file, callback) {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
        callback(null, true);
    } else {
        callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false)
    }
},
limits: { fileSize: 1000000 },
storage:diskStorage({
    destination: './uploads/customer_register_img',
    filename(req, file, callback) {
        callback(null, Date.now() + file.originalname)
    },
})
}))
async UpdateProfilePic(@Session() session, @Body() updated_data:CustomerPicDTO, @UploadedFile() profilePicture: Express.Multer.File) {
    updated_data.profilePic = profilePicture.filename;
    return this.customerService.UpdateProfilePic(session.CustomerID,updated_data);
}


// * Feature 6 : Delete customer profile 
@Delete('/DeleteAccount')
// @UseGuards(SessionGuard)
    DeleteAccount(@Session() session) {
     return this.customerService.DeleteAccount(session.CustomerID);
}
// * Feature 7 : View Customer Images
  @Get('getimagebycustomerid/:customerId')
//   @UseGuards(SessionGuard)
    async getimagebyid(@Param('customerId', ParseIntPipe) customerId:number, @Res() res){
    const filename = await this.customerService.getimagebycustomerid(customerId);
    res.sendFile(filename, { root: './uploads/customer_register_img' })

}
// * Feature 7 : View Customer Images  by email
@Get('getimagebyemail/:email')
//   @UseGuards(SessionGuard)
async getimagebyemail(@Param('email') email:string, @Res() res){
const filename = await this.customerService.getimagebyemail(email);
res.sendFile(filename, { root: './uploads/customer_register_img' })
    
    }


// show product image by id
@Get('/getproductimgbyid/:ProductId')
    async getproductimgbyid(@Param('ProductId', ParseIntPipe) ProductId:number, @Res() res){
    const filename = await this.customerService.getproductimgbyid(ProductId);
    res.sendFile(filename, { root: './uploads/assignproduct' })

}










@Get('/showprofilepicture1')
@UseGuards(SessionGuard)
showProfileDetailss(@Session() session) {
return this.customerService.showProfileDetailss(session.CustomerID);
}

//problem part
@Get('/showprofilepicture')
    @UseGuards(SessionGuard)
     async getimagebyassignproductidd(@Param('customerId')customerId, @Session() session, @Res() res){
        const filename = session.profilePic;
        res.sendFile(filename, { root: './uploads/customer_register_img' });
        // return this.customerService.getimagebyassignproductidd(customerId);
    }


 // * Feature 8 : Logout
 @Post('/logout')
 @UseGuards(SessionGuard)
 Logout(@Session() session): object{
     return this.customerService.Logout(session.CustomerID);
 }
// @Post('/signout')
// @UseGuards(SessionGuard)
// async logout(@Session() session) {
//   return this.customerService.Logout(session,session.email);
// }


// .....................Customer Address Manage .....................

// * Feature 1 : Add a new address
// @Post('/add_address')
// @UsePipes(new ValidationPipe())
// addAddress(@Body() data:CustomerDTO):object {
// console.log(data);
// return this.customerService.addAddress(data);
// }

// Feature 10 : Customer Add Address
@Post('/add_address/:id')
// @UseGuards(SessionGuard)
async createAddress(@Param('id', ParseIntPipe) data: { customer: CustomerEntity, address: AddressEntity }): Promise<CustomerEntity> {
  const { customer, address } = data;
  return this.customerService.createAddress(customer, address);
}

// * Feature 18 : Add Address                              sudu address add karanawa
// @Post('/profile/add_address/:id')
// @UsePipes(new ValidationPipe())
// AddAddress(@Param('id', ParseIntPipe) id:number, @Body() address_info:AddAddressDTO): object{
//     return this.customerService.AddAddress(id,address_info);
// }


// @Get('/getaddress/:id')
//   async getUserWithProfile(@Param('id') id: number): Promise<CustomerEntity> {
//     return this.customerService.getUserWithProfile(id);
//   }

// // * Feature 2 : Update address Info
// @Put('/update_address_info/:id')
// @UsePipes(new ValidationPipe())
// UpdateAddressInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:CustomerDTO): object{
//     return this.customerService.UpdateAddressInfo(id,updated_data);
// }




    // .....................Customer Review Manage .....................//
// //now run this query in postman
// @Post('/add_review')
// @UseGuards(SessionGuard)
// @UsePipes(new ValidationPipe())
// ProductReview(@Session() session, @Body() data:ReviewDTO):object {
//         console.log(data);
//         return this.customerService.ProductReview(session.CustomerID, data);
// }
// add review by customer id
@Post('/addreviewbycustomerid/:customerId')
@UsePipes(new ValidationPipe())
ProductReview(@Param('customerId', ParseIntPipe) customerId:number, @Body() review) {
    console.log(review);
    return this.customerService.ProductReview(customerId,review);
}

// add review by order id
@Post('/addreviewbyorderid/:orderId')
@UsePipes(new ValidationPipe())
ProductReviewbyorderid(@Param('orderId', ParseIntPipe) orderId:number, @Body() review) {
    console.log(review);
    return this.customerService.ProductReviewbyorderid(orderId,review);
}

@Post('/addreviews')
addreviews(@Body() review) {
    console.log(review);
    return this.customerService.addreviews(review);
}

// * Feature 2 : Update review Info
@Put('/update_review_info/:id')
// @UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
UpdatereviewInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:ReviewUpdateDTO): object{
    return this.customerService.UpdatereviewInfo(id,updated_data);
}

// * Feature 3 : Delete review Info
@Delete('/delete_review/:id')
// @UseGuards(SessionGuard)
DeletereviewInfo(@Param('id', ParseIntPipe) id:number): number{
    return this.customerService.DeletereviewInfo(id);
}

@Get('/getreviews')
    @UseGuards(SessionGuard)
    getreviews(@Session() session) {
     return this.customerService.getreviews(session.CustomerID);
}

//show review by customer id
@Get('/getreviewbycustomerid/:customerId')
getreviewbycustomerid(@Param('customerId', ParseIntPipe) customerId:number) {
    console.log(customerId);
    return this.customerService.getreviewbycustomerid(customerId);
}





    // .....................Customer Assign_Product Manage .....................//
// // * Feature 1 : Add a customer Assign_Product
  @Post('/add_assign_product')
  @UsePipes(new ValidationPipe)
  @UseInterceptors(FileInterceptor('profilePicture',
  { fileFilter(req, file, callback) {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          callback(null, true);
      } 
      else {
          callback(new MulterError('LIMIT_UNEXPECTED_FILE', 'profilePicture'), false)
      }
  },
  limits: { fileSize: 1000000 },
  storage:diskStorage({
      destination: './uploads/assignproduct',
      filename(req, file, callback) {
          callback(null, Date.now() + file.originalname)
      },
  })
  }))
  async assignproduct(@Session() session, @Body() data:AssignProductDTO, @UploadedFile() profilePicture: Express.Multer.File) {
    data.Pic = profilePicture.filename;
    if (!profilePicture || !profilePicture.filename) {
        throw new BadRequestException('Profile picture is required.');
      }
      console.log(profilePicture)
      console.log(data);
      return this.customerService.assignproduct(data);
    }






@Get('/getproblemsProduct')
    @UseGuards(SessionGuard)
    getproblemsProduct(@Session() session) {
     return this.customerService.getproblemsProduct(session.CustomerID);
}

// Feature 2 : Update Assign_Product Info
@Put('/update_assign_product_info/:id')
@UsePipes(new ValidationPipe())
UpdateAssignProductInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:AssignProductDTO): object{
    return this.customerService.UpdateAssignProductInfo(id,updated_data);
}

// // Feature 2 : Update Assign_Product Info
// @Put('/update_assign_product_info/:id')
// @UseGuards(SessionGuard)
// @UsePipes(new ValidationPipe())
// UpdateAssignProductInfo(@Session() session, @Body() updated_data:AssignProductDTO): object{
//     return this.customerService.UpdateAssignProductInfo(session.CustomerID,updated_data);
// }

// Feature 3 : Delete Assign_Product Info
@Delete('/delete_assign_product/:id')
DeleteAssignProductInfo(@Param('id', ParseIntPipe) id:number): number{
    return this.customerService.DeleteAssignProductInfo(id);
}

// Feature 4 : View Assign_Product Info
@Get('/view_assign_product/:id')
ViewAssignProductInfo(@Param('id', ParseIntPipe) id:number): object{
    return this.customerService.ViewAssignProductInfo(id);
}

// Feature 5 : View Assign_Product Images And All Info
@Get('getimagebyassignprsoductid/:assignproductId')
async getimagebyassignproductid(@Param('assignproductId', ParseIntPipe) assignproductId:number, @Res() res){
    const filename = await this.customerService.getimagebyassignproductid(assignproductId);
            res.sendFile(filename, { root: './uploads/assignproduct' })   

}
// Feature 6 : View Assign_Product All Info
        @Get('getimagebyassignproductidandallinfo/:assignproductId')
        async getimagebyassignproductidandallinfo(@Param('assignproductId', ParseIntPipe) assignproductId:number, @Res() res){
            const filename = await this.customerService.getimagebyassignproductidandallinfo(assignproductId);
            // res.sendFile(filename, { root: './uploads/assignproduct' })   
            // return filename;
        }

// Feature 7 : Who Customer add Assign_Product
        @Get('/getassignproductbycustomerid/:customerId')
        getassignproductbycustomerid(@Param('customerId', ParseIntPipe) customerId:number) {
            return this.customerService.getassignproductbycustomerid(customerId);
        }

// Feature 17 : View  all Review By Product Id
    @Get('/getreviewbyproductid/:productId')
    getreviewbyproductid(@Param('productId', ParseIntPipe) productId:number) {
        return this.customerService.getreviewbyproductid(productId);
    }



// .....................Customer DeliveryMan Review Manage .....................//
// * Feature 1 : Add a customer DeliveryMan Review
@Post('/add_deliveryman_review')
@UsePipes(new ValidationPipe())
adddeliverymanreview(@Body() data:DRevieweDTO):object {
console.log(data);
return this.customerService.adddeliverymanreview(data);
}

// * Feature 2 : Update customer DeliveryMan Review
@Put('/update_deliveryman_review_info/:id')
@UsePipes(new ValidationPipe())
UpdateDeliveryManReviewInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:DRevieweDTO): object{
    return this.customerService.UpdateDeliveryManReviewInfo(id,updated_data);
}


// * Feature 3 : Delete DeliveryMan Review Info
@Delete('/delete_deliveryman_review/:id')
DeleteDeliveryManReviewInfo(@Param('id', ParseIntPipe) id:number): number{
    // console.log(id);
    return this.customerService.DeleteDeliveryManReviewInfo(id);
}



@Put('/Updateorders/:id')
@UsePipes(new ValidationPipe())
Updateorder(@Param('id', ParseIntPipe) id:number, @Body() updated_data:OrderDTO): object{
    return this.customerService.Updateorder(id,updated_data);
}


    // .....................Customer product  Manage .....................//

// Feature 7 : View All Product Info

@Get('/view_all__product')
ViewAllProductInfo(): object{
    return this.customerService.ViewAllProductInfo();
}





@Get('/searchproduct/:id')
async searchproduct(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {

    const res = await this.customerService.searchproduct(id)
    if (res !== null) {
        console.log(res);
        return res;
    }
    else {
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            message: "Product not found"
        });
    }
}

@Get('/search/:query')
async searchProductsByFirstWord(@Param('query') query: string): Promise<ProductEntity[]> {
  const products = await this.customerService.searchProductByFirstWord(query);

  if (!products || products.length === 0) {
    throw new NotFoundException('No products found');
  }

  return products;
}
    // .....................Customer order  Manage .....................//

    @Post('/addorder')
    addOrders(@Body() order) {
        console.log(order);
        return this.customerService.addOrders(order);
    }
    
    // @Get('/getordersss')
    //     @UseGuards(SessionGuard)
    //     getOrders(@Session() session) {
    //      return this.customerService.getOrders(session.CustomerID);
    // }

    @Get('/getorderss/:customerId')
    getOrders(@Param('customerId', ParseIntPipe) customerId:number) {
    console.log(customerId);
        return this.customerService.getOrders(customerId);
    }
    
    @Delete('/orders/:id')
    DeleteOrder(@Param('id', ParseIntPipe) id:number): object{
        return this.customerService.DeleteOrder(id);
    }

    @Post('/forget_password')
    ForgetPassword(@Session() session){
        return this.customerService.ForgetPassword(session.Seller_Email);
    }
      
    
    @Get('/order')
    order(): object{
    return this.customerService.ViewAllorderInfo();
}



@Post('/OTPsend/:UserCredential')
  async OTPSend(@Param('UserCredential') UserCredential: string): Promise<any> {
    if (!isNaN(Number(UserCredential))) {
      return this.customerService.OTPSendSMS(UserCredential);
    } else {
      return this.customerService.OTPSendEmail(UserCredential);
    }
  }
    
  @Post('/Forgetpassword')
  @UsePipes (new ValidationPipe)
  async Forgetpassword(@Body() forgetpass : ForgetPassword) : Promise<any>
  {
    console.log(forgetpass);
      return this.customerService.Forgetpassword(forgetpass);
  }


    // @Put('/updateorders')
    //     updateOrders(@Body() data:OrderUpdateDTO): object{
    //         return this.customerService.updateOrders(data);
    //     }


// @Delete('/orderss/:id')
// deleteOrder(@Param('customerId',  ParseIntPipe) customerId:number): object{
//     return this.customerService.deleteOrder(customerId);
// }



//   @Get('/getorders/:customerId')
// getOrders(@Param('customerId', ParseIntPipe) customerId:number) {
       
//         return this.customerService.getOrders(customerId);
//     }





//  // Add to Cart
//  @Get('/addtocart')
//  @UseGuards(SessionGuard)
//  async addToCart(@Session() session, @Query() query:editProductDTO,@Body() order: OrderDTO) {
//      return await this.customerService.addToCart(session.memberID, query, order);
//  }



//     @Get('/getorders/:customerId')
// getOrders(@Param('customerId', ParseIntPipe) customerId:number) {
       
//         return this.customerService.getOrders(customerId);
//     }




}

import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddAddressDTO, AssignProductDTO, CustomerDTO, CustomerPicDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewDTO, ReviewUpdateDTO, editProductDTO } from "./customer.dto";
import { CustomerService } from "./customer.service";
// import { ReviewDTO } from "./review.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminDTO } from "src/admin/admin.dto";
import { CustomerEntity } from "./customer.entity";
import { AddressEntity } from "./customer_address.entity";
import session from "express-session";
import { SessionGuard } from "./session.gaurd";
import { OrderDTO } from "src/order/order.dto";
import { ProductEntity } from "src/admin/admin.entity";


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
  async registerCustomer(@Session() session, @Body() data:CustomerDTO, @UploadedFile() profilePicture: Express.Multer.File) {
    data.profilePic = profilePicture.filename;
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

  // * Feature 2 : Login customer

  @Post('/login')
async login(@Query() query:CustomerDTO, @Session() session) {
   const CustomerDetails = await this.customerService.login(query);
   session.CustomerID = CustomerDetails.customerid;
   session.email = CustomerDetails.email;
   session.profilePicture = CustomerDetails.profilePic;
   return "Login successfull";
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
@UseGuards(SessionGuard)
    DeleteAccount(@Session() session) {
     return this.customerService.DeleteAccount(session.CustomerID);
}
// * Feature 7 : View Customer Images
  @Get('getimagebycustomerid/:customerId')
  @UseGuards(SessionGuard)
    async getimagebyid(@Param('customerId', ParseIntPipe) customerId:number, @Res() res){
    const filename = await this.customerService.getimagebycustomerid(customerId);
    res.sendFile(filename, { root: './uploads/customer_register_img' })

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
//now run this query in postman
@Post('/add_review')
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
ProductReview(@Session() session, @Body() data:ReviewDTO):object {
        console.log(data);
        return this.customerService.ProductReview(session.CustomerID, data);
}

@Post('/addreviews')
addreviews(@Body() review) {
    console.log(review);
    return this.customerService.addreviews(review);
}

// * Feature 2 : Update review Info
@Put('/update_review_info/:id')
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe())
UpdatereviewInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:ReviewDTO): object{
    return this.customerService.UpdatereviewInfo(id,updated_data);
}

// * Feature 3 : Delete review Info
@Delete('/delete_review/:id')
@UseGuards(SessionGuard)
DeletereviewInfo(@Param('id', ParseIntPipe) id:number): number{
    return this.customerService.DeletereviewInfo(id);
}

@Get('/getreviews')
    @UseGuards(SessionGuard)
    getreviews(@Session() session) {
     return this.customerService.getreviews(session.CustomerID);
}




    // .....................Customer Assign_Product Manage .....................//
// * Feature 1 : Add a customer Assign_Product
@Post('/add_assign_product')
@UseGuards(SessionGuard)
@UseInterceptors(FileInterceptor('image',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 3000000 },
            storage: diskStorage({
                destination: './uploads/assignproduct',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    assignproduct(@Body() mydata:AssignProductDTO,@UploadedFile() imageobj: Express.Multer.File){
console.log(mydata);
console.log(imageobj.filename);
mydata.Pic = imageobj.filename;
return this.customerService.assignproduct(mydata);

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
    return this.customerService.DeleteDeliveryManReviewInfo(id);
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
    // .....................Customer order  Manage .....................//

    @Post('/addorder')
    addOrders(@Body() order) {
        console.log(order);
        return this.customerService.addOrders(order);
    }
    
    @Get('/getordersss')
        @UseGuards(SessionGuard)
        getOrders(@Session() session) {
         return this.customerService.getOrders(session.CustomerID);
    }
    
    @Delete('/orders/:id')
    DeleteOrder(@Param('id', ParseIntPipe) id:number): object{
        return this.customerService.DeleteOrder(id);
    }

    @Post('/forget_password')
    ForgetPassword(@Session() session){
        return this.customerService.ForgetPassword(session.Seller_Email);
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

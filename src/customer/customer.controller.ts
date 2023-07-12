import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AddAddressDTO, AssignProductDTO, CustomerDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewDTO, ReviewUpdateDTO, editProductDTO } from "./customer.dto";
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


@Controller('customer')
export class CustomerController{
   

    constructor(private readonly customerService: CustomerService){}
    @Get('/index')
    getIndex(): any {
        return this.customerService.getIndex();
    }

    @Get('/search/:id')
    geCustomerId(@Param('id', ParseIntPipe) id:number): any {
        return this.customerService.geCustomerId(id);
   }


   @Get('/search')
   getCustomerName(@Query() qry:CustomerDTO): string {
    return this.customerService.getCustomerName(qry);
}
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

  @Post('/loginn')
async login(@Query() query:CustomerDTO, @Session() session) {
   const CustomerDetails = await this.customerService.login(query);
   session.CustomerID = CustomerDetails.customerid;
   session.email = CustomerDetails.email;
   session.profilePicture = CustomerDetails.profilePic;
   return "Login successfull";
}

// * Feature 8 : view customer profile
    @Get('/showprofiledetails')
    @UseGuards(SessionGuard)
    showProfileDetails(@Session() session) {
        return this.customerService.showProfileDetails(session.CustomerID);
}

// * Feature 2 : Update customer profile
    @Put('/updateprofile')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateprofile(@Body() data:CustomerUpdateDTO): object{
        return this.customerService.updateprofile(data);
}

// * Feature 3 : Update customer profile by id
@Put('/update_profile_info/:id')
@UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    UpdateProfileInfo(@Param('id', ParseIntPipe) id:number, @Session() session, @Body() updated_data:CustomerUpdateDTO): object{
        return this.customerService.UpdateProfileInfo(id,updated_data);
    }


// * Feature 4 : Delete customer profile by id
@Delete('/delete_profile/:id')
@UseGuards(SessionGuard)
    DeleteAccount(@Param('id', ParseIntPipe) id:number): object{
        return this.customerService.DeleteAccount(id);
    }


  // * Feature 7 : View Customer Profile
  @Get('/profile/:id')
  ViewCustomerProfile(@Param('id', ParseIntPipe) id:number): object{
      return this.customerService.ViewCustomerProfile(id);
  }

  // * Feature 8 : View Customer Images

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

@Get('/showprofilepicture')
    @UseGuards(SessionGuard)
async getimagebyassignproductidd(@Param('customerId')customerId, @Session() session, @Res() res){
        const filename = session.profilePic;
        res.sendFile(filename, { root: './uploads/customer_register_img' });
        // return this.customerService.getimagebyassignproductidd(customerId);
    }


 // * Feature 8 : Logout
 @Post('/logout/:id')
 @UseGuards(SessionGuard)
 Logout(@Param('id', ParseIntPipe) id:number): object{
     return this.customerService.Logout(id);
 }



// .....................Customer Address Manage .....................

// * Feature 1 : Add a new address


// @Post('/add_address')
// @UsePipes(new ValidationPipe())
// addAddress(@Body() data:CustomerDTO):object {
// console.log(data);
// return this.customerService.addAddress(data);
// }







@Post('/add_address/:id')
async createAddress(@Param('id', ParseIntPipe) data: { customer: CustomerEntity, address: AddressEntity }): Promise<CustomerEntity> {
  const { customer, address } = data;
  return this.customerService.createAddress(customer, address);
}

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
// * Feature 1 : Add a new review

//    @Post('/add_review/:id')
//     @UsePipes(new ValidationPipe())
//     @UseInterceptors(FileInterceptor('myfile',
//         { 
//             fileFilter: (req, file, cb) => {
//                 if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
//                     cb(null, true);
//                 else {
//                     cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
//                 }
//             },
//             limits: { fileSize: 5000000 }, // 5 MB
//             storage:diskStorage({
//                 destination: './uploads',
//                 filename: function (req, file, cb) {
//                     cb(null,Date.now()+file.originalname)
//                 },
//             })
//         }
//     ))
//     ProductReview(@Param('id', ParseIntPipe) id:number,@Body() review_info: ReviewDTO, @UploadedFile() myfileobj: Express.Multer.File):object {
//         review_info.Product_Image = myfileobj.filename; // Adding Book Image name to DTO to store in database
//         return this.customerService.ProductReview(id, review_info);
//     }

@Post('/add_review')
@UsePipes(new ValidationPipe())
     addreview(@Body() data:ReviewDTO):object {
        console.log(data);
        return this.customerService.addreview(data);
}

@Post('/addreviews')
addreviews(@Body() review) {
    console.log(review);
    return this.customerService.addreviews(review);
}

// * Feature 2 : Update review Info
@Put('/update_review_info/:id')
@UsePipes(new ValidationPipe())
UpdatereviewInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:ReviewDTO): object{
    return this.customerService.UpdatereviewInfo(id,updated_data);
}

// * Feature 3 : Delete review Info
@Delete('/delete_review/:id')
DeletereviewInfo(@Param('id', ParseIntPipe) id:number): number{
    return this.customerService.DeletereviewInfo(id);
}


    // .....................Customer Assign_Product Manage .....................//
// * Feature 1 : Add a customer Assign_Product
@Post('/add_assign_product')
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
// Feature 2 : Update Assign_Product Info
@Put('/update_assign_product_info/:id')
@UsePipes(new ValidationPipe())
UpdateAssignProductInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:AssignProductDTO): object{
    return this.customerService.UpdateAssignProductInfo(id,updated_data);
}

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
@Get('getimagebyassignproductid/:assignproductId')
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



// Feature 7 : View All Product Info

@Get('/view_all__product')
ViewAllProductInfo(): object{
    return this.customerService.ViewAllProductInfo();
}



@Post(('/addreview1'))
@UseInterceptors(FileInterceptor('myfile',
{ fileFilter: (req, file, cb) => {
    if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
     cb(null, true);
    else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    }
    },
    limits: { fileSize: 30000 },
    storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
    },
    })
    }
))
uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
{
 console.log(myfileobj)   
return ({message:"file uploaded"});
}

@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
 res.sendFile(name,{ root: './uploads' })
 }

 

 @Put('/updatereview')
 //@UsePipes(new ValidationPipe())
 updateReview(@Body() data:ReviewUpdateDTO): object{
     return this.customerService.updateReview(data);
 }
 @Put('/updatereview/:id')
 @UsePipes(new ValidationPipe())
 updateReviewId(@Param() id:number,@Body() data:ReviewUpdateDTO): object{
     return this.customerService.updateReviewId(id,data);
 }

 @Put('/dupdatereview')
 //@UsePipes(new ValidationPipe())
 dupdateReview(@Body() data:DRevieweUpdateDTO): object{
     return this.customerService.dupdateReview(data);
 }
 @Put('/dupdatereview/:id')
//  @UsePipes(new ValidationPipe())
 dupdateReviewId(@Param() id:number,@Body() data:DRevieweUpdateDTO): object{
     return this.customerService.dupdateReviewId(id,data);
 }
//  @Post('/addreviewd')
// //  @UsePipes(new ValidationPipe())
//  addreviewd(@Body() data:DRevieweDTO):object {
//  console.log(data);
//  return this.customerService.addreviewd(data);
// }




// @Get('/getorder/:customerid')
// getManagers(@Param('adminid', ParseIntPipe) adminid:number) {
   
//     return this.adminService.getManager(adminid);
// }


@Post('/addorder')
addOrders(@Body() order) {
    console.log(order);
    return this.customerService.addOrders(order);
}


@Get('/getorders/:customerId')
getOrders(@Param('customerId', ParseIntPipe) customerId:number) {
       
        return this.customerService.getOrders(customerId);
    }


// @Put('/updateorders')
//     updateOrders(@Body() data:OrderUpdateDTO): object{
//         return this.customerService.updateOrders(data);
//     }


@Delete('/orders/:id')
DeleteOrder(@Param('id', ParseIntPipe) id:number): object{
    return this.customerService.DeleteOrder(id);
}


// @Delete('/orderss/:id')
// deleteOrder(@Param('customerId',  ParseIntPipe) customerId:number): object{
//     return this.customerService.deleteOrder(customerId);
// }

//   // Search Order
//   @Get('/searchorder/:orderID')
// //   @UseGuards(SessionGuard)
//   async searchOrder(@Param('orderID') orderID:string) {
//       return await this.customerService.searchOrder(orderID);
//   }

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



@Get('/getsearch/:customerid')
getOrderssByCustomer(@Param('customerId', ParseIntPipe) customerId:number) {
       
        return this.customerService.getOrderssByCustomer(customerId);
    }




}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewDTO, ReviewUpdateDTO } from "./customer.dto";
import { CustomerService } from "./customer.service";
// import { ReviewDTO } from "./review.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AdminDTO } from "src/admin/admin.dto";


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
    @Post('/register')
    @UsePipes(new ValidationPipe())
    register(@Body() data:CustomerDTO):object {
    console.log(data);
    return this.customerService.register(data);
}
// * Feature 2 : Update customer profile
    @Put('/updateprofile')
    @UsePipes(new ValidationPipe())
    updateprofile(@Body() data:CustomerUpdateDTO): object{
        return this.customerService.updateprofile(data);
}


// * Feature 3 : Update customer profile by id
    @Put('/updateprofile/:id')
    @UsePipes(new ValidationPipe())
    updateprofilebyID(@Param() id:number,@Body() data:CustomerUpdateDTO): object{
        return this.customerService.updateprofileId(id,data);
}

 @Put('/update_profile_info/:id')
    @UsePipes(new ValidationPipe())
    UpdateProfileInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:CustomerUpdateDTO): object{
        return this.customerService.UpdateProfileInfo(id,updated_data);
    }

// * Feature 4 : Delete customer profile by id
@Delete('/delete_profile/:id')
    DeleteAccount(@Param('id', ParseIntPipe) id:number): object{
        return this.customerService.DeleteAccount(id);
    }


// * Feature 5 : signup customer profile
@Post('/signup')
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
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
signup(@Body() mydata:CustomerDTO,@UploadedFile() imageobj: Express.Multer.File){
console.log(mydata);
console.log(imageobj.filename);
mydata.filenames = imageobj.filename;
return this.customerService.signup(mydata);

}

// * Feature 6 : signin customer profile

@Post('/signin')
signIn(@Body() data:CustomerDTO){
    return this.customerService.signIn(data);
}

@Post('/login')
    // @UsePipes(new ValidationPipe())
    Login(@Body() customer_info: CustomerDTO): object{
        return this.customerService.Login(customer_info);
    }

  // * Feature 7 : View Customer Profile
  @Get('/profile/:id')
  ViewCustomerProfile(@Param('id', ParseIntPipe) id:number): object{
      return this.customerService.ViewCustomerProfile(id);
  }

  // * Feature 8 : View Customer Images
  @Get('getimagebycustomerid/:customerId')
async getimagebyid(@Param('customerId', ParseIntPipe) customerId:number, @Res() res){
    const filename = await this.customerService.getimagebycustomerid(customerId);
    res.sendFile(filename, { root: './uploads' })

}



 // * Feature 8 : Logout
 @Post('/logout/:id')
 Logout(@Param('id', ParseIntPipe) id:number): object{
     return this.customerService.Logout(id);
 }




    // .....................Customer Review Manage .....................//
// * Feature 1 : Add a new review

   @Post('/add_review/:id')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('myfile',
        { 
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 5000000 }, // 5 MB
            storage:diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null,Date.now()+file.originalname)
                },
            })
        }
    ))
    ProductReview(@Param('id', ParseIntPipe) id:number,@Body() review_info: ReviewDTO, @UploadedFile() myfileobj: Express.Multer.File):object {
        review_info.Product_Image = myfileobj.filename; // Adding Book Image name to DTO to store in database
        return this.customerService.ProductReview(id, review_info);
    }

    @Post('/addreviews')
    addreviews(@Body() review) {
        console.log(review);
        return this.customerService.addreviews(review);
    }

@Post('/addreview')
    @UsePipes(new ValidationPipe())
    addreview(@Body() data:ReviewDTO):object {
    console.log(data);
    return this.customerService.addreview(data);
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
 @Post('/addreviewd')
//  @UsePipes(new ValidationPipe())
 addreviewd(@Body() data:DRevieweDTO):object {
 console.log(data);
 return this.customerService.addreviewd(data);
}




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



@Get('/getsearch/:customerid')
getOrderssByCustomer(@Param('customerId', ParseIntPipe) customerId:number) {
       
        return this.customerService.getOrderssByCustomer(customerId);
    }




}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminLoginDTO, ProductDTO, adminCustomerDTO } from "./admin.dto";
import { AssignProductDTO, CustomerDTO, CustomerUpdateDTO } from "src/customer/customer.dto";
import { CustomerEntity } from "src/customer/customer.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { SessionGuard } from "src/customer/session.gaurd";

@Controller('admin')
export class AdminController{

    constructor(private readonly adminService: AdminService){}
// ADD ADMIN
    @Post('/signup')
    @UsePipes(new ValidationPipe())
    signup(@Body() data:AdminDTO): object{
        return this.adminService.signup(data);
    }

    @Post('/loginnn')
    async login(@Query() query:AdminDTO, @Session() session) {
       const AdminINFO = await this.adminService.login(query);
       session.email = AdminINFO.email;
       return "Login successfull";
    }

    @Post('/signin')
    async Loginn(@Body() data:AdminDTO, @Session() session) {
    const AdminINFO = await this.adminService.Loginn(data);
    session.email = AdminINFO.email;
    return "Login successfull";
}

    

    // * Feature 8 : view customer profile
    @Get('/showprofiledetails')
    @UseGuards(SessionGuard)
    showProfileDetails(@Session() session) {
        return this.adminService.showProfileDetails(session.email);
}

    // * Feature 3 : Update admin profile
    @Put('/aUpdateProfileInfo')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateprofile(@Body() data:AdminDTO): object{
    return this.adminService.updateprofile(data);
}

//.....................Admin Customer Manage .....................//

// * Feature 1 : show all customer
@Get('/showallcustomer')
// @UseGuards(SessionGuard)
showallcustomer(): object {
    return this.adminService.showallcustomer();
}



// * Feature 3 : Update customer profile by id
@Put('/customer_update_profile_info/:id')
// @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    UpdateProfileInfo(@Param('id', ParseIntPipe) id:number, @Session() session, @Body() updated_data:adminCustomerDTO): object{
        return this.adminService.UpdateProfileInfo(id,updated_data);
    }


    // * Feature 4 : Delete customer profile by id
@Delete('/customer_delete_profile/:id')
// @UseGuards(SessionGuard)
    DeleteAccount(@Param('id', ParseIntPipe) id:number): object{
        return this.adminService.DeleteAccount(id);
    }

// * Feature 7 : View Customer Profile

  @Get('/CustomerById/:customerid')
//   @UseGuards(SessionGuard)
  async ViewCustomerProfile(@Param('customerid',ParseIntPipe) customerid:number) {
      return await this.adminService.ViewCustomerProfile(customerid);
  }


   // * Feature 8 : View Customer Images

   @Get('getimagebycustomerid/:customerId')
   @UseGuards(SessionGuard)
 async getimagebyid(@Param('customerId', ParseIntPipe) customerId:number, @Res() res){
     const filename = await this.adminService.getimagebycustomerid(customerId);
     res.sendFile(filename, { root: './uploads/customer_register_img' })
 
 }
    // view all orders

    @Get('/getallorders')
    getAllOrders(): object {
        return this.adminService.getAllOrders();
    }
// ekta order kon customer er tar jonno
    @Get('/customerorderss/:OrderId')
    customerorderss(@Param('OrderId', ParseIntPipe) OrderId:number) {
         return this.adminService.customerorderss(OrderId);
     }
 // kon order ta kon customer er tar jonno

    @Get('/getallorderss/:OrderId')
   getOrderss(@Param('OrderId', ParseIntPipe) OrderId:number) {
        return this.adminService.getallOrders(OrderId);
    }
//// ekta product koto jon order korche ta dekhabe
    @Get('/onePdoductAllOrders/:ProductId')
    onePdoductAllOrders(@Param('ProductId', ParseIntPipe) ProductId:number) {
           
            return this.adminService.onePdoductAllOrders(ProductId);
        }




// // Feature 2 : Search Customer by id
// @Get("/CustomerById/:id")
// getCustomerById(@Param('id', ParseIntPipe) id: CustomerEntity, @Body() mydata:CustomerDTO): any 
// {
//     console.log(mydata);
//     return this.adminService.getCustomerById(id,mydata);
// }

// @Get('/profile/:id')
// ViewCustomerProfile(@Param('id', ParseIntPipe) id:number): object{
//     return this.adminService.ViewCustomerProfile(id);
// }


// @Get('/customer/:id')
//     geCustomerId(@Param('id', ParseIntPipe) id:number): any {
//         return this.adminService.geCustomerId(id);
//    }


   
    // .....................Admin Product Manage .....................//
// * Feature 1 : Add a customer Assign_Product
@Post('/add_product')
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
    productadd(@Body() mydata:ProductDTO,@UploadedFile() imageobj: Express.Multer.File){
console.log(mydata);
console.log(imageobj.filename);
mydata.Product_Image = imageobj.filename;
return this.adminService.productadd(mydata);

}

// * Feature 2 : Search Product by id
// @Get("/ProductById/:id")
// getProductById(@Param('id', ParseIntPipe) id: ProductDTO, @Body() mydata:ProductDTO): any
// {
//     console.log(mydata);
//     return this.adminService.getProductById(id,mydata);
// }

// @Get('/ProductBy/:id')
// getBookImages(@Param('id',ParseIntPipe) id:number, @Res() res) : any {
//     return this.adminService.getBookImages(id,res);
// }



// * Feature 4 : Delete a Products by id
@Delete('/delete_product/:id')
productdeletebyid(@Param('id', ParseIntPipe) id:number): object{
    return this.adminService.productdeletebyid(id);

    }

    // * Feature 3 : Update a Products by id
// @Put('/update_product/:id')
// @UseInterceptors(FileInterceptor('image'))
// @UsePipes(new ValidationPipe)
// UpdateProduct(@Param('id', ParseIntPipe) id:number, @Body() updated_data:ProductDTO,@UploadedFile() imageobj: Express.Multer.File): object{
//     console.log(updated_data);
//     console.log(imageobj);
//     updated_data.Product_Image = imageobj.filename;
//     return this.adminService.UpdateProduct(id,updated_data);

//     }

}



import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO, AdminLoginDTO, ProductDTO } from "./admin.dto";
import { AssignProductDTO, CustomerDTO, CustomerUpdateDTO } from "src/customer/customer.dto";
import { CustomerEntity } from "src/customer/customer.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

@Controller('admin')
export class AdminController{

    constructor(private readonly adminService: AdminService){}
    @Get('/index')
    getIndex(): any {
    return this.adminService.getIndex();
    }
// @Get('/search/:id')
// getAdminById(@Param() id:number): any {
// return this.adminService.getAdminById(id);
// }
// @Get('/search')
// getAdminbyName(@Query() qry:AdminDTO): string {

// return this.adminService.getAdminByName(qry);
// }


// Feature 1 : Register a new admin
@Post('/register')
@UsePipes(new ValidationPipe())
register(@Body() data:AdminDTO):object {
console.log(data);
return this.adminService.register(data);

}

// Feature 2 : Search Customer by id
@Get("/CustomerById/:id")
getCustomerById(@Param('id', ParseIntPipe) id: CustomerDTO, @Body() mydata:CustomerDTO): any 
{
    console.log(mydata);
    return this.adminService.getCustomerById(id,mydata);
}

@Get('/customer/:id')
    geCustomerId(@Param('id', ParseIntPipe) id:number): any {
        return this.adminService.geCustomerId(id);
   }

   // Feature 3 : Customer Profile Update

@Put('/customer_update_profile_info/:id')
    @UsePipes(new ValidationPipe())
    UpdateProfileInfo(@Param('id', ParseIntPipe) id:number, @Body() updated_data:CustomerUpdateDTO): object{
        return this.adminService.UpdateProfileInfo(id,updated_data);
    }

    // Feature 4 : Delete Customer Profile by id
@Delete('/delete_profile/:id')
    DeleteAccount(@Param('id', ParseIntPipe) id:number): object{
        return this.adminService.DeleteAccount(id);
    }

    // Feature 5 : signin Admin

    @Post('/signin')
    signIn(@Body() data:AdminLoginDTO){
    return this.adminService.signIn(data);
}
   
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



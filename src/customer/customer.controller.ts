import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomerDTO, CustomerUpdateDTO, DRevieweDTO, DRevieweUpdateDTO, ReviewUpdateDTO } from "./customer.dto";
import { CustomerService } from "./customer.service";
import { ReviewDTO } from "./review.dto";
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
    @Post('/addcustomer')
    @UsePipes(new ValidationPipe())
    addCustomer(@Body() data:CustomerDTO):object {
    console.log(data);
    return this.customerService.addCustomer(data);
}

@Post('/addreview')
    @UsePipes(new ValidationPipe())
    addreview(@Body() data:ReviewDTO):object {
    console.log(data);
    return this.customerService.addreview(data);
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

 @Put('/updatecustomer')
 //@UsePipes(new ValidationPipe())
 updateAdmin(@Body() data:CustomerUpdateDTO): object{
     return this.customerService.updateCustomer(data);
 }
 @Put('/updatecustomer/:id')
 @UsePipes(new ValidationPipe())
 updateAdminbyID(@Param() id:number,@Body() data:CustomerUpdateDTO): object{
     return this.customerService.updateCustomerId(id,data);
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
DeleteAccount(@Param('id', ParseIntPipe) id:number): object{
    return this.customerService.DeleteAccount(id);
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

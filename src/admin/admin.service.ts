import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminLoginDTO, ProductDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity, ProductReview } from "src/customer/customer.entity";
import { Order } from "src/order/Order.entity";
import { Repository } from "typeorm";
import { ProductEntity, AdminEntity } from "./admin.entity";
import { SupplierEntity } from "src/supplier/Supplier.entity";
import { CustomerDTO, CustomerUpdateDTO } from "src/customer/customer.dto";
import * as bcrypt from 'bcrypt';




@Injectable()
export class AdminService{

    constructor(@InjectRepository(AdminEntity)
    private AdminRepo: Repository<AdminEntity>, 

    @InjectRepository(Order)
        private orderRepo: Repository<Order>,

    @InjectRepository(ProductReview)
    private ProductReviewRepo: Repository<ProductReview>,
    
    @InjectRepository(ProductEntity)
    private ProductsRepo: Repository<ProductEntity>,

    @InjectRepository(SupplierEntity)
    private SupplierRepo: Repository<SupplierEntity>,

    @InjectRepository(CustomerEntity)
    private customerRepo: Repository<CustomerEntity>
    ){}

    getIndex(): string{
        return "Hellow Aadmin";
    }
    getAdminById(id: number): object{
    return ({id: 2, name: "abc", age:30});
    }
    getAdminByName(mydata: AdminDTO): string{
    return mydata.name;
    }


// Feature 1 : Register a new admin
    addAdmin(data: AdminDTO): object
    {
        return data;
    }
    // addAdmin(data: AdminDTO): string
    // {
    //     return data.email;
    // judi ami ekta valu print kori ta hole ei ta use korbo}

//     geCustomerId(id:number): Promise<CustomerEntity>
//     {
//        console.log(id);
//       return this.customerRepo.findOneBy({id:id});
//    }

async register(data: AdminDTO): Promise<AdminEntity> {
    return this.AdminRepo.save(data);
}

      getCustomerName(mydata: CustomerDTO): string{
        return mydata.name;
    }

   // Feature 2 : Search Customer by id
   

       getCustomerById(id:CustomerDTO, mydata:CustomerDTO): object {
        if(mydata != null)
            if(mydata.id == id.id)
                return mydata;
            else 
                return ({message: "Customer not found"})
    }
    
    geCustomerId(id:number): Promise<CustomerEntity>
     {
        console.log(id);
       return this.customerRepo.findOneBy({id:id});
    }

    // Feature 3 : Customer Profile Update
    async UpdateProfileInfo(id: number, updated_data: CustomerUpdateDTO): Promise<CustomerEntity> {
        await this.customerRepo.update(id, updated_data); // Where to Update , Updated Data
        return this.customerRepo.findOneBy({id: id});
    }

    // Feature 4 : Delete Customer Profile by id

    DeleteAccount(id: number): any {
        this.customerRepo.delete(id);
        return {"Success":"Account Deleted Successfully"};
    }





    // Feature 5 : Add Product
    addProduct(data: ProductEntity): object
    {
        return data;
    }

    // Feature 6 : Update Product
    updateProduct(data: ProductEntity): object
    {
        return data;
    }

    // Feature 7 : Delete Product
    deleteProduct(data: ProductEntity): object
    {
        return data;
    }
    // Feature 8 : Add Supplier
    addSupplier(data: SupplierEntity): object
    {
        return data;
    }
    // Feature 9 : Update Supplier
    updateSupplier(data: SupplierEntity): object
    {
        return data;
    }
    // Feature 10 : Delete Supplier
    deleteSupplier(data: SupplierEntity): object
    {
        return data;
    }

    // Feature 6 : Login customer profile
    async signIn(data: AdminLoginDTO) {
        const userdata= await this.AdminRepo.findOneBy({email:data.email});
        const match:boolean = await bcrypt.compare(data.password, userdata.password);
        return match;
    }

    // Feature 7 : Add Product

    async productadd(data: ProductDTO): Promise<ProductEntity> {
        const salt = await bcrypt.genSalt();
       return this.ProductsRepo.save(data);
    }
   
    // Feature 8 : Update Product
    async productupdate(id: number, updated_data: ProductDTO): Promise<ProductEntity> {
        await this.ProductsRepo.update(id, updated_data); // Where to Update , Updated Data
        return this.ProductsRepo.findOneBy({id: id});
    }

    // Feature 9 : Delete Product
    async productdelete(id: number): Promise<ProductEntity> {
        await this.ProductsRepo.delete(id);
        return this.ProductsRepo.findOneBy({id: id});
    }

    // Feature 10 : Add Supplier
    async supplieradd(data: SupplierEntity): Promise<SupplierEntity> {
        return this.SupplierRepo.save(data);
    }
    // * Feature 11 : Search a Product by id
    async getProductById(id: number): Promise<ProductEntity> {
        return this.ProductsRepo.findOneBy({id: id});
    }

    // * Feature 12 : Delete a Products by id
    async productdeletebyid(id: number): Promise<ProductEntity> {
        await this.ProductsRepo.delete(id);
        return this.ProductsRepo.findOneBy({id: id});
    }
        // // * Feature 3 : Update a Products by id
        // async productupdatebyid(id: number, updated_data: ProductDTO): Promise<ProductEntity> {


    
}
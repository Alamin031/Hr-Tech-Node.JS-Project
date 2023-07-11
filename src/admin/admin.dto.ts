import {IsEmail, IsEmpty, IsNotEmpty, IsString, Matches} from'class-validator';

export class AdminDTO{
   @IsString({message:"invalid name"})
   @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;

    @IsEmail({}, {message:"invalid email"})
    email: string;
    password: string;
}

    export class AdminLoginDTO{
  
     
         @IsEmail({}, {message:"invalid email"})
         email: string;
         password: string;
}

export class ProductDTO{
    id:number;
    @IsNotEmpty()
    @IsString({message:"invalid name"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    Product_Name: string;
    @IsNotEmpty()
    @IsString({message:"invalid name"})
    Product_Brands_Name: string;
    @IsNotEmpty()
    @IsString({message:"invalid name"})
    Price: number;
    @IsNotEmpty()
    @IsString({message:"invalid name"})
    Description: string;
    Product_Image: string;
    @IsNotEmpty()
    @IsString({message:"invalid name"})
    Quantity: number;
    @IsNotEmpty()
    @IsString({message:"invalid name"})
    Product_Category: string;
    // @IsNotEmpty()
    // Supplier_id: number;
   

}
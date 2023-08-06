import { Transform } from 'class-transformer';
import {IsDate, IsEmail, IsEmpty, IsNotEmpty, IsPhoneNumber, IsString, Matches, MaxLength, MinLength} from'class-validator';

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

export class adminCustomerDTO{
    customerid:number;
    firstName: string;
    lastName: string;
    username: string;
    dateOfBirth: Date;
    @IsNotEmpty({ message: "😓 Telephone Number should not be empty 😓" })
    @MinLength(11)
    @MaxLength(11)
    @IsPhoneNumber('BD')
    PhoneNumber: number;
    email: string;
    profilePic: string;

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


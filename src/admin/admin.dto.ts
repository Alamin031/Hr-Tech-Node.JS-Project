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
    @IsNotEmpty({ message: "😓 First name should not be empty 😓" })
    @IsString({ message: "😓 First name must be a string 😓" })
    @Matches(/^[A-Za-z.]+$/, {message: "😓 First name must contain letters only 😓" })
    firstName: string;

    @IsNotEmpty({ message: "😓 Last name should not be empty 😓" })
    @IsString({ message: "😓 Last name must be a string 😓" })
    @Matches(/^[A-Za-z.]+$/, {message: "😓 Last name must contain letters only 😓" })
    lastName: string;

    @IsNotEmpty({ message: "😓 Username should not be empty 😓" })
    @IsString({ message: "😓 Username must be a string 😓" })
    username: string;

    @IsNotEmpty({ message: "😓 Date of birth should not be empty 😓" })
    @IsDate({ message: "😓 Date of birth should be a Date 😓" })
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @IsNotEmpty({ message: "😓 Telephone Number should not be empty 😓" })
    @MinLength(11)
    @MaxLength(11)
    @IsPhoneNumber('BD')
    PhoneNumber: number;

    @IsNotEmpty({ message: "😓 Email should not be empty 😓" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "😓 Confirm password should not be empty 😓" })
    @MinLength(8)
    @MaxLength(30)
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


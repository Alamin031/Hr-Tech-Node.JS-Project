import { Transform } from 'class-transformer';
import {IsDate, IsEmail, IsEmpty, IsIn, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Matches, MaxLength, MinLength, Validate, ValidatorConstraint, ValidatorConstraintInterface} from'class-validator';
import { IsUnique } from './uni';


export class CustomerDTO{
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
    telephoneNumber: string;

    @IsNotEmpty({ message: "😓 Email should not be empty 😓" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "😓 Password should not be empty 😓" })
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @IsNotEmpty({ message: "😓 Confirm password should not be empty 😓" })
    @MinLength(8)
    @MaxLength(30)
    confirmPassword: string;
    profilePic: string;

}



export class CustomerPicDTO{
   //  @IsNumber()
   //  @IsNotEmpty()
   customerid:number;
    @IsNotEmpty({ message: "😖😖😢👉First name should not be empty 😖😖😢👈" })
    @IsString({ message: "😖😖😢👉First name must be a string😖😢👈" })
    @Matches(/^[A-Za-z.]+$/, {message: " 😖😖😢First name must contain letters only 😖😖😢👈" })
    firstName: string;

    @IsNotEmpty({ message: " 😖😢Last name should not be empty 😖😢👈" })
    @IsString({ message: "😖😢 Last name must be a string 😖😖😢👈" })
    @Matches(/^[A-Za-z.]+$/, {message: "😖😖😢 Last name must contain letters only 😖😢👈" })
    lastName: string;

    @IsNotEmpty({ message: "😖😢 Username should not be empty 😖😢👈" })
    @IsString({ message: "😖😢 Username must be a string 😖😢👈" })
    username: string;

    @IsNotEmpty({ message: "😖😢 Date of birth should not be empty 😖😢" })
    @IsDate({ message: "😖😢 Date of birth should be a Date 😖😢" })
    @Transform(({ value }) => new Date(value))
    dateOfBirth: Date;

    @IsNotEmpty({ message: "😖😢 Telephone Number should not be empty 😖😢" })
    @MinLength(11)
    @MaxLength(11)
    @IsPhoneNumber('BD')
    telephoneNumber: string;

    @IsNotEmpty({ message: "😖😢 Email should not be empty 😖😢" })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: "😖😢 Password should not be empty 😖😢" })
    @MinLength(8)
    @MaxLength(30)
    password: string;

    @IsNotEmpty({ message: "😖😢 Confirm password should not be empty 😖😢" })
    @MinLength(8)
    @MaxLength(30)
    profilePic: string;

}

export class editProductDTO {
   editProduct: number;
}

export class AddAddressDTO {
   id : number;
   @IsNotEmpty({ message: "😖😢 Street should not be empty 😖😢" })
   @IsString({ message: "😖😢 Street must be a string 😖😢" })
   Street : string;
   @IsNotEmpty({ message: "😖😢 Building should not be empty 😖😢" })
   @IsString({ message: "😖😢 Building must be a string 😖😢" })
   Building : string;
   @IsNotEmpty({ message: "😖😢 City should not be empty 😖😢" })
   @IsString({ message: "😖😢 City must be a string 😖😢" })
   City : string;
   @IsNotEmpty({ message: "😖😢 Country should not be empty 😖😢" })
   @IsString({ message: "😖😢 Country must be a string 😖😢" })
   Country : string;
   @IsNotEmpty({ message: "😖😢 ZIP should not be empty 😖😢" })
   @IsString({ message: "😖😢 ZIP must be a string 😖😢" })
   ZIP : string;
   }





export class CustomerUpdateDTO{
   customerid:number;
   firstName: string;

 }
 export class CustomerLoginDTO {
   @IsEmail({}, { message: "invalid email" })
  email: string;
  password: string;
}

 export class ReviewDTO{
    id:number;
    @IsNotEmpty( {message:"😖😢 Review should not be empty "})
    @IsString({message:"😖😢 Review must be a string "})
    Review: string;
   @IsNotEmpty( {message:"😖😢 Date should not be empty "})
   @IsString({message:"😖😢 Date must be a string "})
    Date: string;
   //  Product_Image: string;
    
 }

 export class ReviewUpdateDTO{

    id:number;
    review: string;
    Date: string;
   
 }

 export class DRevieweDTO{
    id:number;
    @IsNotEmpty()
    @IsString({message:"invalid review"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
    Review: string;
    Date: string;
 }

 export class DRevieweUpdateDTO{
   @IsNumber()
    @IsNotEmpty()
    id:number;
   @IsString({message:"invalid review"})
   @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
   Review: string;
   // Date=this.Date;
}

export class AssignProductDTO{
  
   id:number;
   @IsNotEmpty()
   @IsString({message:"invalid product name"})
   @Matches( /^[a-zA-Z]+$/, {message:"enter a proper product name"})
   Product_Name: string;
   @IsNotEmpty()
   @IsString({message:"invalid problem"})
   @Matches( /^[a-zA-Z]+$/, {message:"enter a proper problem"})
   Problem: string;
   @IsNotEmpty()
   @IsString({message:"invalid date"})   
   Date: string;
   @IsString({message:"invalid status"})
   Pic: string;
   @IsString({message:"invalid Address"})
   Address: string;

}
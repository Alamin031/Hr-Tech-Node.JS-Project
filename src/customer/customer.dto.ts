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
    profilePic: string;

}

export class editProductDTO {
   editProduct: number;
}

export class AddAddressDTO {
   id : number;
   Street : string;
   Building : string;
   City : string;
   Country : string;
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
    @IsNotEmpty()
    @IsString({message:"invalid review"})
    Review: string;
    Date: string;
   //  Product_Image: string;
    
 }

 export class ReviewUpdateDTO{
    @IsNumber()
    @IsNotEmpty()
    id:number;
   //  @IsNotEmpty()
   //  @IsString({message:"invalid review"})
   //  @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
    review: string;
   
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
   Date: string;
   Pic: string;
   Address: string;

}
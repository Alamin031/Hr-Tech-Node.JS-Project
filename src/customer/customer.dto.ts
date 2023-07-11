import {IsDate, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches} from'class-validator';


export class CustomerDTO{
   //  @IsNumber()
   //  @IsNotEmpty()
    id:number;
    @IsString({message:"invalid name"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;
    @IsEmail({}, {message:"invalid email"})
    email: string;
    password: string;
    filenames: string;

}

export class CustomersDTO{
   //  @IsNumber()
   //  @IsNotEmpty()
    id:number;
    @IsString({message:"invalid name"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper name"})
    name: string;
    @IsEmail({}, {message:"invalid email"})
    filenames: string;

}

export class CustomerUpdateDTO{
    id:number;
    name: string;
    email: string;
    password: string;
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
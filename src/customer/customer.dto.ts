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
    @IsNumber()
    @IsNotEmpty()
    id:number;
    @IsNotEmpty()
    @IsString({message:"invalid review"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
    review: string;
    @IsString({ message: 'Review Image Name should be a string' })
    Product_Image: string;
    Date: Date;
    
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
    @IsNumber()
    @IsNotEmpty()
    id:number;
    @IsNotEmpty()
    @IsString({message:"invalid review"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
    review: string;
    // Date=this.Date;
 }

 export class DRevieweUpdateDTO{
   @IsNumber()
    @IsNotEmpty()
    id:number;
   @IsString({message:"invalid review"})
   @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
   review: string;
   // Date=this.Date;
}
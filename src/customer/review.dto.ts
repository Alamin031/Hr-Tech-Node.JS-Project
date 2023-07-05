import {IsEmail, IsEmpty, IsNotEmpty, IsString, Matches} from'class-validator';


export class ReviewDTO{
    @IsString({message:"invalid review"})
    @Matches( /^[a-zA-Z]+$/, {message:"enter a proper review"})
     review: string;
 
    
}
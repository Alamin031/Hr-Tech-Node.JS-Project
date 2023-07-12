import { IsNotEmpty, IsString } from "class-validator";



export class OrderDTO{
@IsNotEmpty({ message: "😓 Order date should not be empty 😓" })
@IsString({ message: "😓 Order date name must be a string 😓" })
orderDate: string;

@IsNotEmpty({ message: "😓 Order status name should not be empty 😓" })
@IsString({ message: "😓 Order status name must be a string 😓" })
orderStatus: string;

@IsNotEmpty({ message: "😓 Product name should not be empty 😓" })
@IsString({ message: "😓 Product name must be a string 😓" })
products: string;

@IsNotEmpty({ message: "😓 Total amount should not be empty 😓" })
totalAmount: number;


}
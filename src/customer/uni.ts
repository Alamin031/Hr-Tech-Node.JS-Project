import { ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { getRepository } from "typeorm";
import { CustomerEntity } from "./customer.entity";



@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [entityName, columnName] = args.constraints;
    const repo = getRepository(entityName);

    const foundEntity = await repo.findOne({ [columnName]: value });

    return !foundEntity;
  }
}


export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueConstraint,
    });
  };
}




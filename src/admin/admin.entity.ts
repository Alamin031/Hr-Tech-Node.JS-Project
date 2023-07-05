import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("Admin")
export class AdminEntity{
@PrimaryGeneratedColumn()
id: number;
@Column()
name: string;
@Column()
email: string;
@Column()
password: string;
}
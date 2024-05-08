// export interface Student{

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

//     id?: number | string,

//     firstname: string,
//     lastname: string,
//     username: string,
//     email: string,
//     password: string
// }
@Entity()
export class Student{

    @PrimaryGeneratedColumn({type: "int"})
    id?: number | string

    @Column()
    firstname!: string

    @Column()
    lastname!: string
    
    
    @Column()
    username!: string
    
    @Column({nullable: true})
    email!: string
    
    @Column({nullable: true})
    password!: string
}
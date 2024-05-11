// export interface Student{

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Student{

    @PrimaryGeneratedColumn()
    studentId?: number | string

    @Column()
    firstname!: string

    @Column()
    lastname!: string
    
    @Column()
    username!: string
    
    @Column({nullable: true})
    email?: string
    
    @Column()
    courseId!: number
}
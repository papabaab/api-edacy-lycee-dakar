// export interface Student{

import { ObjectId } from "mongodb"
import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Student{

    // @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    studentId?: ObjectId

    @Column()
    firstname!: string

    @Column()
    lastname!: string
    
    @Column()
    username!: string
    
    @Column({nullable: true})
    email?: string
    
    @Column()
    courseId!: number | string
}
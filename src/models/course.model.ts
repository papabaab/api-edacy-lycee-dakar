
// export interface Student{

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    courseId?: number | string

    @Column()
    startDate!: string

    @Column()
    endDate!: string

    @Column()
    courseTitle!: string
    
    @Column({nullable: true})
    professor!: string


    @Column({nullable: true})
    description!: string
}


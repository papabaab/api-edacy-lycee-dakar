
// import { ObjectId } from "mongodb"
import { Column, Entity, ObjectIdColumn } from "typeorm"

@Entity()
export class Course {

    @ObjectIdColumn()
    courseId?:  string | number

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


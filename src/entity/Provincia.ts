import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Provincia {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
 

}

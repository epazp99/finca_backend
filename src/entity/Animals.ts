import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Animals {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    idFinca: string

    @Column()
    especie: string

    @Column()
    category: string

    @Column()
    mes: number

    @Column()
    anno: number

    @Column()
    bajas: number

    @Column()
    altas: number

}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class EquiposYmedios {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    idFinca: string 

    @Column()
    finca: string


    @Column()
    provincia: string

    @Column()
    parque: string

    @Column()
    mes: number

    @Column()
    anno: number

    @Column()
    activos: number

    @Column()
    incidencias: number

}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Cultivos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    idFinca: string

    @Column()
    tipo: string

    @Column()
    centroElaboracion: string

    @Column()
    um: string

    @Column()
    plan: number

    @Column()
    finca: string

    @Column()
    toDate: number

    @Column()
    real: number

    @Column()
    porcent: number

    @Column()
    planCampanna: string

    @Column()
    acumulado: number

    @Column()
    mes: number

    @Column()
    anno: number

    @Column()
    areaExistencia: string

    @Column()
    tierraMov: string

    @Column()
    tierraLista: string

}

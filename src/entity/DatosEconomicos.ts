import { Entity, PrimaryGeneratedColumn, Column, Double } from "typeorm"

@Entity()
export class DatosEconomicos {

    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    idFinca: string

    @Column()
    salario: string 

    @Column()
    promedio: Double 

    @Column()
    productividad: string   

    @Column({nullable:true})
    fecha: Date  

}

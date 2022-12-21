import "reflect-metadata"
import { DataSource } from "typeorm"
import { Animals } from "./entity/Animals"
import { Cultivos } from "./entity/Cultivos"
import { EquiposYmedios } from "./entity/EquiposYmedios"
import { Finca } from "./entity/Finca"
import { Provincia } from "./entity/Provincia"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "finca",
    synchronize: true,
    logging: false,
    entities: [User, Animals, Cultivos, EquiposYmedios, Finca, Provincia],
    migrations: [],
    subscribers: [],
})

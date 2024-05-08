import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "lycee-dakar",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: [],
    subscribers: [],
})

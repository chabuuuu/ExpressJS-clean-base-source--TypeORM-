import "dotenv/config";
import { Account } from "../models/account.model";
import { Role } from "../models/role.model";
import "reflect-metadata";
import { DataSource } from "typeorm";

export class AppDataSource {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!AppDataSource.instance) {
      AppDataSource.instance = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "admin",
        database: process.env.DB_NAME || "test",
        entities: [Account, Role],
        synchronize: true,
        logging: false,
        migrations: [__dirname + "/migrations/*.js"],
      });
    }
    return AppDataSource.instance;
  }
}

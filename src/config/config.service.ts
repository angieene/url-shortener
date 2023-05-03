import { TypeOrmModuleOptions } from "@nestjs/typeorm";

/* eslint-disable */
require("dotenv").config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.getValue("DATABASE_HOST"),
      port: Number(this.getValue("DATABASE_PORT")),
      username: this.getValue("DATABASE_USERNAME"),
      password: this.getValue("DATABASE_PASSWORD"),
      database: this.getValue("DATABASE_NAME"),
      synchronize: true,
      logging: true,
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  "DATABASE_PORT",
  "DATABASE_USERNAME",
  "DATABASE_PASSWORD",
  "DATABASE_NAME",
  "DATABASE_HOST",
]);

export { configService };

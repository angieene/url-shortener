import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { UrlModule } from "./url/url.module";
import { configService } from "./config/config.service";

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), UrlModule],
  controllers: [AppController],
})
export class AppModule {}

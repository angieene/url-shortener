import { Body, Controller, Post } from "@nestjs/common";

import { UrlService } from "./url.service";
import { CreateUrlDto } from "./dto/create-url.dto";
import { IGetShorterUrl } from "src/utils/types";

@Controller("url")
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Post("short")
  async create(@Body() createUrlDto: CreateUrlDto): Promise<IGetShorterUrl> {
    const shortUrl = await this.urlService.shortUrl(createUrlDto.originalUrl);
    return { shortUrl };
  }
}

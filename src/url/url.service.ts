import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { nanoid } from "nanoid";

import { Errors } from "src/utils/constants";
import { UrlEntity } from "./entities/url.entity";

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlEntity: Repository<UrlEntity>
  ) {}

  async getOriginalUrl(shortUrl: string) {
    const { find } = Errors;
    const originalUrl = await this.urlEntity.findOne({
      where: {
        shortUrl,
      },
      select: { originalUrl: true },
    });

    if (!originalUrl) throw new NotFoundException(find);

    return originalUrl.originalUrl;
  }

  async shortUrl(newOriginalUrl: string): Promise<string> {
    const { save } = Errors;
    const baseUrl = new URL(newOriginalUrl).origin;

    const urlId = nanoid(6);

    if (newOriginalUrl === baseUrl) {
      return baseUrl;
    }

    const newShortUrl = baseUrl + "/" + urlId;

    const existUrl = await this.urlEntity.findOneBy({
      originalUrl: newOriginalUrl,
    });

    if (existUrl) {
      return existUrl.shortUrl;
    }

    const newUrl = this.urlEntity.create();
    newUrl.originalUrl = newOriginalUrl;
    newUrl.shortUrl = newShortUrl;

    const saveUrl = await this.urlEntity.save(newUrl);
    if (!saveUrl) throw new BadRequestException(save);

    return newShortUrl;
  }
}

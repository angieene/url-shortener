import { Controller, Get, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";

import { UrlService } from "./url/url.service";

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}
  @Get(":urlId")
  async getOriginalUrl(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    const shortUrl = `${req.protocol}://${req.get("Host")}${req.originalUrl}`;
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);

    res.redirect(originalUrl);
  }
}

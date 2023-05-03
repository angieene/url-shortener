import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUrl({ host_whitelist: ["localhost"] })
  originalUrl: string;
}

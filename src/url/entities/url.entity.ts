import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("url")
export class UrlEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: String, nullable: false })
  originalUrl: string;

  @Column({ type: String, nullable: false })
  shortUrl: string;
}

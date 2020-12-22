import { PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export abstract class Base {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}

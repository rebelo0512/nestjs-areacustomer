import { Entity, Column } from "typeorm";

import { Base } from "@models/base.entity";

@Entity("password_reset")
export class PasswordReset extends Base {
  @Column({ type: "varchar", length: 300, nullable: false })
  customer_id: string;
}

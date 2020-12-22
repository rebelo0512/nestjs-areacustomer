import { Entity, Column } from "typeorm";

import { Base } from "@models/base.entity";

@Entity("customers")
export default class Customer extends Base {
  @Column({ type: "int", nullable: false, unique: true })
  code: number;

  @Column({ type: "varchar", length: 300, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  document: string;

  @Column({ type: "varchar", length: 250, nullable: true, default: "null" })
  nickname: string;

  @Column({ type: "boolean", default: false })
  first_access: boolean;

  @Column({ type: "varchar", length: 250 })
  city: string;

  @Column({ type: "varchar", length: 250 })
  neigh: string;
}

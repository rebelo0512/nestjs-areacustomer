import { Entity, Column } from "typeorm";

import { Base } from "@models/base.entity";

@Entity("notifications")
export class Notification extends Base {
  @Column({ type: "varchar", length: 100, nullable: false })
  type: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  title: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  description: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  city_objective: string;

  @Column({ type: "varchar", length: 250, nullable: true })
  neigh_objective: string;
}

import { Entity, Column } from "typeorm";

import { Base } from "@models/base.entity";

@Entity("notifications_read")
export class NotificationRead extends Base {
  @Column({ type: "varchar", length: 300, nullable: false })
  customer_id: string;

  @Column({ type: "varchar", length: 300, nullable: false })
  notification_id: string;

  @Column({ type: "boolean", default: false })
  read: boolean;
}

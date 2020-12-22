import { CustomerModule } from "@customerarea/customer/customer.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Notification } from "./models/notification.entity";
import { NotificationRead } from "./models/notification_read.entity";
import { NotificationRepository } from "./repositories/notification.repository";
import { NotificationReadRepository } from "./repositories/notification_read.repository";
import { NotificationController } from "./routes/notification.controller";
import { NotificationReadController } from "./routes/notification_read.controller";
import { NotificationCreate } from "./services/notificationCreate.service";
import { NotificationFindByCustomerId } from "./services/notificationFindByCustomerId.service";
import { NotificationReadUpdateRead } from "./services/notificationReadUpdateRead.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationRead]),
    CustomerModule,
  ],
  controllers: [NotificationController, NotificationReadController],
  providers: [
    NotificationRepository,
    NotificationReadRepository,
    NotificationFindByCustomerId,
    NotificationCreate,
    NotificationReadUpdateRead,
  ],
})
export class NotificationModule {}

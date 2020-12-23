import { Body, Controller, Get, Param, Put, UseGuards } from "@nestjs/common";

import { CustomerTokenValidationGuard } from "@customerarea/customer/guards/CustomerTokenValidation.guard";
import { NotificationReadUpdateRead } from "../services/notification_read/notificationReadUpdateRead.service";
import { NotificationReadUpdateReadGuard } from "../guards/notificationReadUpdateRead.guard";
import { NotificationReadCountNotificationDontReadByCustomerId } from "../services/notification_read/notificationReadCountNotificationDontReadByCustomerId.service";

@Controller("notifications_read")
@UseGuards(CustomerTokenValidationGuard)
export class NotificationReadController {
  constructor(
    private NotificationReadCountNotificationDontReadByCustomerId: NotificationReadCountNotificationDontReadByCustomerId,
    private NotificationReadUpdateRead: NotificationReadUpdateRead,
  ) {}

  @Get("/:id_customer/check_unread") // Path: /notifications_read/:id_customer/check_unread
  public async countNotificationDontReadByCustomerId(
    @Param("id_customer") id_customer: string,
  ): Promise<number> {
    return await this.NotificationReadCountNotificationDontReadByCustomerId.exec(
      id_customer,
    );
  }

  @Put("") // Path: /notifications_read
  @UseGuards(NotificationReadUpdateReadGuard)
  public async updateRead(
    @Body("id_customer") id_customer: string,
    @Body("id_notification") id_notification: string,
  ): Promise<boolean> {
    return await this.NotificationReadUpdateRead.exec({
      id_customer,
      id_notification,
    });
  }
}

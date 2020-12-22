import { Body, Controller, Put, UseGuards } from "@nestjs/common";

import { CustomerTokenValidationGuard } from "@customerarea/customer/guards/CustomerTokenValidation.guard";
import { NotificationReadUpdateRead } from "../services/notificationReadUpdateRead.service";
import { NotificationReadUpdateReadGuard } from "../guards/notificationReadUpdateRead.guard";

@Controller("notifications_read")
@UseGuards(CustomerTokenValidationGuard)
export class NotificationReadController {
  constructor(private NotificationReadUpdateRead: NotificationReadUpdateRead) {}

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

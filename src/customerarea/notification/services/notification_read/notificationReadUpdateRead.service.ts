import { Injectable } from "@nestjs/common";

import { INotificationReadUpdateReadDTO } from "../../dto/INotificationReadUpdateReadDTO";
import { NotificationReadRepository } from "../../repositories/notification_read.repository";

@Injectable()
export class NotificationReadUpdateRead {
  constructor(private NotificationReadRepository: NotificationReadRepository) {}

  public async exec({
    id_customer,
    id_notification,
  }: INotificationReadUpdateReadDTO): Promise<boolean> {
    return await this.NotificationReadRepository.updateRead({
      id_customer,
      id_notification,
    });
  }
}

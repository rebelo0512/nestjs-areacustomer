import { Injectable } from "@nestjs/common";

import { NotificationReadRepository } from "../../repositories/notification_read.repository";

@Injectable()
export class NotificationReadCountNotificationDontReadByCustomerId {
  constructor(private NotificationReadRepository: NotificationReadRepository) {}

  public async exec(id_customer: string): Promise<number> {
    return await this.NotificationReadRepository.countNotificationDontReadByCustomerId(
      id_customer,
    );
  }
}

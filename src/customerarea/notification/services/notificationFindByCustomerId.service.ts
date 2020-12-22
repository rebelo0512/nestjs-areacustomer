import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "@notification/repositories/notification.repository";
import { INotificationFindByCustomerIdDTO } from "../dto/INotificationFindByCustomerIdDTO";

@Injectable()
export class NotificationFindByCustomerId {
  constructor(private NotificationRepository: NotificationRepository) {}

  public async exec(
    id_customer: string,
  ): Promise<INotificationFindByCustomerIdDTO[]> {
    return await this.NotificationRepository.findByCustomerId(id_customer);
  }
}

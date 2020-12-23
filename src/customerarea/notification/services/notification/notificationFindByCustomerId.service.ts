import { Injectable } from "@nestjs/common";

import { NotificationRepository } from "@notification/repositories/notification.repository";
import {
  INotificationFindByCustomerIdDTO,
  INotificationFindByCustomerIdReturnDTO,
} from "../../dto/INotificationFindByCustomerIdDTO";

@Injectable()
export class NotificationFindByCustomerId {
  constructor(private NotificationRepository: NotificationRepository) {}

  public async exec(
    id_customer: string,
  ): Promise<INotificationFindByCustomerIdReturnDTO> {
    const read: INotificationFindByCustomerIdDTO[] = [];
    const unread: INotificationFindByCustomerIdDTO[] = [];

    const result = await this.NotificationRepository.findByCustomerId(
      id_customer,
    );

    await Promise.all(
      result.map(async (r) => {
        r.read === true ? read.push(r) : unread.push(r);
      }),
    );

    return { read, unread };
  }
}

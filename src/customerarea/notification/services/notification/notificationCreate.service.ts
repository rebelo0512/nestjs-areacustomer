import { CustomerRepository } from "@customerarea/customer/repositories/customer.repository";
import { Injectable } from "@nestjs/common";
import { INotificationCreateDTO } from "../../dto/INotificationCreateDTO";
import { NotificationRepository } from "../../repositories/notification.repository";
import { NotificationReadRepository } from "../../repositories/notification_read.repository";

@Injectable()
export class NotificationCreate {
  constructor(
    private NotificationRepository: NotificationRepository,
    private CustomerRepository: CustomerRepository,
    private NotificationReadRepository: NotificationReadRepository,
  ) {}

  public async exec({
    type,
    title,
    description,
    city_objective,
    neigh_objective,
  }: INotificationCreateDTO): Promise<boolean> {
    const noti = await this.NotificationRepository.create({
      type,
      title,
      description,
      city_objective,
      neigh_objective,
    });

    const customers = await this.CustomerRepository.findByCityAndNeigh({
      city: city_objective,
      neigh: neigh_objective,
    });

    (async () => {
      customers.map(async (customer) => {
        await this.NotificationReadRepository.create({
          customer_id: customer.id,
          notification_id: noti.id,
        });
      });
    })();

    return true;
  }
}

import { Injectable } from "@nestjs/common";

import { Notification } from "@notification/models/notification.entity";
import { getConnection, getRepository } from "typeorm";
import { INotificationCreateDTO } from "../dto/INotificationCreateDTO";
import { INotificationFindByCustomerIdDTO } from "../dto/INotificationFindByCustomerIdDTO";
import { INotificationRepositoryDTO } from "../dto/INotificationRepositoryDTO";
import { NotificationReadRepository } from "./notification_read.repository";

@Injectable()
export class NotificationRepository implements INotificationRepositoryDTO {
  constructor(private NotificationReadRepository: NotificationReadRepository) {}

  public async findById(id_notification: string): Promise<Notification> {
    return await getConnection().query(`
      SELECT *
      FROM notifications
      WHERE id = "${id_notification}"
    `);
  }

  public async findByCustomerId(
    id_customer: string,
  ): Promise<INotificationFindByCustomerIdDTO[]> {
    const notifications: INotificationFindByCustomerIdDTO[] = [];
    let notification: Notification;

    const reads = this.NotificationReadRepository.findByCustomerId(id_customer);

    await Promise.all(
      (await reads).map(async (r) => {
        notification = await getConnection().query(`
          SELECT *
          FROM notifications
          WHERE id = '${r.notification_id}'
        `);

        notification = notification[0];

        notifications.push({
          id: notification.id,
          created_at: notification.created_at,
          type: notification.type,
          title: notification.title,
          description: notification.description,
          city_objective: notification.city_objective,
          neigh_objective: notification.neigh_objective,
          read: r.read,
        });
      }),
    );

    return notifications;
  }

  public async create({
    type,
    title,
    description,
    city_objective,
    neigh_objective,
  }: INotificationCreateDTO): Promise<Notification> {
    const notificationRepository = getRepository(Notification);

    const notification = notificationRepository.create({
      type,
      title,
      description,
      city_objective,
      neigh_objective,
    });

    await notificationRepository.save(notification);

    return notification;
  }
}

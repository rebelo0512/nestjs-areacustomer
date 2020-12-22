import { Injectable } from "@nestjs/common";
import { getConnection, getRepository } from "typeorm";
import { INotificationReadCreateDTO } from "../dto/INotificationReadCreateDTO";
import { INotificationReadRepositoryDTO } from "../dto/INotificationReadRepositoryDTO";
import { INotificationReadUpdateReadDTO } from "../dto/INotificationReadUpdateReadDTO";
import { NotificationRead } from "../models/notification_read.entity";

@Injectable()
export class NotificationReadRepository
  implements INotificationReadRepositoryDTO {
  public async findByCustomerId(
    id_customer: string,
  ): Promise<NotificationRead[]> {
    return await getConnection().query(`
      SELECT *
      FROM notifications_read
      WHERE customer_id = '${id_customer}'
    `);
  }

  public async create({
    customer_id,
    notification_id,
  }: INotificationReadCreateDTO): Promise<void> {
    const notiReadRepository = getRepository(NotificationRead);

    const noti = notiReadRepository.create({ customer_id, notification_id });

    await notiReadRepository.save(noti);
  }

  public async updateRead({
    id_customer,
    id_notification,
  }: INotificationReadUpdateReadDTO): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .update(NotificationRead)
      .set({
        read: true,
      })
      .where(
        "customer_id = :id_customer AND notification_id = :id_notification",
        { id_customer, id_notification },
      )
      .execute();

    return true;
  }
}

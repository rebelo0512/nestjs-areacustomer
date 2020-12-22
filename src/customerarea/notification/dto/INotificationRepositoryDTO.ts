import { Notification } from "@notification/models/notification.entity";
import { INotificationCreateDTO } from "./INotificationCreateDTO";

export interface INotificationRepositoryDTO {
  findById(id_notification: string): Promise<Notification>;
  // findByCustomerId(id_customer: string): Promise<Notification[]>;
  create(data: INotificationCreateDTO): Promise<Notification>;
}

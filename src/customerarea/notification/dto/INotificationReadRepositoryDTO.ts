import { NotificationRead } from "../models/notification_read.entity";
import { INotificationReadCreateDTO } from "./INotificationReadCreateDTO";
import { INotificationReadUpdateReadDTO } from "./INotificationReadUpdateReadDTO";

export interface INotificationReadRepositoryDTO {
  findByCustomerId(id_customer: string): Promise<NotificationRead[]>;
  countNotificationDontReadByCustomerId(id_customer: string): Promise<number>;
  create(data: INotificationReadCreateDTO): Promise<void>;
  updateRead(data: INotificationReadUpdateReadDTO): Promise<boolean>;
}

import { CustomerTokenValidationGuard } from "@customerarea/customer/guards/CustomerTokenValidation.guard";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { INotificationFindByCustomerIdDTO } from "../dto/INotificationFindByCustomerIdDTO";
import { NotificationCreate } from "../services/notificationCreate.service";
import { NotificationFindByCustomerId } from "../services/notificationFindByCustomerId.service";
import { CustomerTokenAndIdValidationGuard } from "@customerarea/customer/guards/CustomerTokenAndIdValidation.guard";
import { NotificationCreateValidationGuard } from "../guards/notificationCreateValidation.guard";

@Controller("notifications")
@UseGuards(CustomerTokenValidationGuard)
export class NotificationController {
  constructor(
    private NotificationFindByCustomerId: NotificationFindByCustomerId,
    private NotificationCreate: NotificationCreate,
  ) {}

  @Get(":id_customer") // Path: /notifications/:id_customer
  @UseGuards(CustomerTokenAndIdValidationGuard)
  public async findByCustomerId(
    @Param("id_customer") id_customer: string,
  ): Promise<INotificationFindByCustomerIdDTO[]> {
    return await this.NotificationFindByCustomerId.exec(id_customer);
  }

  @Post("") // Path: /notifications
  @UseGuards(NotificationCreateValidationGuard)
  public async create(
    @Body("type") type: string,
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("city_objective") city_objective: string,
    @Body("neigh_objective") neigh_objective: string,
  ): Promise<boolean> {
    return await this.NotificationCreate.exec({
      type,
      title,
      description,
      city_objective,
      neigh_objective,
    });
  }
}

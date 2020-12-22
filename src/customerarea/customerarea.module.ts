import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { NotificationModule } from "./notification/notification.module";

@Module({
  imports: [CustomerModule, NotificationModule],
})
export class CustomerareaModule {}

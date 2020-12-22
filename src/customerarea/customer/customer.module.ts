import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IxcModule } from "@ixc/ixc.module";
import Customer from "./models/customer.entity";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerController } from "./routes/customer.controller";
import { CustomerSendBilletEmail } from "./services/customerSendBilletEmail.service";
import { CustomerGetFinancialInfo } from "./services/customerGetFinancialInfo.service";
import { CustomerGetPersonalInfo } from "./services/customerGetPersonalInfo.service";
import { AbbreviateNames } from "./utils/AbbreviateNames";
import { CustomerAuth } from "./services/customerAuth.service";
import { CustomerChangePassword } from "./services/customerChangePassword.service";

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), IxcModule],
  controllers: [CustomerController],
  providers: [
    CustomerRepository,
    AbbreviateNames,
    CustomerAuth,
    CustomerGetPersonalInfo,
    CustomerChangePassword,
    CustomerGetFinancialInfo,
    CustomerSendBilletEmail,
  ],
  exports: [CustomerRepository],
})
export class CustomerModule {}

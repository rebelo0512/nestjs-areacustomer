import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IxcModule } from "@ixc/ixc.module";
import Customer from "./models/customer.entity";
import { PasswordReset } from "./models/password_reset.entity";
import { CustomerRepository } from "./repositories/customer.repository";
import { CustomerController } from "./routes/customer.controller";
import { PasswordResetController } from "./routes/password_reset.controller";
import { CustomerSendBilletEmail } from "./services/customer/customerSendBilletEmail.service";
import { CustomerGetFinancialInfo } from "./services/customer/customerGetFinancialInfo.service";
import { CustomerGetPersonalInfo } from "./services/customer/customerGetPersonalInfo.service";
import { AbbreviateNames } from "./utils/AbbreviateNames";
import { CustomerAuth } from "./services/customer/customerAuth.service";
import { CustomerChangePassword } from "./services/customer/customerChangePassword.service";
import { PasswordResetRepository } from "./repositories/password_reset.repository";
import { PasswordResetForgetPassword } from "./services/password_reset/passwordResetForgetPassword.service";
import { TransformDocument } from "./utils/TransformDocument";
import { MailModule } from "src/mail/mail.module";
import { PasswordResetChangePassword } from "./services/password_reset/passwordResetChangePassword.service";
import { CustomerPreRegistration } from "./services/customer/customerPreRegistration.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, PasswordReset]),
    IxcModule,
    MailModule,
  ],
  controllers: [CustomerController, PasswordResetController],
  providers: [
    CustomerRepository,
    PasswordResetRepository,
    AbbreviateNames,
    TransformDocument,
    CustomerAuth,
    CustomerGetPersonalInfo,
    CustomerChangePassword,
    CustomerGetFinancialInfo,
    CustomerSendBilletEmail,
    CustomerPreRegistration,
    PasswordResetForgetPassword,
    PasswordResetChangePassword,
  ],
  exports: [CustomerRepository],
})
export class CustomerModule {}

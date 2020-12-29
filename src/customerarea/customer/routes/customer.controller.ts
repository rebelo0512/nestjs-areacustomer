import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { IMailSendPreRegistrationDTO } from "src/mail/dto/IMailSendPreRegistrationDTO";

import { ICustomerAuthReturnDTO } from "../dto/ICustomerAuthDTO";
import { ICustomerFinancialInfoReturnDTO } from "../dto/ICustomerGetFinancialInfoDTO";
import { ICustomerGetPersonalInfoDTO } from "../dto/ICustomerGetPersonalInfoDTO";
import { CustomerAuthValidationGuard } from "../guards/CustomerAuthValidation.guard";
import { CustomerCodeValidationGuard } from "../guards/CustomerCodeValidation.guard";
import { CustomerTokenValidationGuard } from "../guards/CustomerTokenValidation.guard";
import { CustomerAuth } from "../services/customer/customerAuth.service";
import { CustomerChangePassword } from "../services/customer/customerChangePassword.service";
import { CustomerGetFinancialInfo } from "../services/customer/customerGetFinancialInfo.service";
import { CustomerGetPersonalInfo } from "../services/customer/customerGetPersonalInfo.service";
import { CustomerPreRegistration } from "../services/customer/customerPreRegistration.service";
import { CustomerSendBilletEmail } from "../services/customer/customerSendBilletEmail.service";

@Controller("customers")
export class CustomerController {
  constructor(
    private CustomerAuth: CustomerAuth,
    private CustomerGetPersonalInfo: CustomerGetPersonalInfo,
    private CustomerChangePassword: CustomerChangePassword,
    private CustomerGetFinancialInfo: CustomerGetFinancialInfo,
    private CustomerSendBilletEmail: CustomerSendBilletEmail,
    private CustomerPreRegistration: CustomerPreRegistration,
  ) {}

  @Post("login") // Path: /customers/login
  @UseGuards(CustomerAuthValidationGuard)
  public async auth(
    @Body("username") username: string,
    @Body("password") password: string,
    @Body("rememberMe") rememberMe: string[],
  ): Promise<ICustomerAuthReturnDTO> {
    const token = await this.CustomerAuth.exec({
      username,
      password,
      rememberMe,
    });

    return token;
  }

  @Get(":code/info/personal") // Path: /customers/:code/info/personal
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async customerPersonalInfo(
    @Param("code") code: number,
  ): Promise<ICustomerGetPersonalInfoDTO> {
    const customer = await this.CustomerGetPersonalInfo.exec(code);

    return customer;
  }

  @Put(":code/info/personal/:document/change_password") // Path: /customers/:code/info/personal/:document/change_password
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async changePassword(
    @Param("code") code: number,
    @Param("document") document: string,
    @Body("password") password: string,
  ): Promise<boolean> {
    return await this.CustomerChangePassword.exec({ code, document, password });
  }

  @Get(":code/info/financial/:contract") // Path: /customers/:code/info/financial/:contract
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async getFinancialInfo(
    @Param("code") code: number,
    @Param("contract") contract: string,
  ): Promise<ICustomerFinancialInfoReturnDTO> {
    return await this.CustomerGetFinancialInfo.exec({
      code,
      contract,
    });
  }

  @Get(":code/info/billet/:code_billet") // Path: /customers/:code/info/billet/:code_billet
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async sendBilletEmail(
    @Param("code_billet") code_billet: number,
  ): Promise<boolean> {
    return await this.CustomerSendBilletEmail.exec(code_billet);
  }

  @Post("/pre_registration")
  public async preRegistration(@Req() req: Request): Promise<void> {
    const data: IMailSendPreRegistrationDTO = req.body;

    return await this.CustomerPreRegistration.exec(data);
  }
}

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

import { ICustomerAuthReturnDTO } from "../dto/ICustomerAuthDTO";
import { ICustomerFinancialInfoReturnDTO } from "../dto/ICustomerGetFinancialInfoDTO";
import { ICustomerGetPersonalInfoDTO } from "../dto/ICustomerGetPersonalInfoDTO";
import {
  ICustomerPreRegistrationDTO,
  ICustomerPreRegistrationReturnDTO,
} from "../dto/ICustomerPreRegistrationDTO";
import { CustomerAuthValidationGuard } from "../guards/CustomerAuthValidation.guard";
import { CustomerCodeValidationGuard } from "../guards/CustomerCodeValidation.guard";
import { CustomerTokenValidationGuard } from "../guards/CustomerTokenValidation.guard";
import { CustomerAuth } from "../services/customer/customerAuth.service";
import { CustomerChangePassword } from "../services/customer/customerChangePassword.service";
import { CustomerGetBilletArchive } from "../services/customer/customerGetBilletArchive.service";
import { CustomerGetFinancialInfo } from "../services/customer/customerGetFinancialInfo.service";
import { CustomerGetPersonalInfo } from "../services/customer/customerGetPersonalInfo.service";
import { CustomerPreRegistration } from "../services/customer/customerPreRegistration.service";
import { CustomerReduceContract } from "../services/customer/customerReduceContract.service";
import { CustomerSendBilletEmail } from "../services/customer/customerSendBilletEmail.service";
import { CustomerTrustUnlock } from "../services/customer/customerTrustUnlock.service";

@Controller("customers")
export class CustomerController {
  constructor(
    private CustomerAuth: CustomerAuth,
    private CustomerGetPersonalInfo: CustomerGetPersonalInfo,
    private CustomerChangePassword: CustomerChangePassword,
    private CustomerGetFinancialInfo: CustomerGetFinancialInfo,
    private CustomerSendBilletEmail: CustomerSendBilletEmail,
    private CustomerPreRegistration: CustomerPreRegistration,
    private CustomerGetBilletArchive: CustomerGetBilletArchive,
    private CustomerReduceContract: CustomerReduceContract,
    private CustomerTrustUnlock: CustomerTrustUnlock,
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

  @Get(":code/info/billet/:code_billet/archive") // Path: /customers/:code/info/billet/:code_billet/archive
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async billetArchive(
    @Req() req: Request,
    @Param("code_billet") code_billet: number,
  ) {
    const result = await this.CustomerGetBilletArchive.exec(code_billet);

    return {
      status: "success",
      link: `${req.protocol}://${process.env.HOST}:${process.env.PORT}/${process.env.PUBLIC_URL_FILES}/${result}`,
    };
  }

  @Get(":code/:contract/reduce") // Path: /customers/:code/:contract/reduce
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async reduceContract(
    @Req() req: Request,
    @Param("contract") contract: number,
  ) {
    const result = await this.CustomerReduceContract.exec(contract);

    return {
      status: "success",
      result,
    };
  }

  @Get(":code/:contract/trust_unlock") // Path: /customers/:code/:contract/trust_unlock
  @UseGuards(CustomerTokenValidationGuard, CustomerCodeValidationGuard)
  public async trustUnlock(
    @Req() req: Request,
    @Param("contract") contract: number,
  ) {
    const result = await this.CustomerTrustUnlock.exec(contract);

    return {
      status: "success",
      result,
    };
  }

  @Post("/pre_registration") // Path: /customers/pre_registration
  public async preRegistration(
    @Req() req: Request,
  ): Promise<ICustomerPreRegistrationReturnDTO> {
    const data: ICustomerPreRegistrationDTO = req.body;

    return await this.CustomerPreRegistration.exec(data);
  }
}

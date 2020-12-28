import { Injectable } from "@nestjs/common";

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { ICustomerChangePasswordDTO } from "../../dto/ICustomerChangePasswordDTO";
import { CustomerRepository } from "../../repositories/customer.repository";

@Injectable()
export class CustomerChangePassword {
  constructor(
    private IxcRepository: IxcRepository,
    private CustomerRepository: CustomerRepository,
  ) {}

  public async exec({
    code,
    document,
    password,
  }: ICustomerChangePasswordDTO): Promise<boolean> {
    await this.IxcRepository.changePasswordHotsite({
      code,
      document,
      password,
    });

    await this.CustomerRepository.updateFirstAccess(code);

    return true;
  }
}

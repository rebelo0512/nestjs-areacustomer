import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { Injectable } from "@nestjs/common";
import { ICustomerChangePasswordDTO } from "../dto/ICustomerChangePasswordDTO";

@Injectable()
export class CustomerChangePassword {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec({
    code,
    document,
    password,
  }: ICustomerChangePasswordDTO): Promise<boolean> {
    return await this.IxcRepository.changePasswordHotsite({
      code,
      document,
      password,
    });
  }
}

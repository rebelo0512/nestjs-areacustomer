import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { differenceInHours } from "date-fns";

import { CustomerRepository } from "@customerarea/customer/repositories/customer.repository";
import { PasswordResetRepository } from "@customerarea/customer/repositories/password_reset.repository";
import { TransformDocument } from "@customerarea/customer/utils/TransformDocument";
import {
  IPasswordResetChangePasswordDTO,
  IPasswordResetChangePasswordReturnDTO,
} from "@customerarea/customer/dto/IPasswordResetChangePasswordDTO";
import { IxcRepository } from "@ixc/repositories/ixc.repository";

@Injectable()
export class PasswordResetChangePassword {
  constructor(
    private CustomerRepository: CustomerRepository,
    private PasswordResetRepository: PasswordResetRepository,
    private IxcRepository: IxcRepository,
    private TransformDocument: TransformDocument,
  ) {}

  public async exec({
    document,
    password,
    id_password_forget,
  }: IPasswordResetChangePasswordDTO): Promise<IPasswordResetChangePasswordReturnDTO> {
    document = await this.TransformDocument.numberToDocument(document);

    const customer = await this.CustomerRepository.findByDocument(document);

    if (customer.length === 0)
      throw new HttpException("No customer found", HttpStatus.FORBIDDEN);

    const customer_id = customer[0].id;

    const customer_code = customer[0].code;

    const customer_document = customer[0].document;

    const passwd = await this.PasswordResetRepository.findByCustomerId(
      customer_id,
    );

    if (passwd.length === 0)
      throw new HttpException(
        "No password change request",
        HttpStatus.FORBIDDEN,
      );
    else if (passwd[0].id !== id_password_forget)
      throw new HttpException("Don't have permission", HttpStatus.UNAUTHORIZED);

    const passwd_created_at = passwd[0].created_at;

    const count_hours_passwd_created = differenceInHours(
      new Date(),
      passwd_created_at,
    );

    if (count_hours_passwd_created >= 4)
      throw new HttpException(
        "Password request expired",
        HttpStatus.REQUEST_TIMEOUT,
      );

    await this.IxcRepository.changePasswordHotsite({
      code: customer_code,
      document: customer_document,
      password,
    });

    await this.PasswordResetRepository.del(customer_id);

    return { status: "success", message: "Password successfully changed" };
  }
}

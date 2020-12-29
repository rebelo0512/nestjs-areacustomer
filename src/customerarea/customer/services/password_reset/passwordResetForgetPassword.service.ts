import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CustomerRepository } from "@customerarea/customer/repositories/customer.repository";
import { PasswordResetRepository } from "@customerarea/customer/repositories/password_reset.repository";
import {
  IPasswordResetForgetPasswordDTO,
  IPasswordResetForgetPasswordReturnDTO,
} from "@customerarea/customer/dto/IPasswordResetForgetPasswordDTO";
import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { TransformDocument } from "@customerarea/customer/utils/TransformDocument";
import { MailRepository } from "src/mail/repositories/mail.repository";

@Injectable()
export class PasswordResetForgetPassword {
  constructor(
    private CustomerRepository: CustomerRepository,
    private IxcRepository: IxcRepository,
    private PasswordResetRepository: PasswordResetRepository,
    private MailRepository: MailRepository,
    private TransformDocument: TransformDocument,
  ) {}

  public async exec({
    document,
  }: IPasswordResetForgetPasswordDTO): Promise<IPasswordResetForgetPasswordReturnDTO> {
    document = await this.TransformDocument.numberToDocument(document);

    const customer = await this.CustomerRepository.findByDocument(document);

    if (!customer)
      throw new HttpException("No customer found", HttpStatus.FORBIDDEN);

    const customer_id = customer[0].id;

    const ixc_customer = await this.IxcRepository.findCustomerByDocument(
      document,
    );

    const pass_reset_exists = await this.PasswordResetRepository.findByCustomerId(
      customer_id,
    );

    if (pass_reset_exists) {
      await this.PasswordResetRepository.del(customer_id);
    }

    const passwd = await this.PasswordResetRepository.create(customer_id);

    await this.MailRepository.sendPasswordReset({
      from: "neocliente@neorede.com.br",
      to: ixc_customer.email,
      subject: "NeoCliente - Redefinição de Senha",
      id_pass_reset: passwd.id,
    });

    return {
      status: "success",
      message: "Email enviado com sucesso",
      email: ixc_customer.email,
    };
  }
}

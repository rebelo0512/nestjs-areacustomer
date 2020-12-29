import { Injectable } from "@nestjs/common";

import { MailRepository } from "src/mail/repositories/mail.repository";
import { IMailSendPreRegistrationDTO } from "src/mail/dto/IMailSendPreRegistrationDTO";

@Injectable()
export class CustomerPreRegistration {
  constructor(private MailRepository: MailRepository) {}

  public async exec(data: IMailSendPreRegistrationDTO): Promise<void> {
    data.from = "neocliente@neorede.com.br";
    data.to = "neocliente@neorede.com.br";
    data.subject = "Pré-Cadastro";
    await this.MailRepository.sendPreRegistration(data);
  }
}

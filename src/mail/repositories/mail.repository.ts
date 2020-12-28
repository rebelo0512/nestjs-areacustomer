import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

import { IMailRepositoryDTO } from "../dto/IMailRepositoryDTO";
import { IMailSendPasswordResetDTO } from "../dto/IMailSendPasswordResetDTO";

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = process.env;

@Injectable()
export class MailRepository implements IMailRepositoryDTO {
  config = {
    transporter: {
      host: MAIL_HOST,
      port: Number(MAIL_PORT) || 465,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    },
  };
  transporter = createTransport(this.config.transporter);

  constructor() {
    this.transporter = this.transporter;
  }

  public async sendPasswordReset({
    from,
    to,
    subject,
    id_pass_reset,
  }: IMailSendPasswordResetDTO): Promise<boolean> {
    await this.transporter.sendMail({
      from,
      to,
      subject,
      html: `
    <b>Olá,</b>
    <p>Recebemos um pedido de redefinição de sua senha da Área do Cliente.</p>
    <b>Por favor, clique no link abaixo e siga as instruções para criar uma nova senha:</b>
    <p>URL: https://neocliente.neorede.com.br/password_reset/${id_pass_reset}</p>
    <p>O link para redefinição de senha é válido por 24 horas.</p>
    <p>Caso você não tenha feito essa solicitação, ignore este e-mail.</p>
    <p>Agradecemos o contato.</p>
    `,
    });

    return true;
  }
}

import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";

import { IMailRepositoryDTO } from "../dto/IMailRepositoryDTO";
import { IMailSendPasswordResetDTO } from "../dto/IMailSendPasswordResetDTO";
import { IMailSendPreRegistrationDTO } from "../dto/IMailSendPreRegistrationDTO";

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

  public async sendPreRegistration(
    data: IMailSendPreRegistrationDTO,
  ): Promise<boolean> {
    await this.transporter.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: `
    <p>Segue pedido de pré cadastro:</p>
    <b>--|-- Dados Pessoais --|--</b>
    <p> - Nome: ${data.name}</p>
    <p> - Documento - CPF: ${data.cpf}</p>
    <p> - Documento - RG: ${data.rg}</p>
    <p> - Data Aniversario: ${data.dateofbirth}</p>
    <b>--|-- Contato --|--</b>
    <p> - Email: ${data.email}</p>
    <p> - Celular: ${data.cellphone}</p>
    <p> - Telefone: ${data.phone}</p>
    <p> - Celular Opcional: ${data.optionalcellphone}</p>
    <p> - Telefone Opcional: ${data.optionalphone}</p>
    <b>--|-- Endereço --|--</b>
    <p> - Moradia: ${data.type}</p>
    <p> - Referencia: ${data.type === "Casa" ? data.reference : ""}</p>
    <p> - CEP: ${data.cep}</p>
    <p> - Cidade: ${data.city}</p>
    <p> - Bairro: ${data.neigh}</p>
    <p> - Endereço: ${data.address}</p>
    <p> - Nome do Condominio: ${
      data.type === "Apartamento" ? data.nameofcondominium : ""
    }</p>
    <b>--|-- Plano --|--</b>
    <p> - Plano: ${data.plan}</p>
    <b>--|-- Vencimento e Instalação --|--</b>
    <p> - Periodo de Instalação: ${data.period}</p>
    <p> - Melhor Dia de Vencimento: ${data.dueDate}</p>
    <p> - Observação: ${data.obs}</p>
    <p> - Por Onde Nos Conheceu: ${data.youknowus}</p>
    <p>Agradecemos o contato.</p>
    `,
    });

    return true;
  }
}

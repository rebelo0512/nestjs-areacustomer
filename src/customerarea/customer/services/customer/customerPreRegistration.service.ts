import { Injectable } from "@nestjs/common";

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import {
  ICustomerPreRegistrationDTO,
  ICustomerPreRegistrationReturnDTO,
} from "./../../dto/ICustomerPreRegistrationDTO";

@Injectable()
export class CustomerPreRegistration {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec(
    data: ICustomerPreRegistrationDTO,
  ): Promise<ICustomerPreRegistrationReturnDTO> {
    const date = data.dateofbirth;

    const home =
      data.type === "Apartamento"
        ? `Moradia: Apartamento\n   Nome do Condominio: ${data.nameofcondominium}`
        : "Moradia: Casa";

    await this.IxcRepository.createLead({
      nome: await this.utf8Encode(data.name.toUpperCase()),
      razao: await this.utf8Encode(data.name.toUpperCase()),
      bairro: await this.utf8Encode(data.neigh.toUpperCase()),
      cep: data.cep,
      cidade: await this.utf8Encode(data.city.toUpperCase()),
      cnpj_cpf: data.cpf,
      complemento: data.type === "Apartamento" ? data.complement : "",
      data_nascimento: `${date.substr(5, 2)}/${date.substr(8, 2)}/${date.substr(
        0,
        4,
      )}`,
      email: await this.utf8Encode(data.email),
      email_atendimento: await this.utf8Encode(data.email),
      endereco: await this.utf8Encode(data.address.toUpperCase()),
      fone_celular: data.cellphone,
      // fone_comercial: data.optionalphone,
      fone_residencial: data.phone,
      // fone_whatsapp: data.optionalcellphone,
      numero: data.number,
      obs: `${home}
        RG: ${data.rg}
        Periodo: ${data.period}
        Data De Vencimento: ${data.dueDate}
        Telefone Fixo Opcional: ${data.optionalphone}
        Celular Opcional: ${data.optionalcellphone}
        Onde Nos Conheceu: ${data.youknowus}
        Observacao: ${data.obs}
        id do plano de venda: ${data.plan}
        `,
      referencia: data.type === "Casa" ? data.reference : "",
      id_vd_contrato: parseInt(data.plan),
      id_candidato_tipo: 10,
      id_filial: 1,
    });

    return {
      status: "success",
      message: "Pré-Cadastro cadastrado com sucesso",
    };
  }

  private async utf8Encode(unicodeString: string): Promise<string> {
    const utf8String = unicodeString
      .replace(/[\u0080-\u07ff]/g, function (c: string) {
        const cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | (cc >> 6), 0x80 | (cc & 0x3f));
      })
      .replace(/[\u0800-\uffff]/g, function (c: string) {
        const cc = c.charCodeAt(0);
        return String.fromCharCode(
          0xe0 | (cc >> 12),
          0x80 | ((cc >> 6) & 0x3f),
          0x80 | (cc & 0x3f),
        );
      });
    return utf8String;
  }
}

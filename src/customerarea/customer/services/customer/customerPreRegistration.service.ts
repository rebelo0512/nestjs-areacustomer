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
      nome: data.name.toUpperCase(),
      razao: data.name.toUpperCase(),
      bairro: data.neigh.toUpperCase(),
      cep: data.cep,
      cidade: data.city.toUpperCase(),
      cnpj_cpf: data.cpf,
      complemento: data.type === "Apartamento" ? data.complement : "",
      data_nascimento: `${date.substr(5, 2)}/${date.substr(8, 2)}/${date.substr(
        0,
        4,
      )}`,
      email: data.email,
      email_atendimento: data.email,
      endereco: data.address.toUpperCase(),
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
}

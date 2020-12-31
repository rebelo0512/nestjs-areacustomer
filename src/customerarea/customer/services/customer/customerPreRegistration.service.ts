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
    await this.IxcRepository.createLead({
      nome: data.name,
      razao: data.name,
      bairro: data.neigh,
      cep: data.cep,
      cidade: data.city,
      cnpj_cpf: data.cpf,
      complemento: data.reference,
      data_nascimento: data.dateofbirth,
      email: data.email,
      email_atendimento: data.email,
      endereco: data.address,
      fone_celular: data.cellphone,
      fone_comercial: data.optionalphone,
      fone_residencial: data.phone,
      fone_whatsapp: data.optionalcellphone,
      numero: data.number,
      obs: data.plan,
      referencia: data.reference,
    });

    return {
      status: "success",
      message: "Pré-Cadastro cadastrado com sucesso",
    };
  }
}

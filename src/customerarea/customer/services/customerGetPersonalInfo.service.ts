import { Injectable } from "@nestjs/common";
import { format, parseISO } from "date-fns";

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { ICustomerGetPersonalInfoDTO } from "../dto/ICustomerGetPersonalInfoDTO";

@Injectable()
export class CustomerGetPersonalInfo {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec(code: number): Promise<ICustomerGetPersonalInfoDTO> {
    const contracts = [];

    const client = await this.IxcRepository.findCustomerById(code);

    const date_birth =
      client.data_nascimento !== "0000-00-00"
        ? format(parseISO(client.data_nascimento), "d/M/yyyy")
        : "Null";

    const city = await this.IxcRepository.findCityById(client.cidade);

    const contratos = await this.IxcRepository.findContractByCustomerId(code);

    await Promise.all(
      contratos.map((contrato) => {
        contracts.push({
          id: contrato.id,
          plan: contrato.contrato,
          ativacao: format(parseISO(contrato.data_ativacao), "d/M/yyyy"),
        });
      }),
    );

    return {
      // Info Cliente
      name: client.nome,
      date_birth,
      email: client.email,
      nickname: "",
      number_cel: client.telefone_celular,
      number_cel2: "",
      number_phone: client.telefone_comercial,
      number_phone2: "",
      // Info Endereço
      cep: client.cep,
      street: client.endereco,
      street_number: client.numero,
      neigh: client.bairro,
      complement: client.complemento,
      reference: client.referencia,
      state: "SC",
      city,
      // Info Contratos
      contracts,
    };
  }
}

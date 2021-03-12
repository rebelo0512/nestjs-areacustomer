import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IXCAPI } from "@ixc/utils/IXCAPI";
import { IIxcRepositoryDTO } from "@ixc/dto/IIxcRepositoryDTO";
import { IIxcFindCustomerByIdDTO } from "@ixc/dto/IIxcFindCustomerByIdDTO";
import { IIxcFindCustomerByHotsiteEmailDTO } from "@ixc/dto/IIxcFindCustomerByHotsiteEmailDTO";
import { IIxcFindContractByCustomerIdDTO } from "@ixc/dto/IIxcFindContractByCustomerIdDTO";
import { IIxcFindBilletByContractIdDTO } from "@ixc/dto/IIxcFindBilletByContractIdDTO";
import { IIxcChangePasswordHotsiteDTO } from "@ixc/dto/IIxcChangePasswordHotsiteDTO";
import { IIxcCreateLeadDTO } from "@ixc/dto/IIxcCreateLeadDTO";

@Injectable()
export class IxcRepository implements IIxcRepositoryDTO {
  api = new IXCAPI({
    url: process.env.IXC_URL,
    token: process.env.IXC_TOKEN,
  });

  constructor() {
    this.api = this.api;
  }

  public async findCustomerById(
    code: number,
  ): Promise<IIxcFindCustomerByIdDTO> {
    const form = "cliente";
    const params = {
      qtype: `${form}.id`,
      query: code,
      oper: "=",
      page: "1",
      rp: "1",
      sortname: "cliente.id",
      sortorder: "desc",
    };
    let customer = await this.api.select({ form, params });

    if (customer.data.total === "0")
      throw new HttpException("No customer found", HttpStatus.FORBIDDEN);

    customer = await customer.data.registros[0];

    return customer;
  }

  public async findCustomerByHotsiteEmail(
    email: string,
  ): Promise<IIxcFindCustomerByHotsiteEmailDTO> {
    const form = "cliente";
    const params = {
      qtype: `${form}.hotsite_email`,
      query: email,
      oper: "=",
      page: "1",
      rp: "1",
      sortname: "cliente.id",
      sortorder: "desc",
    };
    let customer = await this.api.select({ form, params });

    if (customer.data.total == "0")
      throw new HttpException("No customer found", HttpStatus.FORBIDDEN);

    customer = await customer.data.registros[0];

    return customer;
  }

  public async findContractByCustomerId(
    code: number,
  ): Promise<IIxcFindContractByCustomerIdDTO[]> {
    const form = "cliente_contrato";
    const params = {
      qtype: `${form}.id_cliente`,
      query: code,
      oper: "=",
      page: "1",
      rp: "1",
      sortname: `${form}.data_ativacao`,
      sortorder: "asc",
    };
    let contratos = await this.api.select({ form, params });

    if (contratos.data.total == "0")
      throw new HttpException("No contracts found", HttpStatus.FORBIDDEN);

    contratos = await contratos.data.registros;

    return contratos;
  }

  public async findCustomerByDocument(
    document: string,
  ): Promise<IIxcFindCustomerByIdDTO> {
    const form = "cliente";
    const params = {
      qtype: `${form}.cnpj_cpf`,
      query: document,
      oper: "=",
      page: "1",
      rp: "1",
      sortname: "cliente.id",
      sortorder: "asc",
    };
    let customer = await this.api.select({ form, params });

    if (customer.data.total === "0")
      throw new HttpException("No customer found", HttpStatus.FORBIDDEN);

    customer = await customer.data.registros[0];

    return customer;
  }

  public async findCityById(id_city: number | string): Promise<string> {
    const form = "cidade";
    const params = {
      qtype: `${form}.id`,
      query: id_city,
      oper: "=",
      page: "1",
      rp: "1",
      sortname: `${form}.id`,
      sortorder: "desc",
    };
    let city = await this.api.select({ form, params });

    if (city.data.total == "0")
      throw new HttpException("No cities found", HttpStatus.FORBIDDEN);

    city = await city.data.registros[0];

    return city.nome;
  }

  public async findBilletByContractId(
    id_contract: number,
  ): Promise<IIxcFindBilletByContractIdDTO[]> {
    const form = "fn_areceber";
    const params = {
      qtype: `${form}.id_cliente`,
      query: id_contract,
      oper: "=",
      page: "1",
      rp: "9999",
      sortname: `${form}.id`,
      sortorder: "asc",
    };
    let boletos = await this.api.select({ form, params });

    boletos = boletos.data.registros;

    return boletos;
  }

  public async sendBilletMail(id_billet: number): Promise<boolean> {
    const form = "get_boleto";
    const params = {
      boletos: `${id_billet}`,
      juro: "N",
      multa: "N",
      atualiza_boleto: "N",
      tipo_boleto: "mail",
    };

    await this.api.select({ form, params });

    return true;
  }

  public async billetArchive(id_billet: number): Promise<string> {
    const form = "get_boleto";
    const params = {
      boletos: `${id_billet}`,
      juro: "N",
      multa: "N",
      atualiza_boleto: "N",
      tipo_boleto: "arquivo",
      base64: "S",
    };

    const billet = await this.api.select({ form, params });

    return billet;
  }

  public async createLead({
    nome,
    razao,
    cnpj_cpf,
    data_nascimento,
    email_atendimento,
    fone_residencial,
    fone_celular,
    email,
    cep,
    endereco,
    numero,
    bairro,
    complemento,
    cidade,
    id_vd_contrato,
    id_filial,
    id_candidato_tipo,
    referencia,
    obs,
  }: IIxcCreateLeadDTO): Promise<boolean> {
    const form = "contato";
    const params = {
      nome,
      razao,
      cnpj_cpf,
      data_cadastro: new Date(),
      data_nascimento,
      email_atendimento,
      fone_residencial,
      fone_celular,
      email,
      cep,
      endereco,
      numero,
      bairro,
      complemento,
      cidade,
      id_vd_contrato,
      id_filial,
      id_candidato_tipo,
      referencia,
      obs,
    };

    await this.api.create({ form, params });

    return true;
  }

  public async changePasswordHotsite({
    code,
    document,
    password,
  }: IIxcChangePasswordHotsiteDTO): Promise<boolean> {
    const customer = await this.findCustomerById(code);

    const form = "cliente";
    const params = {
      id: customer.id,
      ativo: customer.ativo,
      razao: customer.razao,
      cnpj_cpf: customer.cnpj_cpf,
      endereco: customer.endereco,
      cidade: customer.cidade,
      bairro: customer.bairro,
      numero: customer.numero,
      cep: customer.cep,
      tipo_pessoa: customer.tipo_pessoa,
      hotsite_email: customer.hotsite_email,
      telefone_celular: customer.telefone_celular,
      iss_classificacao_padrao: customer.iss_classificacao_padrao,
      contribuinte_icms: customer.contribuinte_icms,
      tipo_assinante: customer.tipo_assinante,
      email: customer.email,
      senha: password,
      tipo_localidade: "U",
    };

    const customer_document = customer.cnpj_cpf.replace(/[/.-]/g, "");

    if (customer_document !== document)
      throw new HttpException("Don't have permission", HttpStatus.BAD_REQUEST);

    const teste = await this.api.update({ form, params, id: code });

    return true;
  }
}

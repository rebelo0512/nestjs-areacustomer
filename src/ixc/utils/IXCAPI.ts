import axios from "axios";

export class IXCAPI {
  url: string;
  token: string;

  constructor({ url = "", token = "" }: IIxcapiDTO) {
    this.url = url;
    this.token = token;
  }

  private auth() {
    return `Basic ${Buffer.from(this.token).toString("base64")}`;
  }

  public async select({ form, params }: ISelectDTO): Promise<any> {
    const path = `webservice/v1/${form}`;

    return await axios(`${this.url}/${path}`, {
      method: "POST",
      data: JSON.stringify(params),
      headers: {
        ixcsoft: "listar",
        "Content-Type": "application/json",
        Authorization: this.auth(),
      },
    });
  }

  public async create({ form, params }: ICreateDTO): Promise<any> {
    const path = `webservice/v1/${form}`;

    return await axios(`${this.url}/${path}`, {
      method: "POST",
      data: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth(),
      },
    });
  }

  public async update({ form, params, id }: IUpdateDTO): Promise<any> {
    const path = `webservice/v1/${form}/${id}`;

    return await axios(`${this.url}/${path}`, {
      method: "PUT",
      data: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: this.auth(),
      },
    });
  }
}

interface IIxcapiDTO {
  url: string | undefined;
  token: string | undefined;
}

interface IParamsSelectDTO {
  qtype: string;
  query: string | number;
  oper: string;
  page: string;
  rp: string;
  sortname: string;
  sortorder: string;
}

interface IParamsGetBilletDTO {
  boletos: string;
  juro: string;
  multa: string;
  atualiza_boleto: string;
  tipo_boleto: string;
}

interface ISelectDTO {
  form: string;
  params: IParamsSelectDTO | IParamsGetBilletDTO;
}

interface ICreateDTO {
  form: string;
  params: {
    nome: string;
    razao: string;
    cnpj_cpf: string;
    data_nascimento: string;
    email_atendimento: string;
    data_cadastro: Date;
    fone_residencial: string;
    fone_comercial?: string;
    fone_celular: string;
    fone_whatsapp?: string;
    email: string;
    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    referencia: string;
    obs: string;
  };
}

interface IUpdateDTO {
  form: string;
  params: {
    id: string;
    ativo: string;
    razao: string;
    cnpj_cpf: string;
    endereco: string;
    cidade: string;
    bairro: string;
    numero: string;
    cep: string;
    tipo_pessoa: string;
    hotsite_email: string;
    telefone_celular: string;
    iss_classificacao_padrao: string;
    contribuinte_icms: string;
    tipo_assinante: string;
    email: string;
    senha: string;
  };
  id: string | number;
}

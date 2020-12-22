import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { CustomerRepository } from "../repositories/customer.repository";
import {
  ICustomerAuthDTO,
  ICustomerAuthReturnDTO,
} from "../dto/ICustomerAuthDTO";
import { AbbreviateNames } from "../utils/AbbreviateNames";

config();

@Injectable()
export class CustomerAuth {
  constructor(
    private CustomerRepository: CustomerRepository,
    private IxcRepository: IxcRepository,
    private AbbreviateNames: AbbreviateNames,
  ) {}

  public async exec({
    username,
    password,
    rememberMe,
  }: ICustomerAuthDTO): Promise<ICustomerAuthReturnDTO> {
    // let notifications;
    let id: string;
    let first_access: boolean;

    const customer = await this.IxcRepository.findCustomerByHotsiteEmail(
      username,
    );

    const code = customer.id;
    const name = customer.razao;
    const document = customer.cnpj_cpf;
    let city = customer.cidade;
    const neigh = customer.bairro;
    const password_ixc = customer.senha;

    if (password != password_ixc)
      throw new HttpException(
        "Email/Password incorrect",
        HttpStatus.BAD_REQUEST,
      );

    const customerExists = await this.CustomerRepository.findByCode(code);

    if (!customerExists[0]) {
      city = await this.IxcRepository.findCityById(city);

      const client = await this.CustomerRepository.create({
        code,
        name,
        document,
        nickname: "nickname",
        city,
        neigh,
      });

      id = client.id;
      first_access = client.first_access;
    } else {
      id = customerExists[0].id;
      first_access = customerExists[0].first_access;
    }

    const secret = process.env.MY_SECRET;

    const token =
      rememberMe[0] === "true"
        ? sign({ id, code, name }, secret, {
            expiresIn: "4380h",
          })
        : sign({ id, code, name }, secret, {
            expiresIn: "1h",
          });

    const name_abbreviate = await this.AbbreviateNames.abbreviate({
      name,
    });

    return {
      token,
      user: {
        id,
        code: `${code}`,
        name,
        name_abbreviate,
        document,
        first_access,
      },
    };
  }
}

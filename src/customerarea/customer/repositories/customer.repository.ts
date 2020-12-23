import { Injectable } from "@nestjs/common";
import { getConnection, getRepository } from "typeorm";

import { ICustomerCreateDTO } from "../dto/ICustomerCreateDTO";
import { ICustomerFindByCityAndNeighDTO } from "../dto/ICustomerFindByCityAndNeighDTO";
import { ICustomerRepositoryDTO } from "../dto/ICustomerRepositoryDTO";
import Customer from "../models/customer.entity";

@Injectable()
export class CustomerRepository implements ICustomerRepositoryDTO {
  public async findById(id_customer: string): Promise<Customer> {
    return await getConnection().query(`
      SELECT *
      FROM customers
      WHERE id = '${id_customer}'
    `);
  }

  public async findByCode(code: number): Promise<Customer> {
    return await getConnection().query(`
      SELECT *
      FROM customers
      WHERE code = '${code}'
    `);
  }

  public async findByCityAndNeigh({
    city,
    neigh,
  }: ICustomerFindByCityAndNeighDTO): Promise<Customer[]> {
    return await getConnection().query(`
      SELECT *
      FROM customers
      WHERE city LIKE '%${city}%' AND neigh LIKE '%${neigh}%'
    `);
  }

  public async create({
    code,
    name,
    document,
    city,
    neigh,
    nickname,
  }: ICustomerCreateDTO): Promise<Customer> {
    const customerRepo = getRepository(Customer);

    const customer = customerRepo.create({
      code,
      name,
      document,
      city,
      neigh,
      nickname,
    });

    await customerRepo.save(customer);

    return customer;
  }

  public async updateFirstAccess(code: number): Promise<boolean> {
    await getConnection()
      .createQueryBuilder()
      .update(Customer)
      .set({
        first_access: false,
      })
      .where("code = :code", { code })
      .execute();

    return true;
  }
}

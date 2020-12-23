import Customer from "../models/customer.entity";
import { ICustomerCreateDTO } from "./ICustomerCreateDTO";
import { ICustomerFindByCityAndNeighDTO } from "./ICustomerFindByCityAndNeighDTO";

export interface ICustomerRepositoryDTO {
  findById(id_customer: string): Promise<Customer>;
  findByCode(code: number): Promise<Customer>;
  findByCityAndNeigh(data: ICustomerFindByCityAndNeighDTO): Promise<Customer[]>;
  create(data: ICustomerCreateDTO): Promise<Customer>;
  updateFirstAccess(code: number): Promise<boolean>;
}

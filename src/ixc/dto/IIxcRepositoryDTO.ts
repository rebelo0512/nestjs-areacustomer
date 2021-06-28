import { IIxcChangePasswordHotsiteDTO } from "./IIxcChangePasswordHotsiteDTO";
import { IIxcCreateLeadDTO } from "./IIxcCreateLeadDTO";
import { IIxcFindBilletByContractIdDTO } from "./IIxcFindBilletByContractIdDTO";
import { IIxcFindContractByCustomerIdDTO } from "./IIxcFindContractByCustomerIdDTO";
import { IIxcFindCustomerByHotsiteEmailDTO } from "./IIxcFindCustomerByHotsiteEmailDTO";
import { IIxcFindCustomerByIdDTO } from "./IIxcFindCustomerByIdDTO";

export interface IIxcRepositoryDTO {
  getTermByContract(contract_id: number): Promise<any>;
  findCustomerById(code: number): Promise<IIxcFindCustomerByIdDTO>;
  findCustomerByHotsiteEmail(
    email: string,
  ): Promise<IIxcFindCustomerByHotsiteEmailDTO>;
  findCustomerByDocument(document: string): Promise<IIxcFindCustomerByIdDTO>;
  findContractByCustomerId(
    code: number,
  ): Promise<IIxcFindContractByCustomerIdDTO[]>;
  findCityById(id_city: number | string): Promise<string>;
  findBilletByContractId(
    id_contract: number,
  ): Promise<IIxcFindBilletByContractIdDTO[]>;
  findInvoicesByIdContract(contract_id: number): Promise<any>;
  sendBilletMail(id_billet: number): Promise<boolean>;
  billetArchive(id_billet: number): Promise<string>;
  invoiceArchive(id_sale: number): Promise<any>;
  createLead(data: IIxcCreateLeadDTO): Promise<boolean>;
  changePasswordHotsite(data: IIxcChangePasswordHotsiteDTO): Promise<boolean>;
  reduceContract(id_contract: number): Promise<boolean>;
  trustUnlock(id_contract: number): Promise<any>;
}

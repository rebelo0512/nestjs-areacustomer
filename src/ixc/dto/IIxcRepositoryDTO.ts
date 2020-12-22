import { IIxcChangePasswordHotsiteDTO } from "./IIxcChangePasswordHotsiteDTO";
import { IIxcFindBilletByContractIdDTO } from "./IIxcFindBilletByContractIdDTO";
import { IIxcFindContractByCustomerIdDTO } from "./IIxcFindContractByCustomerIdDTO";
import { IIxcFindCustomerByHotsiteEmailDTO } from "./IIxcFindCustomerByHotsiteEmailDTO";
import { IIxcFindCustomerByIdDTO } from "./IIxcFindCustomerByIdDTO";

export interface IIxcRepositoryDTO {
  findCustomerById(code: number): Promise<IIxcFindCustomerByIdDTO>;
  findCustomerByHotsiteEmail(
    email: string,
  ): Promise<IIxcFindCustomerByHotsiteEmailDTO>;
  findContractByCustomerId(
    code: number,
  ): Promise<IIxcFindContractByCustomerIdDTO[]>;
  findCityById(id_city: number | string): Promise<string>;
  findBilletByContractId(
    id_contract: number,
  ): Promise<IIxcFindBilletByContractIdDTO[]>;
  sendBilletMail(id_billet: number): Promise<boolean>;
  changePasswordHotsite(data: IIxcChangePasswordHotsiteDTO): Promise<boolean>;
}

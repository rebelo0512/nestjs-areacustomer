export interface ICustomerGetPersonalInfoDTO {
  // Info Cliente
  name: string;
  nickname: string | null;
  date_birth: string;
  number_phone: string;
  number_phone2: string;
  number_cel: string;
  number_cel2: string;
  email: string;
  // Info Endereço
  cep: string;
  street: string;
  street_number: string;
  neigh: string;
  complement: string;
  reference: string;
  state: string;
  city: string;
  // Info Contratos
  contracts: string[];
}

export interface ICustomerPreRegistrationDTO {
  type: string;
  name: string;
  email: string;
  cpf: string;
  rg: string;
  dateofbirth: string;
  cellphone: string;
  phone: string;
  optionalcellphone: string;
  optionalphone: string;
  plan: string;
  period: string;
  dueDate: number;
  city: string;
  cep: string;
  neigh: string;
  address: string;
  number: string;
  youknowus: string;
  people: string;
  nameofcondominium?: string;
  reference?: string;
  complement?: string;
  obs?: string;
}

export interface ICustomerPreRegistrationReturnDTO {
  status: string;
  message: string;
}

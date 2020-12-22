export class ICustomerFinancialInfoDTO {
  code: number;
  contract: string;
}

export interface ICustomerFinancialInfoReturnDTO {
  bol_activies: string[];
  bol_pay: string[];
  bol_late: string[];
}

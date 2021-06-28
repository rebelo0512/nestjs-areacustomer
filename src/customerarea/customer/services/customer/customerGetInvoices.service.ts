import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerGetInvoices {
  constructor(private ixcRepository: IxcRepository) {}

  async exec(contract_id: number): Promise<any> {
    return this.ixcRepository.findInvoicesByIdContract(contract_id);
  }
}

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { Injectable } from "@nestjs/common";
import { format } from "date-fns";
import * as base64 from "base64topdf";

@Injectable()
export class CustomerGetTerm {
  constructor(private ixcRepository: IxcRepository) {}

  async exec(contract_id: number): Promise<any> {
    const term = await this.ixcRepository.getTermByContract(contract_id);

    const date = format(new Date(), "yyyy-MM-dd-hhmmss");

    const filename = `areacustomer-${contract_id}-${date}.pdf`;

    const pdf = Buffer.from(term.data).toString("base64");

    base64.base64Decode(pdf, `${process.env.ARCHIVES}/exports/${filename}`);

    return `exports/${filename}`;
  }
}

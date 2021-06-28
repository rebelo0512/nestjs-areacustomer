import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { Injectable } from "@nestjs/common";
import * as base64 from "base64topdf";
import { format } from "date-fns";

@Injectable()
export class CustomerInvoiceArchive {
  constructor(private ixcRepository: IxcRepository) {}

  async exec(id_sale): Promise<any> {
    const billet_return = await this.ixcRepository.invoiceArchive(id_sale);

    const date = format(new Date(), "yyyy-MM-dd-hhmmss");

    const filename = `areacustomer-${id_sale}-${date}.pdf`;

    base64.base64Decode(
      billet_return["data"],
      `${process.env.ARCHIVES}/exports/${filename}`,
    );

    return `exports/${filename}`;
  }
}

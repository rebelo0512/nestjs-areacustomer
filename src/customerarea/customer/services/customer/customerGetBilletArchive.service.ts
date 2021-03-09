import { Injectable } from "@nestjs/common";
import * as base64 from "base64topdf";
import * as fs from "fs";

import { IxcRepository } from "@ixc/repositories/ixc.repository";
import { format } from "date-fns";

@Injectable()
export class CustomerGetBilletArchive {
  fsA = fs.promises;

  constructor(private IxcRepository: IxcRepository) {
    this.fsA = this.fsA;
  }

  public async exec(id_billet: number): Promise<string> {
    const billet_return = await this.IxcRepository.billetArchive(id_billet);

    const date = format(new Date(), "yyyy-MM-dd-hhmmss");

    const filename = `areacustomer-${id_billet}-${date}.pdf`;

    base64.base64Decode(
      billet_return["data"],
      `${process.env.ARCHIVES}/exports/${filename}`,
    );

    return `exports/${filename}`;
  }
}

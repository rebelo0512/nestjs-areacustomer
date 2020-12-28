import { Injectable } from "@nestjs/common";

import { IxcRepository } from "@ixc/repositories/ixc.repository";

@Injectable()
export class CustomerSendBilletEmail {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec(id_billet: number): Promise<boolean> {
    return await this.IxcRepository.sendBilletMail(id_billet);
  }
}

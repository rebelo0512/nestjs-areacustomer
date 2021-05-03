import { Injectable } from "@nestjs/common";

import { IxcRepository } from "@ixc/repositories/ixc.repository";

@Injectable()
export class CustomerTrustUnlock {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec(id_contract: number): Promise<boolean> {
    return await this.IxcRepository.trustUnlock(id_contract);
  }
}

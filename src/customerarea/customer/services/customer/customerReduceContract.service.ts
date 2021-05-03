import { Injectable } from "@nestjs/common";

import { IxcRepository } from "@ixc/repositories/ixc.repository";

@Injectable()
export class CustomerReduceContract {
  constructor(private IxcRepository: IxcRepository) {}

  public async exec(id_contract: number): Promise<string> {
    return await this.IxcRepository.reduceContract(id_contract);
  }
}

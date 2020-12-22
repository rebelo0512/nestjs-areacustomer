import { Module } from "@nestjs/common";

import { IxcRepository } from "./repositories/ixc.repository";

@Module({
  providers: [IxcRepository],
  exports: [IxcRepository],
})
export class IxcModule {}

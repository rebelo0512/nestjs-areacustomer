import { Module } from "@nestjs/common";
import { MailRepository } from "./repositories/mail.repository";

@Module({
  providers: [MailRepository],
  exports: [MailRepository],
})
export class MailModule {}

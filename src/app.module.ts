import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerareaModule } from "./customerarea/customerarea.module";
import { IxcModule } from "./ixc/ixc.module";
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CustomerareaModule, IxcModule, MailModule],
})
export class AppModule {}

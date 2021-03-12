import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { config } from "dotenv";
import * as helmet from "helmet";

import { AppModule } from "./app.module";

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useStaticAssets(process.env.ARCHIVES, {
    prefix: `/${process.env.PUBLIC_URL_FILES}`,
  });
  await app.listen(process.env.PORT);
  console.log(`Servidor executando na porta: ${process.env.PORT}`);
}

bootstrap();

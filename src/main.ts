import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";

import { AppModule } from "./app.module";

config();

async function bootstrap() {
  console.log(`Servidor executando na porta: ${process.env.PORT}`);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
}

bootstrap();

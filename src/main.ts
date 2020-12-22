import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";

config();

async function bootstrap() {
  console.log(`Servidor executando na porta: ${process.env.PORT}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}

bootstrap();

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

@Injectable()
export class CustomerTokenValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();

    const token = await request.headers.tokenaccess;

    if (!token)
      throw new HttpException("No tokens sent", HttpStatus.BAD_REQUEST);

    try {
      verify(token, process.env.MY_SECRET);

      return true;
    } catch (err) {
      throw new HttpException("Token invalid", HttpStatus.BAD_REQUEST);
    }
  }
}

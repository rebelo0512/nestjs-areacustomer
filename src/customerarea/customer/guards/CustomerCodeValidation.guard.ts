import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { decode } from "jsonwebtoken";

@Injectable()
export class CustomerCodeValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.tokenaccess;

    token = decode(token);

    const { code } = request.params;

    if (code == token.code) return true;
    else
      throw new HttpException("Don't have permission", HttpStatus.UNAUTHORIZED);
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { decode } from "jsonwebtoken";

@Injectable()
export class CustomerTokenAndIdValidationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let token = request.headers.tokenaccess;

    token = decode(token);

    const { id_customer } = request.params;

    if (id_customer === token.id) return true;
    else
      throw new HttpException("Don't have permission", HttpStatus.UNAUTHORIZED);
  }
}

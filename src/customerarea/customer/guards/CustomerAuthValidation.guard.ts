import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class CustomerAuthValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const req = context.switchToHttp().getRequest();

    const { username, password } = req.body;

    if (!username || !password)
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }
}

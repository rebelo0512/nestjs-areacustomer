import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class PasswordResetChangePasswordValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const req = context.switchToHttp().getRequest();

    const { password } = req.body;

    if (!password)
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }
}

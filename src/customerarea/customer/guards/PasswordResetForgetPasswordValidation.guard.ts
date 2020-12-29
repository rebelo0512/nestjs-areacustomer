import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class PasswordResetForgetPasswordValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const req = context.switchToHttp().getRequest();

    const { document } = req.body;

    if (!document)
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }
}

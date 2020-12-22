import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class NotificationCreateValidationGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const req = context.switchToHttp().getRequest();

    const { type, title, description } = req.body;

    if (!type || !title || !description)
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }
}

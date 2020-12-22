import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Injectable()
export class NotificationReadUpdateReadGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const req = context.switchToHttp().getRequest();

    const { id_customer, id_notification } = req.body;

    if (!id_customer || !id_notification)
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }
}

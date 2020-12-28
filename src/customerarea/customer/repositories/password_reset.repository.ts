import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { getConnection, getRepository } from "typeorm";

import { IPasswordResetRepositoryDTO } from "../dto/IPasswordResetRepositoryDTO";
import { PasswordReset } from "../models/password_reset.entity";

@Injectable()
export class PasswordResetRepository implements IPasswordResetRepositoryDTO {
  public async findByCustomerId(id_customer: string): Promise<PasswordReset[]> {
    return await getConnection().query(`
      SELECT *
      FROM password_reset
      WHERE customer_id = '${id_customer}'
    `);
  }

  public async create(id_customer: string): Promise<PasswordReset> {
    const pswd_reset = getRepository(PasswordReset);

    const paswd = pswd_reset.create({ customer_id: id_customer });

    await pswd_reset.save(paswd);

    return paswd;
  }

  public async del(id_customer: string): Promise<boolean> {
    if (id_customer) {
      await getRepository(PasswordReset).delete({ customer_id: id_customer });

      return true;
    } else
      throw new HttpException(
        "Missing required fields",
        HttpStatus.BAD_GATEWAY,
      );
  }
}

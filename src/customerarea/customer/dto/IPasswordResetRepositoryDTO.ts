import { PasswordReset } from "../models/password_reset.entity";

export interface IPasswordResetRepositoryDTO {
  findByCustomerId(id_customer: string): Promise<PasswordReset[]>;
  create(id_customer: string): Promise<PasswordReset>;
  del(id_customer: string): Promise<boolean>;
}

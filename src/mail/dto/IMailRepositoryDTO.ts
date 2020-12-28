import { IMailSendPasswordResetDTO } from "./IMailSendPasswordResetDTO";

export interface IMailRepositoryDTO {
  sendPasswordReset(data: IMailSendPasswordResetDTO): Promise<boolean>;
}

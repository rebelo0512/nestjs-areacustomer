export interface IMailSendPasswordResetDTO {
  from: string;
  to: string;
  subject: string;
  id_pass_reset: string;
}

export interface IPasswordResetChangePasswordDTO {
  document: string;
  password: string;
  id_password_forget: string;
}

export interface IPasswordResetChangePasswordReturnDTO {
  status: string;
  message: string;
}

export interface IPasswordResetForgetPasswordDTO {
  document: string;
}

export interface IPasswordResetForgetPasswordReturnDTO {
  status: string;
  message: string;
  email: string;
}

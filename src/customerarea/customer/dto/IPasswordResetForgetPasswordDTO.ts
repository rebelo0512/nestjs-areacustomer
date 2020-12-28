export interface IPasswordResetForgetPasswordDTO {
  code: number;
  document: string;
}

export interface IPasswordResetForgetPasswordReturnDTO {
  status: string;
  message: string;
}

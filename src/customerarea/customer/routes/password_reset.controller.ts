import { Body, Controller, Param, Post, Put, UseGuards } from "@nestjs/common";
import { IPasswordResetChangePasswordReturnDTO } from "../dto/IPasswordResetChangePasswordDTO";
import { IPasswordResetForgetPasswordReturnDTO } from "../dto/IPasswordResetForgetPasswordDTO";
import { PasswordResetChangePasswordValidationGuard } from "../guards/PasswordResetChangePasswordValidation.guard";
import { PasswordResetChangePassword } from "../services/password_reset/passwordResetChangePassword.service";
import { PasswordResetForgetPassword } from "../services/password_reset/passwordResetForgetPassword.service";

@Controller("password_reset")
export class PasswordResetController {
  constructor(
    private PasswordResetForgetPassword: PasswordResetForgetPassword,
    private PasswordResetChangePassword: PasswordResetChangePassword,
  ) {}

  @Post("") // Path: /password_reset
  public async forgetPassword(
    @Body("code") code: number,
    @Body("document") document: string,
  ): Promise<IPasswordResetForgetPasswordReturnDTO> {
    return await this.PasswordResetForgetPassword.exec({ code, document });
  }

  @Put(":document/:id_password_forget") // Path: /password_reset/:document/:id_password_forget
  @UseGuards(PasswordResetChangePasswordValidationGuard)
  public async changePassword(
    @Param("document") document: string,
    @Param("id_password_forget") id_password_forget: string,
    @Body("password") password: string,
  ): Promise<IPasswordResetChangePasswordReturnDTO> {
    return await this.PasswordResetChangePassword.exec({
      document,
      password,
      id_password_forget,
    });
  }
}

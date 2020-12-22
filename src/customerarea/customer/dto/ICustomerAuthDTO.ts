export interface ICustomerAuthDTO {
  username: string;
  password: string;
  rememberMe?: string[];
}

export interface ICustomerAuthReturnDTO {
  token: string;
  user: {
    id: string | number;
    code: string;
    name: string;
    name_abbreviate: string;
    document: string;
    first_access: boolean;
  };
}

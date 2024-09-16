import { Expose } from "class-transformer";

export class CreateAccountResponse {
  @Expose()
  roleId!: string;

  @Expose()
  email!: string;
}

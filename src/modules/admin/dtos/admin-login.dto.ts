import { EmailField, StringField } from '../../../decorators';

export class AdminLoginDto {
  @EmailField()
  readonly email!: string;

  @StringField()
  readonly password!: string;
}

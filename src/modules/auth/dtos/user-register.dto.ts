import {
  EmailField,
  PasswordField,
  StringField,
} from '../../../decorators';

export class UserRegisterDto {
  @StringField()
  readonly username!: string;

  @StringField()
  readonly firstName!: string;

  @StringField()
  readonly lastName!: string;

  @EmailField()
  readonly email!: string;

  @PasswordField({ minLength: 6 })
  readonly password!: string;

  @StringField()
  phone?: string;
}

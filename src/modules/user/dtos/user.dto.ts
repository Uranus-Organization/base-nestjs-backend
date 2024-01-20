import { AbstractDto } from '../../../common/dto/abstract.dto';
import { EmailFieldOptional, StringFieldOptional } from '../../../decorators';
import { type UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @EmailFieldOptional({ nullable: false })
  email?: string;

  @StringFieldOptional({ nullable: false })
  fullName?: string;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.fullName = user.fullName;
  }
}

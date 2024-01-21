import { AbstractCiDto } from '../../../common/dto/abstract-ci.dto';
import { EmailFieldOptional, StringFieldOptional } from '../../../decorators';
import { type UserEntity } from '../user.entity';

export class UserDto extends AbstractCiDto {
  @EmailFieldOptional({ nullable: false })
  email?: string;

  @StringFieldOptional({ nullable: false })
  name?: string;

  constructor(user: UserEntity) {
    super(user);
    this.email = user.email;
    this.name = user.name;
  }
}

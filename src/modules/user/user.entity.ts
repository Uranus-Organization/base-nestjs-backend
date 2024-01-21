import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { AbstractCiEntity } from '../../common/abstract-ci.entity';
import { UseDto } from '../../decorators';
import { UserDto } from './dtos/user.dto';

@Entity({ name: 'user' })
@UseDto(UserDto)
export class UserEntity extends AbstractCiEntity<UserDto> {
  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Exclude()
  @Column({ nullable: false, type: 'varchar' })
  password!: string;

  @Column({ nullable: false, type: 'varchar' })
  name!: string;
}

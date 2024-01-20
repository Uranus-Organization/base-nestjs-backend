import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { UseDto } from '../../decorators';
import { UserDto } from './dtos/user.dto';

@Entity({ name: 'users' })
@UseDto(UserDto)
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ unique: true, nullable: false, type: 'varchar' })
  email!: string;

  @Exclude()
  @Column({ nullable: false, type: 'varchar' })
  password!: string;

  @Column({ nullable: false, type: 'varchar' })
  fullName!: string;
}

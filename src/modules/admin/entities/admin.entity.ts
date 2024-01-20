import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { UseDto } from '../../../decorators';
import { AdminDto } from '../dtos/admin.dto';

@Entity({ name: 'admins' })
@UseDto(AdminDto)
export class AdminEntity extends AbstractEntity<AdminDto> {
  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ nullable: false, type: 'varchar' })
  email!: string;

  @Column({ nullable: false, type: 'varchar' })
  password!: string;

  @Column({ nullable: false, type: 'varchar' })
  role!: string;
}

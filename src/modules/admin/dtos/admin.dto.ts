import { AbstractDto } from '../../../common/dto/abstract.dto';
import { StringField } from '../../../decorators';
import { type AdminEntity } from '../entities/admin.entity';

export class AdminDto extends AbstractDto {
  @StringField()
  email!: string;

  @StringField()
  name?: string | null;

  constructor(admin: AdminEntity) {
    super(admin);
    this.email = admin.email;
    this.name = admin.name;
  }
}

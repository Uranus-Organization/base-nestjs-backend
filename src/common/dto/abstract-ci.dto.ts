import { DateField, StringField } from '../../decorators';
import { type AbstractCiEntity } from '../abstract-ci.entity';

export class AbstractCiDto {
  @StringField()
  ci!: string;

  @DateField()
  createdAt!: Date;

  @DateField()
  updatedAt!: Date;

  constructor(entity: AbstractCiEntity, options?: { excludeFields?: boolean }) {
    if (!options?.excludeFields) {
      this.ci = entity.ci;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
    }
  }
}

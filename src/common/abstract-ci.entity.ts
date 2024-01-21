import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { type AbstractCiDto } from './dto/abstract-ci.dto';

/**
 * Abstract Entity
 * @author Narek Hakobyan <narek.hakobyan.07@gmail.com>
 *
 * @description This class is an abstract class for all entities.
 * It's experimental and recommended using it only in microservice architecture,
 * otherwise just delete and use your own entity.
 */
export abstract class AbstractCiEntity<
  DTO extends AbstractCiDto = AbstractCiDto,
  O = never,
> {
  @PrimaryColumn()
  ci!: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updatedAt',
  })
  updatedAt!: Date;

  toDto(options?: O): DTO {
    // const dtoClass = this.dtoClass;
    const dtoClass = Object.getPrototypeOf(this).dtoClass;

    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }

    return new dtoClass(this, options);
  }
}

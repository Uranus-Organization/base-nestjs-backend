import {
  type EntitySubscriberInterface,
  EventSubscriber,
  type InsertEvent,
  type UpdateEvent,
} from 'typeorm';

import { generateHash } from '../common/utils';
import { AdminEntity } from '../modules/admin/entities/admin.entity';

@EventSubscriber()
export class AdminSubscriber implements EntitySubscriberInterface<AdminEntity> {
  listenTo(): typeof AdminEntity {
    return AdminEntity;
  }

  beforeInsert(event: InsertEvent<AdminEntity>): void {
    if (event.entity.password) {
      event.entity.password = generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<AdminEntity>): void {
    const entity = event.entity as AdminEntity;

    if (entity.password !== event.databaseEntity.password) {
      entity.password = generateHash(entity.password);
    }
  }
}

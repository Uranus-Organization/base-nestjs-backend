/* eslint-disable import/no-default-export */
// eslint-disable-next-line canonical/filename-match-exported
import { type Connection } from 'typeorm';
import { type Factory, type Seeder } from 'typeorm-seeding';

import { RoleType } from '../../constants';
import { AdminEntity } from '../../modules/admin/entities/admin.entity';

export default class AdminsSeed implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection.query('TRUNCATE "admins" RESTART IDENTITY;');
    console.info('TRUNCATE admins ');
    await connection
      .createQueryBuilder()
      .insert()
      .into(AdminEntity)
      .values([
        {
          name: 'Administrator',
          email: 'admin@gmail.com',
          password: '1234',
          role: RoleType.ADMIN,
        },
      ])
      .execute();
  }
}

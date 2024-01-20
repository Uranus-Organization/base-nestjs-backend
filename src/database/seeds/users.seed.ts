/* eslint-disable import/no-default-export */
// eslint-disable-next-line canonical/filename-match-exported
import { type Connection } from 'typeorm';
import { type Factory, type Seeder } from 'typeorm-seeding';

import { UserEntity } from '../../modules/user/user.entity';

export default class UsersSeed implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    await connection.query('TRUNCATE "users" RESTART IDENTITY;');
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          fullName: 'Nguyen Van A',
          email: 'a@gmail.com',
          password: '1234',
        },
      ])
      .execute();
  }
}

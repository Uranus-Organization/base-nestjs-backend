import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { type FindOptionsWhere, Repository } from 'typeorm';

import { AdminEntity } from '../entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>
  ) {}

  /**
   * Find single user
   */
  findOne(
    findData: FindOptionsWhere<AdminEntity>,
  ): Promise<AdminEntity | null> {
    return this.adminRepository.findOneBy(findData);
  }
}

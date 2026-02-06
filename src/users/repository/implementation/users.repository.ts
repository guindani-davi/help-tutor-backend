import { Injectable } from '@nestjs/common';
import { IDatabaseService } from '../../../database/service/i.database.service';
import { Database } from '../../../database/types';
import { CreateUserRepositoryDTO } from '../../dtos/create-user.dto';
import {
  RequestGetUserByEmailDTO,
  RequestGetUserByIdDTO,
} from '../../dtos/get-user.dto';
import { IUsersRepository } from '../i.users.repository';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private readonly databaseService: IDatabaseService;

  public constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService;
  }

  async createUser(
    dto: CreateUserRepositoryDTO,
  ): Promise<Database['public']['Tables']['users']['Row'] | null> {
    const createdUser = await this.databaseService
      .from('users')
      .insert({
        email: dto.email,
        hashed_password: dto.hashedPassword,
        name: dto.name,
        surname: dto.surname,
      })
      .select()
      .single();

    if (createdUser.error) {
      return null;
    }

    return createdUser.data;
  }

  async getUserById(
    dto: RequestGetUserByIdDTO,
  ): Promise<Database['public']['Tables']['users']['Row'] | null> {
    const returnedUser = await this.databaseService
      .from('users')
      .select('*')
      .eq('id', dto.id)
      .single();

    if (returnedUser.error) {
      return null;
    }

    return returnedUser.data;
  }

  async getUserByEmail(
    dto: RequestGetUserByEmailDTO,
  ): Promise<Database['public']['Tables']['users']['Row'] | null> {
    const returnedUser = await this.databaseService
      .from('users')
      .select('*')
      .eq('email', dto.email)
      .single();

    if (returnedUser.error) {
      return null;
    }

    return returnedUser.data;
  }
}

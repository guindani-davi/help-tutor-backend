import { Database } from '../../database/types';
import { CreateUserRepositoryDTO } from '../dtos/create-user.dto';
import {
  RequestGetUserByEmailDTO,
  RequestGetUserByIdDTO,
} from '../dtos/get-user.dto';

export abstract class IUsersRepository {
  public abstract createUser(
    dto: CreateUserRepositoryDTO,
  ): Promise<Database['public']['Tables']['users']['Row'] | null>;
  public abstract getUserById(
    dto: RequestGetUserByIdDTO,
  ): Promise<Database['public']['Tables']['users']['Row'] | null>;
  public abstract getUserByEmail(
    dto: RequestGetUserByEmailDTO,
  ): Promise<Database['public']['Tables']['users']['Row'] | null>;
}

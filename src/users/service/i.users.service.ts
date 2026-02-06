import {
  RequestCreateUserDTO,
  ResponseCreateUserDTO,
} from '../dtos/create-user.dto';
import {
  RequestGetUserByEmailDTO,
  RequestGetUserByIdDTO,
  ResponseGetUserDTO,
} from '../dtos/get-user.dto';

export abstract class IUsersService {
  public abstract createUser(
    dto: RequestCreateUserDTO,
  ): Promise<ResponseCreateUserDTO | null>;
  public abstract getUserById(
    dto: RequestGetUserByIdDTO,
  ): Promise<ResponseGetUserDTO | null>;
  public abstract getUserByEmail(
    dto: RequestGetUserByEmailDTO,
  ): Promise<ResponseGetUserDTO | null>;
}

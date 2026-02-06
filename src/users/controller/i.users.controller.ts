import type { Response } from 'express';
import {
  RequestCreateUserDTO,
  ResponseCreateUserDTO,
} from '../dtos/create-user.dto';
import {
  RequestGetUserByEmailDTO,
  RequestGetUserByIdDTO,
  ResponseGetUserDTO,
} from '../dtos/get-user.dto';

export abstract class IUsersController {
  public abstract createUser(
    body: RequestCreateUserDTO,
    response: Response<ResponseCreateUserDTO | Record<string, never>>,
  ): Promise<void>;

  public abstract getUserById(
    params: RequestGetUserByIdDTO,
    response: Response<ResponseGetUserDTO | Record<string, never>>,
  ): Promise<void>;

  public abstract getUserByEmail(
    params: RequestGetUserByEmailDTO,
    response: Response<ResponseGetUserDTO | Record<string, never>>,
  ): Promise<void>;
}

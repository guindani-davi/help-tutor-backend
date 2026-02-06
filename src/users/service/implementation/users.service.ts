import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { IHelpersService } from '../../../helpers/service/i.helpers.service';
import {
  CreateUserRepositoryDTO,
  RequestCreateUserDTO,
  ResponseCreateUserDTO,
} from '../../dtos/create-user.dto';
import {
  RequestGetUserByEmailDTO,
  RequestGetUserByIdDTO,
  ResponseGetUserDTO,
} from '../../dtos/get-user.dto';
import { IUsersRepository } from '../../repository/i.users.repository';
import { IUsersService } from '../i.users.service';

@Injectable()
export class UsersService implements IUsersService {
  private readonly SALT_ROUNDS_DEV = 1;
  private readonly SALT_ROUNDS_PROD = 14;
  private readonly usersRepository: IUsersRepository;
  private readonly configService: ConfigService;
  private readonly helperService: IHelpersService;

  public constructor(
    usersRepository: IUsersRepository,
    configService: ConfigService,
    helperService: IHelpersService,
  ) {
    this.usersRepository = usersRepository;
    this.configService = configService;
    this.helperService = helperService;
  }

  async createUser(
    dto: RequestCreateUserDTO,
  ): Promise<ResponseCreateUserDTO | null> {
    const hashedPassword = await this.hashPassword(dto.password);

    const repositoryDto = new CreateUserRepositoryDTO();
    repositoryDto.email = dto.email;
    repositoryDto.hashedPassword = hashedPassword;
    repositoryDto.name = dto.name;
    repositoryDto.surname = dto.surname;

    const createdUser = await this.usersRepository.createUser(repositoryDto);

    if (!createdUser) {
      return null;
    }

    const { createdAtDate, updatedAtDate } =
      this.helperService.parseEntitiesDates(
        createdUser.created_at,
        createdUser.updated_at,
      );

    const responseDto = new ResponseCreateUserDTO();
    responseDto.id = createdUser.id;
    responseDto.email = createdUser.email;
    responseDto.name = createdUser.name;
    responseDto.surname = createdUser.surname;
    responseDto.createdAt = createdAtDate;
    responseDto.updatedAt = updatedAtDate;

    return responseDto;
  }

  async getUserById(
    dto: RequestGetUserByIdDTO,
  ): Promise<ResponseGetUserDTO | null> {
    const returnedUser = await this.usersRepository.getUserById(dto);

    if (!returnedUser) {
      return null;
    }

    const { createdAtDate, updatedAtDate } =
      this.helperService.parseEntitiesDates(
        returnedUser.created_at,
        returnedUser.updated_at,
      );

    const responseDto = new ResponseGetUserDTO();
    responseDto.id = returnedUser.id;
    responseDto.email = returnedUser.email;
    responseDto.name = returnedUser.name;
    responseDto.surname = returnedUser.surname;
    responseDto.createdAt = createdAtDate;
    responseDto.updatedAt = updatedAtDate;

    return responseDto;
  }

  async getUserByEmail(
    dto: RequestGetUserByEmailDTO,
  ): Promise<ResponseGetUserDTO | null> {
    const returnedUser = await this.usersRepository.getUserByEmail(dto);

    if (!returnedUser) {
      return null;
    }

    const { createdAtDate, updatedAtDate } =
      this.helperService.parseEntitiesDates(
        returnedUser.created_at,
        returnedUser.updated_at,
      );

    const responseDto = new ResponseGetUserDTO();
    responseDto.id = returnedUser.id;
    responseDto.email = returnedUser.email;
    responseDto.name = returnedUser.name;
    responseDto.surname = returnedUser.surname;
    responseDto.createdAt = createdAtDate;
    responseDto.updatedAt = updatedAtDate;

    return responseDto;
  }

  private async hashPassword(password: string): Promise<string> {
    const pepper = this.configService.get<string>('PASSWORD_PEPPER');
    const pepperedPassword = pepper + password;

    const saltRounds = this.helperService.isProduction()
      ? this.SALT_ROUNDS_PROD
      : this.SALT_ROUNDS_DEV;

    return bcrypt.hash(pepperedPassword, saltRounds);
  }
}

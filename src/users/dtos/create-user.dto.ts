import { IsDate, IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RequestCreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public surname: string;
}

export class ResponseCreateUserDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public surname: string;

  @IsDate()
  @IsNotEmpty()
  public createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  public updatedAt: Date | null;
}

export class CreateUserRepositoryDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public hashedPassword: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public surname: string;
}

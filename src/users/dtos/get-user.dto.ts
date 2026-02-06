import { IsDate, IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RequestGetUserByIdDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}

export class RequestGetUserByEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}

export class ResponseGetUserDTO {
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
  public updatedAt: Date | null;
}

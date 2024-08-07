import {UserValidationMessage} from './user-validation-message.js';
import {IsEmail, IsEnum, IsOptional, IsString, Length, Matches, MaxLength, MinLength} from 'class-validator';
import {UserType} from '../../../types/user-type.enum.js';
import {AVATAR_EXTENSION_REGEX, Password, UserName} from '../user.constant.js';

export class CreateUserDto {
  @IsString({message: UserValidationMessage.name.invalidFormat})
  @MinLength(UserName.Min, {message: UserValidationMessage.name.minLength})
  @MaxLength(UserName.Max, {message: UserValidationMessage.name.maxLength})
  public name: string;

  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email: string;

  @IsOptional()
  @IsString({message: UserValidationMessage.avatar.invalidFormat})
  @Matches(AVATAR_EXTENSION_REGEX, {message: UserValidationMessage.avatar.invalid})
  public avatar?: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  @Length(Password.Min, Password.Max, {message: UserValidationMessage.password.lengthField})
  public password: string;

  @IsEnum(UserType, {each: true, message: UserValidationMessage.userType.invalid})
  public userType: `${UserType}`;
}

import {inject, injectable} from 'inversify';

import {DocumentType, types} from '@typegoose/typegoose';

import {CreateUserDto} from './dto/create-user.dto.js';
import {UserService} from './user-service.interface.js';
import {UserEntity} from './user.entity.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {createMessage} from '../../helpers/index.js';
import {InfoMessage} from './user.constant.js';
import {UpdateUserDto} from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(createMessage(InfoMessage.CREATE_USER_MESSAGE, [result.email]));

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel
      .findOne({email})
      .exec();
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel
      .findById(userId)
      .exec();
  }

  public async uploadAvatar(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel
      .findByIdAndUpdate(userId, dto, {new: true})
      .exec();
  }

  public async exists(value: string): Promise<boolean> {
    return (await this.userModel
      .exists({_id: value})) !== null;
  }
}

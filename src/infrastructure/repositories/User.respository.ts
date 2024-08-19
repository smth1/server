import { UserEntity } from '../entities';
import { UserModel } from '../models';
import { CheckRequiredFields } from '../../utils';
import { FilterQuery, Types } from 'mongoose';


export class UserRepository {

  static async create(entity: UserEntity) {
    CheckRequiredFields(['_phoneNumber', '_firstName', '_email'], entity);
    const toCreate = entity.convertToSchema();
    const created = await UserModel.create(toCreate);
    return new UserEntity().convertToEntity(created);
  }

  static async update(entity: UserEntity) {
    CheckRequiredFields(['_id'], entity);
    const updated = await UserModel.findOneAndUpdate(
      { _id: entity.getId() },
      { $set: entity.convertToSchema() },
      { new: true });
    return new UserEntity().convertToEntity(updated);
  }

  static async list(filter?: FilterQuery<any>) {
    const users = await UserModel.find(filter);
    return users?.map(user => new UserEntity().convertToEntity(user));
  }

  static async getByEmailAndUsername(email: string, userName: string): Promise<UserEntity> {
    const found = await UserModel.findOne({ email, userName });
    return new UserEntity().convertToEntity(found);
  }

  static async getByEmail(email: string): Promise<UserEntity> {
    const found = await UserModel.findOne({ email });
    return new UserEntity().convertToEntity(found);
  }

  static async getById(_id: Types.ObjectId) {
    const found = await UserModel.findOne({ _id });
    return new UserEntity().convertToEntity(found);
  }
}
import { Types } from 'mongoose';
import { UserSchema } from '../schemas';
import { UserStatusEnum } from '../enums';

export class UserEntity {
  protected _id?: Types.ObjectId;
  protected _username?: string;
  protected _firstName: string;
  protected _lastName?: string;
  protected _phoneNumber?: string;
  protected _email?: string;
  protected _accessToken?: string;
  protected _lastActivity: Date;
  protected _isOnline?: boolean;
  protected _groups?: Array<Types.ObjectId>;
  protected _chats?: Array<Types.ObjectId>;
  protected _status: UserStatusEnum;

  buildId(_id: Types.ObjectId): UserEntity {
    this._id = _id;
    return this;
  }

  buildUsername(_username: string): UserEntity {
    this._username = _username;
    return this;
  }

  buildFirstName(_firstName: string): UserEntity {
    this._firstName = _firstName;
    return this;
  }

  buildLastName(_lastName: string): UserEntity {
    this._lastName = _lastName;
    return this;
  }

  buildPhoneNumber(_phoneNumber: string): UserEntity {
    this._phoneNumber = _phoneNumber;
    return this;
  }

  buildEmail(_email: string): UserEntity {
    this._email = _email;
    return this;
  }

  buildAccessToken(_accessToken: string): UserEntity {
    this._accessToken = _accessToken;
    return this;
  }

  buildIsOnline(_isOnline: boolean): UserEntity {
    this._isOnline = _isOnline;
    return this;
  }

  buildGroups(_groups: Array<Types.ObjectId>): UserEntity {
    this._groups = _groups;
    return this;
  }

  buildStatus(_status: UserStatusEnum): UserEntity {
    this._status = _status;
    return this;
  }

  buildLastActivity(_lastActivity: Date): UserEntity {
    this._lastActivity = _lastActivity;
    return this;
  }

  buildChats(_chats: Array<Types.ObjectId>): UserEntity {
    this._chats = _chats;
    return this;
  }

  getId(): Types.ObjectId {
    return this._id;
  }

  getUsername(): string {
    return this._username;
  }

  getFirstName(): string {
    return this._firstName;
  }

  getLastName(): string {
    return this._lastName;
  }

  getPhoneNumber(): string {
    return this._phoneNumber;
  }

  getEmail(): string {
    return this._email;
  }

  getAccessToken(): string {
    return this._accessToken;
  }

  getIsOnline(): boolean {
    return this._isOnline;
  }

  getGroups(): Array<Types.ObjectId> {
    return this._groups;
  }

  getStatus(): UserStatusEnum {
    return this._status;
  }

  getLastActivity(): Date {
    return this._lastActivity;
  }

  getChats(): Array<Types.ObjectId> {
    return this._chats;
  }

  convertToEntity(user: UserSchema): UserEntity {
    return user ? this.buildId(user._id)
      .buildUsername(user.userName)
      .buildFirstName(user.firstName)
      .buildLastName(user.lastName)
      .buildPhoneNumber(user.phoneNumber)
      .buildEmail(user.email)
      .buildAccessToken(user.accessToken)
      .buildIsOnline(user.isOnline)
      .buildGroups(user.groups)
      .buildStatus(user.status)
      .buildChats(user.chats)
      .buildLastActivity(user.lastActivity) : null;
  }

  convertToSchema(): UserSchema {
    return this ? {
      _id: this.getId(),
      userName: this.getUsername(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      phoneNumber: this.getPhoneNumber(),
      email: this.getEmail(),
      accessToken: this.getAccessToken(),
      isOnline: this.getIsOnline(),
      groups: this.getGroups(),
      chats: this.getChats(),
      status: this.getStatus(),
      lastActivity: this.getLastActivity(),
    } : null;
  }
}

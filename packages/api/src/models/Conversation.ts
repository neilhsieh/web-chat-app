import { AllowNull, Column, DataType, Model, Table, HasMany, BelongsToMany } from 'sequelize-typescript';

import { User } from './User';
import { Message } from './Message';
import { UserConversation } from './UserConversation';

@Table({ paranoid: true })
export class Conversation extends Model<Conversation> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  // One conversation to many messages relationship (1:n)
  @HasMany(() => Message)
  messages: Message[];

  // Conversation can have multiple users, vice versa (n:n)
  @BelongsToMany(() => User, () => UserConversation)
  users: User[];
}

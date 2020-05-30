import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './User';
import { Conversation } from './Conversation';

@Table
export class UserConversation extends Model<UserConversation> {

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;
}

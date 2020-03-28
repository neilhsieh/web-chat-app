import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Conversation } from './Conversation';

@Table({ paranoid: true })
export class UserConversation extends Model<UserConversation> {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Conversation)
  @Column
  conversationId: number;
}

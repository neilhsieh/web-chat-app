import { AllowNull, Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Conversation } from './Conversation';

@Table({ paranoid: true })
export class Message extends Model<Message> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  content: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;
}

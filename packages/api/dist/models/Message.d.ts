import { Model } from 'sequelize-typescript';
import { User } from './User';
export declare class Message extends Model<Message> {
    id: string;
    content: string;
    userId: string;
    user: User;
    conversationId: string;
}

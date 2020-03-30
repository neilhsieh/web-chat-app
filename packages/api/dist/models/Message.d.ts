import { Model } from 'sequelize-typescript';
import { User } from './User';
export declare class Message extends Model<Message> {
    id: string;
    content: string;
    userId: number;
    user: User;
    conversationId: string;
}

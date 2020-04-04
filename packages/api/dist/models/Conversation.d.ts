import { Model } from 'sequelize-typescript';
import { User } from './User';
import { Message } from './Message';
export declare class Conversation extends Model<Conversation> {
    id: string;
    name: string;
    messages: Message[];
    users: User[];
}

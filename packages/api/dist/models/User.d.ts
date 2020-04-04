import { Model } from 'sequelize-typescript';
import { Conversation } from './Conversation';
export declare class User extends Model<User> {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    conversations: Conversation[];
}

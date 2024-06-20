import {model, Promise, Schema} from 'mongoose';

import {IUser} from '../types/interfaces/db/IUser';
import {IModel} from '../types/interfaces/db/IModel';

export const UserStorage = new Schema<IUser>({
    userId: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now},
    status: {type: String, required: true}
});

export class UserStorageModel implements IModel {
    private userModel = model<IUser>('Users', UserStorage);

    exists<T>(data: Partial<T>): Promise<boolean> {
        return Promise.resolve(false);
    }

    async findOne<T>(data: Partial<T>): Promise<Partial<T> | null> {
        const user = await this.userModel.findOne(data).exec();
        return user ? user.toObject() : null;
    }

    remove<T>(data: Partial<T>): Promise<boolean> {
        return Promise.resolve(false);
    }

    async save<T>(data: Partial<T> | T): Promise<Partial<T>> {
        const user = new this.userModel(data);
        const savedResult = await user.save();
        return savedResult.toObject();
    }
}

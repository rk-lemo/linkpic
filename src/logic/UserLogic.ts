import jwt from 'jsonwebtoken';

import {EUserStatus, IUser} from '../types/interfaces/db/IUser';
import {PasswordHelper} from './PasswordHelper';
import {IdHelper} from '../util/IdHelper';
import {UserStorageModel} from '../models/User';
import {ConfigInstance} from '../config/config';

export class UserLogic {

    validateEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    async isUserExist(email: string): Promise<boolean> {
        let result = false;
        const UserStorage = new UserStorageModel();
        const user = await UserStorage.findOne({email});
        if (user) {
            result = true;
        }
        return result
    }

    async createUser(email: string, password: string): Promise<Partial<IUser>> {
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email');
        }
        if (!password) {
            throw new Error('Invalid password');
        }
        const conditions: boolean = await this.isUserExist(email);
        if (conditions) {
            throw new Error('User already exists');
        }
        const UserStorage = new UserStorageModel();
        const userId = new IdHelper().generateSortableId();
        const encPass = new PasswordHelper().hashPassword(password);
        const user: IUser = {
            created: new Date(),
            email: email,
            password: encPass,
            status: EUserStatus.ACTIVE,
            userId: userId
        };
        return UserStorage.save(user);
    }

    async auth(email: string, plainPassword: string): Promise<string> {
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email');
        }
        if (!plainPassword) {
            throw new Error('Invalid password');
        }
        const UserStorage = new UserStorageModel();
        const user = await UserStorage.findOne<IUser>({email});
        if (!user) {
            throw new Error('User not found');
        }
        const passwordHelper = new PasswordHelper();
        const isPassValid = passwordHelper.comparePassword(plainPassword, <string>user.password);
        if (!isPassValid) {
            throw new Error('Invalid email or password');
        }
        return this.generateToken(user.userId);
    }

    async generateToken(userId: string | undefined): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!userId) {
                throw new Error('Invalid user id');
            }
            const secret: string = <string>ConfigInstance.setting?.jwt.secret;
            jwt.sign({userId}, secret, {expiresIn: '1h'}, (err, token) => {
                if (err || !token) {
                    reject('Token generation error');
                }
                resolve(<string>token);
            });
        });
    }
}

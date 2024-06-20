import express from 'express';

import Logger from './../../util/Logger';
import {IGeneralController} from '../../types/GeneralController';
import {UserLogic} from '../../logic/UserLogic';
import {IUser} from '../../types/interfaces/db/IUser';

export default class Register implements IGeneralController {
    async handle(req: express.Request, res: express.Response): Promise<any> {
        try {
            const User = new UserLogic();
            const email: string = req.body.email;
            const password: string = req.body.password;
            const user: Partial<IUser> = await User.createUser(email, password);
            const token = await User.auth(email, password);
            return res.json({token});
        } catch (error) { // @ts-ignore
            Logger.error(error?.message);
            return res.sendStatus(500);
        }
    }
}

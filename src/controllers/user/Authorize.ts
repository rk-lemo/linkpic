import express from 'express';

import Logger from './../../util/Logger';
import {IGeneralController} from '../../types/GeneralController';
import {UserLogic} from '../../logic/UserLogic';
import {IUser} from '../../types/interfaces/db/IUser';

export default class Authorize implements IGeneralController{
    async handle(req: express.Request, res: express.Response): Promise<any> {
        try{
            const User = new UserLogic();
            const email: string = req.body.email;
            if(!email){
                return res.status(400).send('Email is required');
            }
            const password: string = req.body.password;
            if(!password){
                return res.status(400).send('Password is required');
            }

            const token: string = await User.auth(email, password);
            if(!token){
                return res.sendStatus(401).json({message: 'Invalid Credentials'});
            }

            return res.json({token});
        }catch(error){ // @ts-ignore
            Logger.error(error?.message);
            return res.sendStatus(500);
        }
    }
}
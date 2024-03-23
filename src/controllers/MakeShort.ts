import express from 'express';
import {Mongoose} from 'mongoose';

export default class MakeShort {
    constructor(private dbConnection: Mongoose) {
    }
    async handle(req: express.Request, res: express.Response,): Promise<any> {
        return res.send('Here should be a short link');
    }
}

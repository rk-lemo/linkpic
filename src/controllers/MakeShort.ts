import express from 'express';

export default class MakeShort {
    async handle(req: express.Request, res: express.Response,): Promise<any> {
        return res.send('Short link saved');
    }
}

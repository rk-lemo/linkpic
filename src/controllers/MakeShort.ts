import express from 'express';
import {Mongoose} from 'mongoose';
import Link from "../logic/Link";

export default class MakeShort {
    async handle(req: express.Request, res: express.Response,): Promise<any> {
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const linkInstance = new Link(fullUrl);
        const shortId = linkInstance.makeShort(7)
        return res.send(shortId);
    }
}

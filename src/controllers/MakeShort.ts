import express from 'express';
import Link from "../logic/Link";
import {ILink} from "../types/interfaces/db/ILinkStorage";
import {LinkStorageModel} from "../models/Storage";
import Logger from "../util/Logger";
import {ConfigInstance} from "../config/config";
import {IGeneralController} from '../types/GeneralController';

export default class MakeShort implements IGeneralController{
    async handle(req: express.Request, res: express.Response): Promise<any> {
        try {
            const fullUrl = req.body.originalUrl;
            const linkInstance = new Link(fullUrl);
            const shortId = <string>linkInstance.makeShort(7);

            const linkObject: ILink = {
                ip: req.ip,
                short: shortId,
                date: new Date(),
                headers: req.headers,
                userId: "",
                link: {
                    hash: <string>linkInstance.hash,
                    path: <string>linkInstance.path,
                    query: <string>linkInstance.query,
                    domain: linkInstance.domain,
                    protocol: linkInstance.protocol,
                    original: fullUrl,
                }
            };

            await new LinkStorageModel().save(linkObject);

            return res.send(req.protocol + "://" + req.hostname + `:${ConfigInstance.setting?.server.port}/${shortId}`);

        } catch (error) { // @ts-ignore
            Logger.error(error?.message);
            return res.sendStatus(500);
        }
    }
}

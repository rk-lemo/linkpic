import express from 'express';
import Link from "../logic/Link";
import {ILink} from "../types/interfaces/db/ILinkStorage";
import {LinkStorageModel} from "../models/Storage";
import Logger from "../util/Logger";
import {ConfigInstance} from "../config/config";

export default class MakeShort {
    async handle(req: express.Request, res: express.Response): Promise<any> {
        try {
            const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
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
                    path: req.path,
                    query: <string>linkInstance.query,
                    domain: req.hostname,
                    protocol: req.protocol,
                    original: fullUrl,
                }
            };

            await new LinkStorageModel().save(linkObject);

            return res.send(linkInstance.protocol + "://" + linkInstance.domain + `:${ConfigInstance.setting?.server.port}/${shortId}`);

        } catch (error) { // @ts-ignore
            Logger.error(error?.message);
            return res.sendStatus(500);
        }
    }
}
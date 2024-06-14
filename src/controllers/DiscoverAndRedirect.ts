import express from 'express';
import Logger from "../util/Logger";
import { IGeneralController } from '../types/GeneralController';
import { LinkStorageModel } from "../models/LinkStorage";
import { ILink } from "../types/interfaces/db/ILinkStorage";

export default class DiscoverAndRedirect implements IGeneralController {
    private linkStorageModel: LinkStorageModel;

    constructor() {
        this.linkStorageModel = new LinkStorageModel();
    }

    async handle(req: express.Request, res: express.Response) {
        try {
            const shortUrl = req.params.shortId;
            const originalData = await this.linkStorageModel.findOne<ILink>({ short: shortUrl });

            if (originalData?.link?.original) {
                return res.redirect(originalData.link.original);
            } else {
                return res.sendStatus(404);
            }

        } catch (error: any) {
            Logger.error(error.message);
            return res.sendStatus(500);
        }
    }
}





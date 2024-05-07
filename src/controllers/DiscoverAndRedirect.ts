import express from 'express';
import Logger from "../util/Logger";
import { IGeneralController } from '../types/GeneralController';
import { LinkStorageModel } from "../models/LinkStorage";

export default class DiscoverAndRedirect implements IGeneralController {
    private linkStorageModel: LinkStorageModel;

    constructor() {
        this.linkStorageModel = new LinkStorageModel();
    }

    async handle(req: express.Request, res: express.Response) {
        try {
            const shortUrl = req.params.shortUrl;
            const originalUrl = await this.linkStorageModel.findOne({ short: shortUrl });

            if (originalUrl) {
                return res.redirect(originalUrl.toString());
            } else {
                return res.sendStatus(404);
            }

        } catch (error: any) { // Зміна типу 'error' на 'any' або 'unknown'
            if (error instanceof Error) {
                Logger.error(error.message);
            } else {
                Logger.error("An unknown error occurred.");
            }
            return res.sendStatus(500);
        }
    }
}




//TODO: Implement the logic here, use the params from the request object req.params to get the short url
            // then use the short url to find the original url from the database and redirect the user to the original url
            // if the short url is not found in the database, return a 404 status code
            // use LinkStorageModel to interact with the database


import express from 'express';
import Logger from "../util/Logger";
import {IGeneralController} from '../types/GeneralController';
import {LinkStorageModel} from "../models/LinkStorage";

export default class DiscoverAndRedirect implements IGeneralController{
    async handle(req: express.Request, res: express.Response): Promise<any> {
        try {
            const shortUrl = req.params.shortUrl;
            const originalUrl = await LinkStorageModel.original(shortUrl);

            if (originalUrl) {
                return res.redirect(originalUrl);
            } else {
                return res.sendStatus(404);
            }

            //TODO: Implement the logic here, use the params from the request object req.params to get the short url
            // then use the short url to find the original url from the database and redirect the user to the original url
            // if the short url is not found in the database, return a 404 status code
            // use LinkStorageModel to interact with the database

        } catch (error) { // @ts-ignore
            Logger.error(error?.message);
            return res.sendStatus(500);
        }
    }
}

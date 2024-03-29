import {Mongoose} from 'mongoose';
import express from 'express';
import * as awilix from 'awilix';
import pinoHttp from 'pino-http';

import Connection from './db/connection';
import Root from './controllers/Root';
import MakeShort from './controllers/MakeShort';
import {wrap} from './util/RequestWrapper';
import Logger from './util/Logger';
import {ConfigInstance} from './config/config';

export default class App {
    private dbConnection: Mongoose | null = null;
    private app: express.Express | null = null;
    container: awilix.AwilixContainer = awilix.createContainer({
        injectionMode: awilix.InjectionMode.CLASSIC,
        strict: true
    });

    get application(): express.Express | null {
        return this.app;
    }

    constructor(private isNeedInitServer = true) {}

    /**
     * @description Initialize the app and start the server
     * @returns {Promise<void>}
     */
    async initialize(): Promise<void> {
        this.setOnShutDownHook();
        const connection = await this.connectDb();
        this.container.register({
            dbConnection: awilix.asValue(connection),
            RootController: awilix.asClass(Root),
            ShortController: awilix.asClass(MakeShort)
        });
        this.initServer();
    }

    /**
     * @description Initialize the server for the app and start listening on the port
     * @returns {void}
     */
    initServer(): void {
        if (this.isNeedInitServer){
            this.app = express();
            this.app.use(pinoHttp());
            this.app.use(this.initRouter())
            this.app.listen(ConfigInstance.setting?.server.port, () => {
                Logger.log(`Server is running on port ${ConfigInstance.setting?.server.port}`);
            })
        }
    }

    /**
     * @description Initialize the router for the app and return it
     * @returns {express.Router}
     */
    initRouter(): express.Router {
        const router: express.Router = express.Router();
        router.get('/', wrap(this.container.resolve('RootController')));
        router.get('/short/', wrap(this.container.resolve('ShortController')));
        return router;
    }

    async connectDb(): Promise<Mongoose> {
        try {
            this.dbConnection = await new Connection().connect();
            return this.dbConnection;
        } catch (error) {
            throw error;
        }
    }

    /**
     * @description Set on shutdown hook for the app
     * @private
     */
    private setOnShutDownHook(): void {
        process.on('SIGTERM', (err) => this.stop('SIGTERM', err))
        process.on('SIGINT', (err) => this.stop('SIGINT', err))
        process.on('SIGQUIT', (err) => this.stop('SIGINT', err))
    }

    /**
     * @description Stop the server and close the db connection
     * @param {string} signal
     * @param {string | number} error
     * @private
     */
    private stop(signal: string, error: string | number) {
        if (this.dbConnection) {
            this.dbConnection.connection?.close(true);
        }
        Logger.error(signal, error);
    }
}

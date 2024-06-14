import {Mongoose} from 'mongoose';
import express from 'express';
import * as awilix from 'awilix';
import pinoHttp from 'pino-http';
import cors from 'cors';

import Connection from './db/connection';
import Root from './controllers/Root';
import MakeShort from './controllers/MakeShort';
import {wrap} from './util/RequestWrapper';
import Logger from './util/Logger';
import {ConfigInstance} from './config/config';
import DiscoverAndRedirect from './controllers/DiscoverAndRedirect';
import Register from './controllers/user/Register';

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
            RegisterController: awilix.asClass(Register),
            ShortController: awilix.asClass(MakeShort),
            DiscoverAndRedirectController: awilix.asClass(DiscoverAndRedirect)
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
            this.app.use(cors({
                origin: 'http://localhost:3000'
                }
            ))
            this.app.use(pinoHttp());
            this.app.use(express.json());
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
        router.post('/short/', wrap(this.container.resolve('ShortController')));
        router.post('/register/', wrap(this.container.resolve('RegisterController')));
        router.get('/:shortId/', wrap(this.container.resolve('DiscoverAndRedirectController')));
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
        process.exit(1);
    }
}

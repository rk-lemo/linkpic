import App from './app';
import Logger from './util/Logger';

new App().initialize()
    .then(() => {
        Logger.info('App initialized');
    })
    .catch((err) => {
        Logger.error(err);
        process.exit(1);
    });

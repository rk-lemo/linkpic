import {ILogger} from '../types/interfaces/ILogger';
import pino from 'pino';

class Logger implements ILogger {
    private logger: pino.Logger;

    constructor() {
        this.logger = pino();
    }

    error(message: string, ...args: any[]): void {
        this.logger.error(message, ...args);
    }

    warn(message: string, ...args: any[]): void {
        this.logger.warn(message, ...args);
    }

    info(message: string, ...args: any[]): void {
        this.logger.info(message, ...args);
    }

    debug(message: string, ...args: any[]): void {
        this.logger.debug(message, ...args);
    }

    trace(message: string, ...args: any[]): void {
        this.logger.trace(message, ...args);
    }

    log(message: string, ...args: any[]): void {
        this.logger.info(message, ...args);

    }
}

export default new Logger();

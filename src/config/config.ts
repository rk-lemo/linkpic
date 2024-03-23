enum EEnvironment {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    TEST = 'test'
}

type TConfig = {
    db: {
        name: string
        password: string
        appName: string
    },
    server: {
        port: number
    }

}

class Config {
    private instance: TConfig | undefined;

    get setting(): TConfig | undefined {
        if (!this.instance) {
            this.init();
        }
        return this.instance;
    };

    init(): void {
        const environment = process.env.NODE_ENV;
        if (!environment) {
            throw new Error('Environment is not set');
        }
        this.instance = this.getConfig();

    }

    private getConfig() {
        const environment = process.env.NODE_ENV;
        switch (environment) {
            case EEnvironment.PRODUCTION:
                return require('./production.json');
            case EEnvironment.DEVELOPMENT:
                return require('./local.json');
            default:
                return require('./local.json');

        }
    }
}

export const ConfigInstance = new Config();

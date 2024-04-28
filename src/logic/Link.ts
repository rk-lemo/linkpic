import {TDomain, THash, TOriginalUrl, TPath, TProtocol, TQuery} from '../types/link';

export default class Link {
    private _protocol: TProtocol | undefined;
    private _domain: TDomain | undefined;
    private _path: TPath | undefined | null;
    private _query: TQuery | undefined | null;
    private _hash: THash | undefined | null;
    constructor(
        private _originalUrl: TOriginalUrl,
    ) {
        this.parseUrl()
    }

    get original(): TOriginalUrl {
        return this._originalUrl;
    }

    get protocol(): TProtocol | undefined {
        return this._protocol;
    }

    get domain(): TDomain | undefined {
        return this._domain;
    }

    get path(): TPath | undefined | null {
        return this._path;
    }

    get query(): TQuery | undefined | null {
        return this._query;
    }

    get hash(): THash | undefined | null{
        return this._hash;
    }

    private parseUrl(): void {
        if (!this._originalUrl) {
            throw new Error('Original URL is not set');
        }
        const url = new URL(this._originalUrl);

        this._protocol = url.protocol;
        this._domain = url.hostname;
        this._path = url.pathname;
        this._query = url.search || null;
        this._hash = url.hash || null;
    }



    //TODO implement method to generate a short link Id based on base62 @kcfz
    //use this. state to get everything you need to generate the short link
    makeShort(length: number): string | Error {
        if(length === 0) throw new Error('Cannot transform empty link');
        const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = '';
        for (let i = 0; i < length; i++) {
            const rng = Math.floor(Math.random() * charset.length)
            result += charset[rng];
        }
        return result;
    }
}


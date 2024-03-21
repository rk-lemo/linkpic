import {TDomain, THash, TOriginalUrl, TPath, TProtocol, TQuery} from '../types/link';

class Link {
    constructor(
        private _originalUrl: TOriginalUrl,
        private _protocol: TProtocol,
        private _domain: TDomain,
        private _path?: TPath,
        private _query?: TQuery,
        private _hash?: THash
    ) {
    }

    get original(): TOriginalUrl {
        return this._originalUrl;
    }

    get protocol(): TProtocol {
        return this._protocol;
    }

    get domain(): TDomain {
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

    //TODO implement method to generate a short link Id based on base62 @kcfz
    //use this. state to get everything you need to generate the short link
    makeShort(): string {
        return 'shortLink';
    }
}

export interface ILink  {
    ip?: string,
    short?: string,
    date?: Date,
    headers?: Object,
    userId?: string,
    link: {
        hash?: string,
        path?: string,
        query?: string,
        domain?: string,
        protocol?: string,
        original?: string,
    }
}

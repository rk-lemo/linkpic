import {Schema} from 'mongoose';

export const LinkStorage = new Schema({
    ip: { type: String, required: false },
    short: { type: String, required: true },
    date: { type: Date, default: Date.now },
    headers: {type: Object, required: false},
    userId: { type: String, required: false },
    link: {
        hash: { type: String, required: false },
        path: { type: String, required: false },
        query: { type: String, required: false },
        domain: { type: String, required: true },
        protocol: { type: String, required: true },
        original: { type: String, required: true },
    }
})

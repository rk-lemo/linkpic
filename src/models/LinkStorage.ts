import {model, Schema} from 'mongoose';
import {ILink} from '../types/interfaces/db/ILinkStorage';

export const LinkStorage = new Schema<ILink>({
    ip: {type: String, required: false},
    short: {type: String, required: true},
    date: {type: Date, default: Date.now},
    headers: {type: Object, required: false},
    userId: {type: String, required: false},
    link: {
        hash: {type: String, required: false},
        path: {type: String, required: false},
        query: {type: String, required: false},
        domain: {type: String, required: true},
        protocol: {type: String, required: true},
        original: {type: String, required: true},
    }
});

export class LinkStorageModel {
    private linkModel = model<ILink>('Link', LinkStorage);

    /**
     * Save object to the corresponding collection
     * @param data {ILink}
     * @returns {Promise<Partial<ILink>>}
     */
    async save(data: ILink): Promise<Partial<ILink>> {
        try {
            const link = new this.linkModel(data)
            return link.save();
        } catch (error){
            throw error;
        }
    }

    /**
     * Find one object in the collection by the given data
     * and returns it
     * @param data {Partial<ILink>}
     * @returns {Promise<Partial<ILink> | null>}
     */
    async findOne(data: Partial<ILink>): Promise<Partial<ILink> | null> {
        return this.linkModel.findOne(data);
    }
}

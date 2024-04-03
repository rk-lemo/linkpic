import {model, Schema} from 'mongoose';
import {ILink} from '../types/interfaces/db/ILinkStorage';
import {IModel} from '../types/interfaces/db/IModel';

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

export class LinkStorageModel implements IModel {
    private linkModel = model<ILink>('Link', LinkStorage);

    /**
     * Save object to the corresponding collection
     * @param data {ILink}
     * @returns {Promise<Partial<ILink>>}
     */
    async save<ILink>(data: ILink): Promise<Partial<any>> {
        try {
            const link = new this.linkModel(data)
            const savedResult = await link.save();
            return savedResult.toObject();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find one object in the collection by the given data
     * and returns it
     * @param data {Partial<ILink>}
     * @returns {Promise<Partial<ILink> | null>}
     */
    async findOne<ILink>(data: Partial<ILink>): Promise<Partial<ILink> | null> {
        const result = await this.linkModel.findOne(data).exec();
        return result ? result.toObject() : null;
    }

    /**
     * Remove object from the collection by the given data
     * @param data {Partial<ILink>}
     * @returns {Promise<boolean>}
     */
    async remove<ILink>(data: Partial<ILink>): Promise<boolean> {
        const result = await this.linkModel.deleteOne(data).exec();
        return result.deletedCount === 1;
    }

    /**
     * Check if the object exists in the collection
     * @param data {Partial<ILink>}
     * @returns {Promise<boolean>}
     */
    async exists<ILink>(data: Partial<ILink>): Promise<boolean> {
        const result = await this.linkModel.exists(data).exec();
        return !!result;
    }
}

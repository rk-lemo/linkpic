import * as mongoose from 'mongoose';
import Logger from '../util/Logger';
import {ConfigInstance} from '../config/config';

const uri = `mongodb+srv://${ConfigInstance.setting?.db.name}:${ConfigInstance.setting?.db.password}@cluster-1.mmwy3cj.mongodb.net/?retryWrites=true&w=majority&appName=${ConfigInstance.setting?.db.appName}`;

export default class Connection {

    async connect(): Promise<mongoose.Mongoose> {
        try {
            const connection = await mongoose.connect(uri);
            Logger.info('Connected to the database');
            return connection
        } catch (e) {
            Logger.error('Disconnected from the database');
            await mongoose?.connection?.close();
            throw e;
        }
    }
}


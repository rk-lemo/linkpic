import * as mongoose from 'mongoose';
import config from 'config';

const uri = `mongodb+srv://${config.get('db.name')}:${config.get('db.password')}@cluster-1.mmwy3cj.mongodb.net/?retryWrites=true&w=majority&appName=${config.get('db.appName')}`;

export default class Connection {

    async connect(): Promise<mongoose.Mongoose> {
        try {
            const connection = await mongoose.connect(uri);
            console.log('Connected to the database');
            return connection
        } finally {
            await mongoose?.connection?.close();
        }
    }
}


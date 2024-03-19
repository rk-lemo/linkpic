import Connection from './db/connection';
import {TestModel as Test} from './models/Test';

async function main() {
    const connection = await new Connection().connect();
    const TestModel = connection.model('TestModel', Test);
    const data = await TestModel.find({
        name: 'pic dick',
        date: {$lt: new Date()}
    }).exec()

    console.log(data)

}

main()

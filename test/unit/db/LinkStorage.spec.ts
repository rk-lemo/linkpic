import {ILink} from '../../../src/types/interfaces/db/ILinkStorage';
import {LinkStorageModel} from '../../../src/models/LinkStorage';
import Connection from '../../../src/db/connection';

describe('This one should properly test LinkStorage logic', () => {
    beforeAll(() => {
        new Connection().connect();
    })

    describe('LinkStorage constructor test group', () => {
        test('it should save object to the database', async () => {
            const data: ILink = {
                date: new Date(),
                headers: {
                    'Content-type': 'application/json',
                },
                ip: '192.168.0.1',
                link: {
                    domain: 'google.com',
                    original: '/search?q=hello',
                    path: '/search',
                    protocol: 'https'
                },
                short: 'zFgH12',
                userId: 'zz11zz22zz33',
            }
            const LinkStorageInstance = new LinkStorageModel();
            const saveResult = await LinkStorageInstance.save(data);
            expect(saveResult.userId).toEqual(data.userId);
        });

        test('it should find one object in the database', async () => {
            const data: Partial<ILink> = {
                short: 'zFgH12',
            }
            const LinkStorageInstance = new LinkStorageModel();
            const findOneResult = await LinkStorageInstance.findOne(data);
            expect(findOneResult?.userId).toBe('zz11zz22zz33');
            expect(findOneResult?.short).toBe(data.short);
        });
    });
});

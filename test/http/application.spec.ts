import request from 'supertest';
import App from '../../src/app';
import Logger from '../../src/util/Logger';

const app = new App();



describe('GET /', () => {
    before(async () => {
        await app.initialize();
    })

    after(async () => {
        process.exit(0)
    })

    it('should return 200 OK', function (done) {
        // @ts-ignore
        request(app.application)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                Logger.info('res', res);
            });
        done();
    });
})


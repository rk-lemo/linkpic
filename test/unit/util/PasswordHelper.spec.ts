import {PasswordHelper} from '../../../src/logic/PasswordHelper';

describe.only('PasswordHelper test group', () => {
    test.only('should generate salt and hash password', (done) => {
        const PassHelper = new PasswordHelper();
        const pass = PassHelper.hashPassword('password');
        console.log(pass)
        expect(pass).toBeDefined();
        done()
    })
})

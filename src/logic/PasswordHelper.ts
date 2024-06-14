import bcrypt from 'bcrypt';

export class PasswordHelper {
    hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(15);
        return `${salt}__${bcrypt.hashSync(password, salt)}`
    }

    comparePassword(password: string, hash: string): boolean {
        const salt = hash.split('__')[0];
        const pass = hash.split('__')[1];
        return bcrypt.compareSync(password, pass);
    }
}

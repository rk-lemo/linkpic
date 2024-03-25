import Link from '../../../src/logic/Link';

describe('This one should properly test Link logic', () => {
    describe('Link constructor test group', () => {
        test('create a Link instance', (done) => {
            const original = 'https://www.google.com?q=hello#world';
            const LinkInstance = new Link(original);
            expect(LinkInstance).toBeInstanceOf(Link);
            expect(LinkInstance.original).toBe(original);
            expect(LinkInstance.protocol).toBe('https:');
            expect(LinkInstance.domain).toBe('www.google.com');
            expect(LinkInstance.path).toBe('/');
            expect(LinkInstance.query).toBe('?q=hello');
            expect(LinkInstance.hash).toBe('#world');
            done();
        });

        test('create a Link instance without additional data', (done) => {
            const original = 'https://www.google.com/';
            const LinkInstance = new Link(original);
            expect(LinkInstance).toBeInstanceOf(Link);
            expect(LinkInstance.original).toBe(original);
            expect(LinkInstance.protocol).toBe('https:');
            expect(LinkInstance.domain).toBe('www.google.com');
            expect(LinkInstance.path).toBe('/');
            expect(LinkInstance.query).toBe(null);
            expect(LinkInstance.hash).toBe(null);
            done();
        });
    });


    test.only('should create a short link', (done) => {
        const original = 'https://www.google.com?q=hello#world';
        const LinkInstance = new Link(original);
        const shortLink = LinkInstance.makeShort();
        expect(shortLink).toBe('shortLink');
        done();
    });
});

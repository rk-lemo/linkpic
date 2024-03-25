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

describe('It should check short link method', () => {
    test('should create a short link', (done) => {
        const original = 'https://www.google.com?q=hello#world';
        const LinkInstance = new Link(original);
        const shortLink = LinkInstance.makeShort(7);
        expect(shortLink.length).toBe(7);
        expect(shortLink).not.toBe(undefined);
        done();
    });
    test('it should check behaviour when 0 is the argument', (done) => {
        const original = 'https://www.google.com?q=hello#world';
        const LinkInstance = new Link(original);
        // const shortLink = LinkInstance.makeShort(0);
        expect(() => {return LinkInstance.makeShort(0)}).toThrow(Error);
        expect(() => {return LinkInstance.makeShort(0)}).toThrow(Error);
        done();
    })
})

});

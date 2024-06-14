import {IdHelper} from '../../../src/util/IdHelper';

describe('IdHelper test group', () => {
    describe('base36Encode method test group', () => {
        test('should return a string', (done) => {
            const IdHelperInstance = new IdHelper();
            const result = IdHelperInstance.base36Encode(123456);
            expect(typeof result).toBe('string');
            done();
        });
    });

    describe('generateRandomString method test group', () => {
        test('should return a string', (done) => {
            const IdHelperInstance = new IdHelper();
            const result = IdHelperInstance.generateRandomString(6);
            expect(typeof result).toBe('string');
            done();
        });
    });

    describe('generateSortableId method test group', () => {
        test('should return a string', (done) => {
            const IdHelperInstance = new IdHelper();
            const result = IdHelperInstance.generateSortableId();
            expect(typeof result).toBe('string');
            done();
        });
    });

    describe('should generate an array of ids', () => {
        test('should return an array of strings', (done) => {
            const IdHelperInstance = new IdHelper();
            const result = Array.from({length: 10}, () => IdHelperInstance.generateSortableId());
            const sorted = result.sort();
            console.log(result, sorted)
            expect(result).toEqual(sorted);
            done();
        });
    });
});

import { equals, multiplyByScalar, sum } from '../src/index';

describe('sum', () => {
    test('returns a vector with the sum components', () => {
        expect(sum([1, 5, 3])).toEqual([1, 5, 3]);
        expect(sum([2, -1, 5], [1, 1, -1])).toEqual([3, 0, 4]);
        expect(sum([2, -1, 5], [0, 3, 7], [1, 1, -1])).toEqual([3, 3, 11]);
    });

    test('throws an error when no vectors are given', () => {
        expect(() => { sum() }).toThrow();
    });

    test('throws an error when trying to add vectors of different sizes', () => {
        expect(() => { sum([1], [0, 3]) }).toThrow();
        expect(() => { sum([1, 3], [0]) }).toThrow();
    });

    test('has associativity of addition: u + (v + w) = (u + v) + w', () => {
        const u = [3, 1, 13];
        const v = [-12, 8, 9];
        const w = [199, -3, -481];

        expect(sum(u, sum(v, w))).toEqual(sum(sum(u, v), w));
    });

    test('has commutativity of addition: u + v = v + u', () => {
        const u = [138, 923];
        const v = [-883, 3];

        expect(sum(u, v)).toEqual(sum(v, u));
    });

    test('has identity element of addition: v + 0-vector = v', () => {
        const v = [1388, -881, 2];
        const zeroVector = [0, 0, 0];

        expect(sum(v, zeroVector)).toEqual(v);
    });

    test('has inverse elements of addition: v + -v = 0-vector', () => {
        const v = [3, 12, -2];
        const inverseV = [-3, -12, 2];
        const zeroVector = [0, 0, 0];

        expect(sum(v, inverseV)).toEqual(zeroVector);
    });
});

describe('multiplyByScalar', () => {
    test('multiplying by a scalar gives the expected vector', () => {
        expect(multiplyByScalar(3, [-3, 1, 12])).toEqual([-9, 3, 36]);
        expect(multiplyByScalar(-2, [11, -9])).toEqual([-22, 18]);
    });

    test('is additive in the scalar: (c + d)v = cv + dv', () => {
        const v = [3, 2];
        const c = 7;
        const d = 4;
        expect(multiplyByScalar((c + d), v)).toEqual(sum(multiplyByScalar(c, v),multiplyByScalar(d, v)));
    });

    test('is additive in the vector: c(v + w) = cv + cw', () => {
        const v = [12, -3];
        const w = [3, 2];
        const c = 9;

        expect(multiplyByScalar(c, sum(v, w))).toEqual(sum(multiplyByScalar(c, v), multiplyByScalar(c, w)));
    });

    test('has compatibility of product of scalars with scalar multiplication: (cd)v = c(dv)', () => {
        const v = [-10, 2];
        const c = 9;
        const d = 1

        expect(multiplyByScalar(c * d, v)).toEqual(multiplyByScalar(c, multiplyByScalar(d, v)));
    });

    test('multiplying by 1 does not change a vector: 1v = v', () => {
        const v = [710, 92];
        expect(multiplyByScalar(1, v)).toEqual(v);
    });

    test('multiplying by 0 gives a 0 vector: 0v = [0, 0 .. 0]', () => {
        const v = [29, 39, 12];
        expect(multiplyByScalar(0, v)).toEqual([0, 0, 0]);
    });

    test('multiplying by −1 gives the additive inverse: (−1)v = −v', () => {
        const v = [-12, 4];
        expect(multiplyByScalar(-1, v)).toEqual([12, -4]);
    });
});

describe('equals', () => {
    test('returns true when vectors are the same', () => {
        expect(equals([12, 3, 7], [12, 3, 7], [12, 3, 7])).toBe(true);
    });

    test('returns true for a single vector', () => {
        expect(equals([12, 3, 7])).toBe(true);
    });

    test('returns false when vector components are not the same', () => {
        expect(equals([12, 3], [12, 4])).toBe(false);
        expect(equals([12, 3], [12, 3], [12, 4])).toBe(false);
        expect(equals([12, 3, 7], [-12, -3, -7])).toBe(false);
    });

    test('returns false when vectors differ in length', () => {
        expect(equals([1, 3, 7], [1, 3])).toBe(false);
        expect(equals([3, 7], [3, 7, 12])).toBe(false);
    });
});

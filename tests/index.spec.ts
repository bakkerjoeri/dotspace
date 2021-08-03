import { equals, multiplyByScalar, add, subtract, multiplyByComponents, dotProduct, crossProduct, magnitude, invert } from '../src/index';

describe('add', () => {
    test('returns the sum vector', () => {
        expect(add([1, 5, 3])).toEqual([1, 5, 3]);
        expect(add([2, -1, 5], [1, 1, -1])).toEqual([3, 0, 4]);
        expect(add([2, -1, 5], [0, 3, 7], [1, 1, -1])).toEqual([3, 3, 11]);
    });

    test('throws an error when no vectors are given', () => {
        expect(() => { add() }).toThrow();
    });

    test('throws an error when trying to add vectors of different sizes', () => {
        expect(() => { add([1], [0, 3]) }).toThrow();
        expect(() => { add([1, 3], [0]) }).toThrow();
    });

    test('has associativity of addition: u + (v + w) = (u + v) + w', () => {
        const u = [3, 1, 13];
        const v = [-12, 8, 9];
        const w = [199, -3, -481];

        expect(add(u, add(v, w))).toEqual(add(add(u, v), w));
    });

    test('has commutativity of addition: u + v = v + u', () => {
        const u = [138, 923];
        const v = [-883, 3];

        expect(add(u, v)).toEqual(add(v, u));
    });

    test('has identity element of addition: v + 0-vector = v', () => {
        const v = [1388, -881, 2];
        const zeroVector = [0, 0, 0];

        expect(add(v, zeroVector)).toEqual(v);
    });

    test('has inverse elements of addition: v + -v = 0-vector', () => {
        const v = [3, 12, -2];
        const inverseV = [-3, -12, 2];
        const zeroVector = [0, 0, 0];

        expect(add(v, inverseV)).toEqual(zeroVector);
    });
});

describe('subtract', () => {
    test('return a vector that results from subtracting all vectors from each other', () => {
        expect(subtract([3, -15, 12])).toEqual([3, -15, 12]);
        expect(subtract([2, -1, 5], [1, 1, -1])).toEqual([1, -2, 6]);
        expect(subtract([2, -1, 5], [0, 3, 7], [1, 1, -1])).toEqual([1, -5, -1]);
    });

    test('throws an error when no vectors are given', () => {
        expect(() => { subtract() }).toThrow();
    });

    test('throws an error when trying to subtract vectors of different sizes', () => {
        expect(() => { subtract([1], [0, 3]) }).toThrow();
        expect(() => { subtract([1, 3], [0]) }).toThrow();
    });

    test('has no commutativity: u - v != v - u', () => {
        const u = [138, 923];
        const v = [-883, 3];

        expect(subtract(u, v)).not.toEqual(subtract(v, u));
    });

    test('subtraction of itself results in a zero vector: v - v = 0-vector', () => {
        const v = [3, 12, -2];
        const zeroVector = [0, 0, 0];

        expect(subtract(v, v)).toEqual(zeroVector);
    });
});

describe('multiplyByComponents', () => {
    test('returns a vector with multiplied components', () => {
        expect(multiplyByComponents([1, 5, 3])).toEqual([1, 5, 3]);
        expect(multiplyByComponents([2, -1, 5], [1, 1, -1])).toEqual([2, -1, -5]);
        expect(multiplyByComponents([2, -1, 5], [0, 3, 7], [1, 1, -1])).toEqual([0, -3, -35]);
    });

    test('throws an error when no vectors are given', () => {
        expect(() => { multiplyByComponents() }).toThrow();
    });

    test('throws an error when trying to multiply vectors of different sizes', () => {
        expect(() => { multiplyByComponents([1], [0, 3]) }).toThrow();
        expect(() => { multiplyByComponents([1, 3], [0]) }).toThrow();
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
        expect(multiplyByScalar((c + d), v)).toEqual(add(multiplyByScalar(c, v),multiplyByScalar(d, v)));
    });

    test('is additive in the vector: c(v + w) = cv + cw', () => {
        const v = [12, -3];
        const w = [3, 2];
        const c = 9;

        expect(multiplyByScalar(c, add(v, w))).toEqual(add(multiplyByScalar(c, v), multiplyByScalar(c, w)));
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

    test('multiplying by 0 gives a 0 vector: 0v = 0-vector', () => {
        const v = [29, 39, 12];
        expect(multiplyByScalar(0, v)).toEqual([0, 0, 0]);
    });

    test('multiplying by −1 gives the additive inverse: (−1)v = −v', () => {
        const v = [-12, 4];
        expect(multiplyByScalar(-1, v)).toEqual([12, -4]);
    });
});

describe('inverse', () => {
    test('returns an inverted vector', () => {
        expect(invert([0])).toEqual([-0]);
        expect(invert([31])).toEqual([-31]);
        expect(invert([2, -8])).toEqual([-2, 8]);
        expect(invert([-1, 17, 381])).toEqual([1, -17, -381]);
    });

    test('does not crash when given an empty vector', () => {
        expect(() => { invert([]); }).not.toThrow();
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

describe('dotProduct', () => {
    test('gives the expected scalar', () => {
        expect(dotProduct([-1, -2, 3], [4, 0, -8])).toBe(-28);
    });

    test('throws an error when given vectors of differing length', () => {
        expect(() => { dotProduct([2, 4], [-1, 3, 9]) }).toThrow();
        expect(() => { dotProduct([-12, 7, 9, 199], [4, 4]) }).toThrow();
    });

    test('is commutative: u · v = v · u', () => {
        const u = [-23, 9, 17, 3];
        const v = [-1, -13, 9, -1];

        expect(dotProduct(u, v)).toBe(dotProduct(v, u));
    });

    test('is distributive over vector addition: u · (v + w) = u · v + u · w', () => {
        const u = [48, -9, 71, 104];
        const v = [-13, 33, 119, 63];
        const w = [0, 2, -98, 4];

        expect(dotProduct(u, add(v, w))).toBe(dotProduct(u, v) + dotProduct(u, w));
    });
});

describe('crossProduct', () => {
    test('gives the expected perpendicular vector to the given vectors', () => {
        const u = [1, -7, 1];
        const v = [5, 2, 4];
        const w = [-30, 1, 37];

        expect(crossProduct(u, v)).toEqual(w);
    });

    test('throws an error when one of either vector is not 3-dimensional', () => {
        expect(() => { crossProduct([], [1, 3, 0]) }).toThrow();
        expect(() => { crossProduct([0, 3, -2], [1, 3]) }).toThrow();
        expect(() => { crossProduct([3, 5, 12, -8], [-199, 3, 80, 10]) }).toThrow();
    });

    test('applied to the same vector gives its zero vector: v × v = 0-vector', () => {
        const v = [3, -1, 12];
        const zeroVector = [0, 0, 0];

        expect(crossProduct(v, v)).toEqual(zeroVector);
    });

    test('is anticommutative: u × v = -(v × u)', () => {
        const u = [-330, 819, 12];
        const v = [9, -381, 138];

        expect(crossProduct(u, v)).toEqual(multiplyByScalar(-1, crossProduct(v, u)));
    });

    test('is distributive over addition: u × (v + w) = (u × v) + (u × w)', () => {
        const u = [11338, 3, -54];
        const v = [7, 393, -9902];
        const w = [1, 1, 3];

        expect(crossProduct(u, add(v, w))).toEqual(add(crossProduct(u, v), crossProduct(u, w)));
    });
});

describe('magnitude', () => {
    test('gives expected magnitude for vectors of arbitrary dimensions', () => {
        expect(magnitude([1, 3])).toBe(Math.sqrt(Math.pow(1, 2) + Math.pow(3, 2)));
        expect(magnitude([3])).toBe(3);
        expect(magnitude([-23, 199, 0, 99913])).toBe(Math.sqrt(Math.pow(-23, 2) + Math.pow(199, 2) + Math.pow(99913, 2)));
    });

    test('gives 0 for a 0-dimensional vector', () => {
        expect(magnitude([])).toBe(0);
    });
});

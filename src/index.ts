export type Vector = number[];
export type Vector2D = [number, number];
export type Vector3D = [number, number, number];

export function equals(...vectors: Array<Vector>): boolean {
    if (vectors.length === 0) {
        throw new Error('Can\'t check equality for 0 vectors.');
    }

    return vectors.every((currentVector, index) => {
        if (index === 0) {
            return true;
        }

        const previousVector = vectors[index - 1];

        if (currentVector.length !== previousVector.length) {
            return false;
        }

        return currentVector.every((component, index) => {
            return component === previousVector[index];
        });
    }, true);
}

export function add(...vectors: Array<Vector>): Vector {
    if (vectors.length === 0) {
        throw new Error('Can\'t add 0 vectors.');
    }

    return vectors.reduce((totalVector, currentVector) => {
        if (!totalVector) {
            return currentVector;
        }

        if (currentVector.length !== totalVector.length) {
            throw new Error(`Can't add vectors with differing lengths. Expected a length of ${totalVector.length}, but got a length of ${currentVector.length}.`);
        }

        return totalVector.map((component, index) => {
            return component + currentVector[index];
        });
    });
}

export function subtract(...vectors: Array<Vector>): Vector {
    if (vectors.length === 0) {
        throw new Error('Can\'t subtract 0 vectors from each other.');
    }

    return vectors.reduce((totalVector, currentVector) => {
        if (!totalVector) {
            return currentVector;
        }

        if (currentVector.length !== totalVector.length) {
            throw new Error(`Can't subtract vectors with differing lengths. Expected a length of ${totalVector.length}, but got a length of ${currentVector.length}.`);
        }

        return totalVector.map((component, index) => {
            return component - currentVector[index];
        });
    });
}

export function multiplyByComponents(...vectors: Array<Vector>): Vector {
    if (vectors.length === 0) {
        throw new Error('Can\'t multiply 0 vectors.');
    }

    return vectors.reduce((totalVector, currentVector) => {
        if (!totalVector) {
            return currentVector;
        }

        if (currentVector.length !== totalVector.length) {
            throw new Error(`Can't multiply vectors with differing lengths. Expected a length of ${totalVector.length}, but got a length of ${currentVector.length}.`);
        }

        return totalVector.map((component, index) => {
            return component * currentVector[index];
        });
    });
}

export function multiplyByScalar(scalar: number, vector: Vector): Vector {
    return vector.map(component => {
        return component * scalar;
    });
}

export function dotProduct(vectorA: Vector, vectorB: Vector): number {
    if (vectorA.length !== vectorB.length) {
        throw new Error(`Can't get the dot product of vectors with differing lengths. Expected a length of ${vectorA.length}, but got a length of ${vectorB.length}.`);
    }

    return vectorA.reduce((total: number, componentA, index) => {
        const componentB = vectorB[index];

        return total + componentA * componentB;
    }, 0);
}

export function crossProduct(a: Vector, b: Vector): Vector {
    if (a.length !== 3 || b.length !== 3) {
        throw new Error(`Expected a pair of 3-dimensional vectors, but got a vector with ${a.length} dimensions and another with ${b.length}.`);
    }

    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ];
}

export function magnitude(vector: Vector): number {
    return Math.sqrt(vector.reduce((result, currentComponent) => {
        return result + Math.pow(currentComponent, 2);
    }, 0));
}

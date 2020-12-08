type Vector = [...components: Array<number>];

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

export function sum(...vectors: Array<Vector>): Vector {
    if (vectors.length === 0) {
        throw new Error('Can\'t sum 0 vectors.');
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

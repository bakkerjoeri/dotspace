export function equals(...vectors) {
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
export function add(...vectors) {
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
export function subtract(...vectors) {
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
export function multiplyByComponents(...vectors) {
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
export function multiplyByScalar(scalar, vector) {
    return vector.map(component => {
        return component * scalar;
    });
}
export function invert(vector) {
    return multiplyByScalar(-1, vector);
}
export function dotProduct(vectorA, vectorB) {
    if (vectorA.length !== vectorB.length) {
        throw new Error(`Can't get the dot product of vectors with differing lengths. Expected a length of ${vectorA.length}, but got a length of ${vectorB.length}.`);
    }
    return vectorA.reduce((total, componentA, index) => {
        const componentB = vectorB[index];
        return total + componentA * componentB;
    }, 0);
}
export function crossProduct(a, b) {
    if (a.length !== 3 || b.length !== 3) {
        throw new Error(`Expected a pair of 3-dimensional vectors, but got a vector with ${a.length} dimensions and another with ${b.length}.`);
    }
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ];
}
export function magnitude(vector) {
    return Math.sqrt(vector.reduce((result, currentComponent) => {
        return result + Math.pow(currentComponent, 2);
    }, 0));
}
export function resize(vector, toMagnitude) {
    if (toMagnitude < 0) {
        throw new Error('Cannot resize a vector to negative magnitude. A vector\'s magnitude is always positive.');
    }
    const m = magnitude(vector);
    if (m === 0) {
        return multiplyByScalar(0, vector);
    }
    return multiplyByScalar(toMagnitude / m, vector);
}
export function normalize(vector) {
    return resize(vector, 1);
}

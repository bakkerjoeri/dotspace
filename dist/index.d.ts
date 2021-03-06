export declare type Vector = number[];
export declare type Vector2D = [number, number];
export declare type Vector3D = [number, number, number];
export declare function equals(...vectors: Array<Vector>): boolean;
export declare function add(...vectors: Array<Vector>): Vector;
export declare function multiplyByComponents(...vectors: Array<Vector>): Vector;
export declare function multiplyByScalar(scalar: number, vector: Vector): Vector;
export declare function dotProduct(vectorA: Vector, vectorB: Vector): number;
export declare function crossProduct(a: Vector, b: Vector): Vector;
export declare function magnitude(vector: Vector): number;

export class Assert {
    public static check(condition: boolean, message?: string) {
        if (!condition) {
            throw new Error(message);
        }
    }

    public static checkFalse(condition: boolean, message?: string) {
        Assert.check(!condition, message);
    }

    public static isEqual<T>(a: T, b: T, message?: string) {
        Assert.check(a == b, message);
    }

    public static isNotEqual<T>(a: T, b: T, message?: string) {
        Assert.check(a != b, message);
    }

    public static isNotUndefined<T>(a: T, message?: string) {
        Assert.check(a != undefined, message);
    }

    public static isUndefined<T>(a: T, message?: string) {
        Assert.check(a == undefined, message);
    }

    public static isNotNull<T>(a: T, message?: string) {
        Assert.check(a != null, message);
    }

    public static isNull<T>(a: T, message?: string) {
        Assert.check(a == null, message);
    }

    public static isNotNaN(a: number, message?: string) {
        Assert.check(!isNaN(a), message);
    }

    public static isNaN(a: number, message?: string) {
        Assert.check(isNaN(a), message);
    }

    public static isNotInfinity(a: number, message?: string) {
        Assert.check(!isFinite(a), message);
    }

    public static isInfinity(a: number, message?: string) {
        Assert.check(isFinite(a), message);
    }

    public static isNotZero(a: number, message?: string) {
        Assert.check(a != 0, message);
    }

    public static isZero(a: number, message?: string) {
        Assert.check(a == 0, message);
    }

    public static isTypeOf(a: any, type: any, message?: string) {
        Assert.check(a instanceof type, message);
    }

    public static isValid(a: any, message?: string) {
        Assert.isNotNull(a, message);
        Assert.isNotUndefined(a, message);
    }
}
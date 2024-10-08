/* eslint-disable @typescript-eslint/naming-convention */
declare namespace jest {
    interface Matchers<R> {
        toBeDateCloseTo(expected: Date, tolerance: number): R;
    }
}
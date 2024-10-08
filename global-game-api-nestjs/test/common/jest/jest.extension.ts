/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const customMatchers = {
    toBeDateCloseTo(received: Date, expected: Date, tolerance: number) {
        const diff = Math.abs(received.getTime() - expected.getTime());

        if (diff <= tolerance) {
            return {
                message: () => `Dates are within ${tolerance}ms of each other`,
                pass: true
            };
        } else {
            return {
                message: () => `Expected dates to be within ${tolerance}ms, but the difference was ${diff}ms`,
                pass: false
            };
        }
    }
};
// console.log("🧪 Custom matchers registered.");
import { isNullOrUndefinedOrEmpty } from "src/common/assertion/assertion.helper";

describe("isNullOrUndefinedOrEmpty", () => {
    test("WithUndefined_ShouldReturnTrue", () => {
        // Arrange
        const value = undefined;

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(true);
    });

    test("WithNull_ShouldReturnTrue", () => {
        // Arrange
        const value = null;

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(true);
    });

    test("WithEmptyObject_ShouldReturnTrue", () => {
        // Arrange
        const value = {};

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(true);
    });

    test("WithNonEmptyObject_ShouldReturnFalse", () => {
        // Arrange
        const value = { key: "value" };

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(false);
    });

    test("WithString_ShouldReturnFalse", () => {
        // Arrange
        const value = "string";

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(false);
    });

    test("WithEmptyArray_ShouldReturnFalse", () => {
        // Arrange
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value: any[] = [];

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(true);
    });

    test("WithNonEmptyArray_ShouldReturnFalse", () => {
        // Arrange
        const value = [1, 2, 3];

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(false);
    });

    test("WithZero_ShouldReturnFalse", () => {
        // Arrange
        const value = 0;

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(false);
    });

    test("WithBoolean_ShouldReturnFalse", () => {
        // Arrange
        const value = false;

        // Act
        const result = isNullOrUndefinedOrEmpty(value);

        // Assert
        expect(result).toBe(false);
    });
});

import { LogInterpolator } from "src/common/logger/log.interpolator";

describe("LogInterpolator", () => {
    let logInterpolator: LogInterpolator;

    beforeEach(() => {
        logInterpolator = new LogInterpolator();
    });

    describe("interpolateMessage", () => {
        test("interpolateMessage_WithMatchingKeys_ShouldReplacePlaceholders", () => {
            // Arrange
            const template = "Hello, {name}! Your score is {score}.";
            const metadata = { name: "John", score: "100" };

            // Act
            const result = logInterpolator.interpolateMessage(template, metadata);

            // Assert
            expect(result).toBe("Hello, John! Your score is 100.");
        });

        test("interpolateMessage_WithNonMatchingKeys_ShouldLeavePlaceholdersIntact", () => {
            // Arrange
            const template = "Hello, {name}! Your score is {score}.";
            const metadata = { name: "John" };

            // Act
            const result = logInterpolator.interpolateMessage(template, metadata);

            // Assert
            expect(result).toBe("Hello, John! Your score is {score}.");
        });

        test("interpolateMessage_WithNestedMetadata_ShouldConvertAndReplaceCorrectly", () => {
            // Arrange
            const template = "User: {user}, Details: {details}";
            const metadata = { user: "John", details: { age: 25, country: "USA" } };

            // Act
            const result = logInterpolator.interpolateMessage(template, metadata);

            // Assert
            expect(result).toBe("User: John, Details: {\"age\":25,\"country\":\"USA\"}");
        });

        test("interpolateMessage_WithNoPlaceholders_ShouldReturnOriginalTemplate", () => {
            // Arrange
            const template = "This is a static message.";
            const metadata = { someKey: "value" };

            // Act
            const result = logInterpolator.interpolateMessage(template, metadata);

            // Assert
            expect(result).toBe("This is a static message.");
        });
    });

    describe("toMetaDataValuesAsString", () => {
        test("toMetaDataValuesAsString_WithNonStringValues_ShouldConvertToJSONStrings", () => {
            // Arrange
            const metadata = {
                stringKey: "stringValue",
                numberKey: 123,
                objectKey: { nestedKey: "nestedValue" },
                arrayKey: [1, 2, 3]
            };

            // Act
            const result = logInterpolator.toMetaDataValuesAsString(metadata);

            // Assert
            expect(result).toEqual({
                stringKey: "stringValue",
                numberKey: "123",
                objectKey: "{\"nestedKey\":\"nestedValue\"}",
                arrayKey: "[1,2,3]"
            });
        });

        test("toMetaDataValuesAsString_WithAllStringValues_ShouldReturnSameMetadata", () => {
            // Arrange
            const metadata = {
                key1: "value1",
                key2: "value2"
            };

            // Act
            const result = logInterpolator.toMetaDataValuesAsString(metadata);

            // Assert
            expect(result).toEqual(metadata);
        });

        test("toMetaDataValuesAsString_WithEmptyObject_ShouldReturnEmptyObject", () => {
            // Arrange
            const metadata = {};

            // Act
            const result = logInterpolator.toMetaDataValuesAsString(metadata);

            // Assert
            expect(result).toEqual({});
        });
    });
});

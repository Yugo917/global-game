/* eslint-disable @typescript-eslint/no-explicit-any */

import { IMappingOptions, Mapper } from "src/common/mapper/mapper";

describe("Mapper", () => {

    test("map_WithValidSource_ShouldSucceed", () => {
        // Arrange
        class SourceClass {
            public prop1 = "value1";
            public prop2 = 42;
            private _privateProp3 = "privateProp3";
            private _isSourceClass = "_isSourceClass";
        }

        class TargetClass {
            public prop1: string = "";
            public prop2: number = 0;
            private _privateProp3 = "";
            private _isTargetClass: string = "_isTargetClass";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceClass, TargetClass);
        const source = new SourceClass();

        // Act
        const result = mapper.map(source, SourceClass, TargetClass);

        // Assert
        expect(result.prop1).toBe("value1");
        expect(result.prop2).toBe(42);
        expect((result as any)._privateProp3).toBe("privateProp3");
        expect((result as any).hasOwnProperty("_isSourceClass")).toBe(false);
    });

    test("map_WithValidSource_WithEnforcedType_ShouldSucceed", () => {
        // Arrange
        class SourceClass {
            public prop1 = "value1";
            public prop2 = 42;
            private _privateProp3 = "privateProp3";
            private __TSourceClass?: unknown;
        }

        class TargetClass {
            public prop1: string = "";
            public prop2: number = 0;
            private _privateProp3 = "";
            private __TargetClass?: unknown;
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceClass, TargetClass);
        const source = new SourceClass();

        // Act
        const result = mapper.map(source, SourceClass, TargetClass);

        // Assert
        expect(result.prop1).toBe("value1");
        expect(result.prop2).toBe(42);
        expect((result as any)._privateProp3).toBe("privateProp3");
        expect((result as any).hasOwnProperty("__TSourceClass")).toBe(false);
    });

    test("map_WithProfileToIgnorePrivateProperties_ShouldSucceed", () => {
        // Arrange
        class SourceClass {
            public prop1 = "value1";
            public prop2 = 42;
            private _privateProp3 = "privateProp3";
            private _isSourceClass = "_isSourceClass";
        }

        class TargetClass {
            public prop1: string = "";
            public prop2: number = 0;
            private _privateProp3 = "";
            private _isTargetClass: string = "_isTargetClass";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        const options: IMappingOptions = {
            ignorePattern: /^_/ // Ignore private properties that start with an underscore
        };
        mapper.addProfile(SourceClass, TargetClass, options);
        const source = new SourceClass();

        // Act
        const result = mapper.map(source, SourceClass, TargetClass);

        // Assert
        expect(result.prop1).toBe("value1");
        expect(result.prop2).toBe(42);
        expect((result as any)._privateProp3).toBe("");
        expect((result as any).hasOwnProperty("_isSourceClass")).toBe(false);
    });

    test("map_WithStrictModeAndMissingProperties_ShouldThrowError", () => {
        // Arrange
        class SourceWithMissingProp {
            public prop1: string = "prop1";
        }

        class TargetClass {
            public prop1: string = "";
            public prop2: number = 0;
        }

        const mapper = new Mapper({ strict: true, undefinedIsAValue: true });
        mapper.addProfile(SourceWithMissingProp, TargetClass);
        const source = new SourceWithMissingProp();
        source.prop1 = "value1";

        // Act & Assert
        expect(() => {
            mapper.map(source, SourceWithMissingProp, TargetClass);
        }).toThrow("Missing property mapping for prop2");
    });

    test("map_WithStrictModeA_ShouldSucceed", () => {
        // Arrange
        class SourceStrictClass {
            public prop1 = "value1";
            public prop2 = 42;
        }

        class TargetStrictClass {
            public prop1: string = "";
            public prop2: number = 0;
        }

        const source = new SourceStrictClass();
        const mapper = new Mapper({ strict: true, undefinedIsAValue: true });
        mapper.addProfile(SourceStrictClass, TargetStrictClass);

        // Act 
        const result = mapper.map(source, SourceStrictClass, TargetStrictClass);

        // Assert
        expect(result.prop1).toBe("value1");
        expect(result.prop2).toBe(42);
    });

    test("map_WithInvalidSource_ShouldThrowError", () => {
        // Arrange
        class SourceClass {
            public prop1 = "value1";
            public prop2 = 42;
        }

        class TargetClass {
            public prop1: string = "";
            public prop2: number = 0;
        }

        class InvalidSource {
            public prop1 = "invalid";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        const options: IMappingOptions = {};
        mapper.addProfile(SourceClass, TargetClass, options);
        const source = new InvalidSource();

        // Act & Assert
        expect(() => {
            mapper.map(source, SourceClass, TargetClass);
        }).toThrow("Source object must be an instance of SourceClass");
    });

    test("map_WithNullAndUndefinedValues_ShouldSucceed", () => {
        // Arrange
        class SourceWithNullAndUndefined {
            public prop1: string | null = null;
            public prop2: number | undefined = undefined;
        }

        class TargetWithNullAndUndefined {
            public prop1: string | null = "";
            public prop2: number | undefined = 0;
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceWithNullAndUndefined, TargetWithNullAndUndefined);
        const source = new SourceWithNullAndUndefined();

        // Act
        const result = mapper.map(source, SourceWithNullAndUndefined, TargetWithNullAndUndefined);

        // Assert
        expect(result.prop1).toBeNull();
        expect(result.prop2).toBeUndefined();
    });

    test("map_WithDeeplyNestedObject_ShouldMapCorrectly", () => {
        // Arrange
        class NestedSource {
            public outerProp = {
                innerProp: "innerValue"
            };
            public prop1 = "outerValue";
        }

        class NestedTarget {
            public outerProp = { innerProp: "" };
            public prop1: string = "";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(NestedSource, NestedTarget);
        const source = new NestedSource();

        // Act
        const result = mapper.map(source, NestedSource, NestedTarget);

        // Assert
        expect(result.outerProp).toEqual({ innerProp: "innerValue" });
        expect(result.prop1).toBe("outerValue");
    });

    test("map_WithExtraPropertiesInSource_ShouldMapOnlyMatchingProperties", () => {
        // Arrange
        class SourceWithExtraProps {
            public prop1 = "value1";
            public prop2 = 42;
            public extraProp = "extra"; // Should not be mapped
        }

        class TargetWithFewerProps {
            public prop1: string = "";
            public prop2: number = 0;
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceWithExtraProps, TargetWithFewerProps);
        const source = new SourceWithExtraProps();

        // Act
        const result = mapper.map(source, SourceWithExtraProps, TargetWithFewerProps);

        // Assert
        expect(result.prop1).toBe("value1");
        expect(result.prop2).toBe(42);
        expect((result as any).hasOwnProperty("extraProp")).toBe(false);
    });

    test("map_WithCircularReferences_ShouldMapWithoutErrors", () => {
        // Arrange
        class SourceWithCircular {
            public prop1 = "value";
            public circularRef: any = this; // Circular reference
        }

        class TargetWithCircular {
            public prop1: string = "";
            public circularRef: any = {};
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceWithCircular, TargetWithCircular);
        const source = new SourceWithCircular();

        // Act
        const result = mapper.map(source, SourceWithCircular, TargetWithCircular);

        // Assert
        expect(result.prop1).toBe("value");
        expect(result.circularRef).toBe(source);
    });

    test("map_WithArrays_ShouldMapCorrectly", () => {
        // Arrange
        class SourceWithArray {
            public prop1 = [1, 2, 3];
        }

        class TargetWithArray {
            public prop1: number[] = [];
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceWithArray, TargetWithArray);
        const source = new SourceWithArray();

        // Act
        const result = mapper.map(source, SourceWithArray, TargetWithArray);

        // Assert
        expect(result.prop1).toEqual([1, 2, 3]);
    });

    test("map_WithDates_ShouldMapCorrectly", () => {
        // Arrange
        class SourceWithDate {
            public prop1 = new Date("2023-10-21");
        }

        class TargetWithDate {
            public prop1: Date = new Date();
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceWithDate, TargetWithDate);
        const source = new SourceWithDate();

        // Act
        const result = mapper.map(source, SourceWithDate, TargetWithDate);

        // Assert
        expect(result.prop1).toEqual(new Date("2023-10-21")); // Dates should map correctly
    });

    test("map_WithMixedPrimitivesAndComplexTypes_ShouldMapCorrectly", () => {
        // Arrange
        class MixedSource {
            public prop1 = "string";
            public prop2 = 123;
            public prop3 = { nested: true };
            public prop4 = [1, 2, 3];
            public prop5 = new Date("2023-10-21");
        }

        class MixedTarget {
            public prop1: string = "";
            public prop2: number = 0;
            public prop3 = { nested: false };
            public prop4: number[] = [];
            public prop5: Date = new Date();
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(MixedSource, MixedTarget);
        const source = new MixedSource();

        // Act
        const result = mapper.map(source, MixedSource, MixedTarget);

        // Assert
        expect(result.prop1).toBe("string");
        expect(result.prop2).toBe(123);
        expect(result.prop3).toEqual({ nested: true });
        expect(result.prop4).toEqual([1, 2, 3]);
        expect(result.prop5).toEqual(new Date("2023-10-21"));
    });

    test("map_WithMultipleProfilesAndTransformations_ShouldApplyCorrectTransformations", () => {
        // Arrange
        class SourceClass {
            public prop1 = "value1";
            public prop2 = 42;
        }

        class TargetClass {
            public prop1: string = "";
            public prop2: number = 0;
        }

        class NestedTarget {
            public outerProp = { innerProp: "" };
            public prop1: string = "";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });

        const profile1: IMappingOptions = {
            transforms: {
                prop2: (value: number) => value * 10 // Multiply by 10
            }
        };

        const profile2: IMappingOptions = {
            transforms: {
                prop1: (value: string) => value + " transformed" // Append 'transformed'
            }
        };

        mapper.addProfile(SourceClass, TargetClass, profile1);
        mapper.addProfile(SourceClass, NestedTarget, profile2);

        const source = new SourceClass();

        // Act
        const result1 = mapper.map(source, SourceClass, TargetClass);
        const result2 = mapper.map(source, SourceClass, NestedTarget);

        // Assert
        expect(result1.prop2).toBe(420); // 42 * 10
        expect(result2.prop1).toBe("value1 transformed");  // 'transformed' should be appended
    });

    test("mapArray_WithValidSourceArray_ShouldMapCorrectly", () => {
        // Arrange
        class SourceArrayClass {
            public prop1 = "value";
        }

        class TargetArrayClass {
            public prop1: string = "";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        mapper.addProfile(SourceArrayClass, TargetArrayClass);
        const sourceArray = [new SourceArrayClass(), new SourceArrayClass()];

        // Act
        const result = mapper.mapArray(sourceArray, SourceArrayClass, TargetArrayClass);

        // Assert
        expect(result.length).toBe(2);
        expect(result[0].prop1).toBe("value");
        expect(result[1].prop1).toBe("value");
    });

    test("map_WithUndefinedValueAndUndefinedIsAValueFalse_ShouldIgnoreUndefined", () => {
        // Arrange
        class SourceWithUndefined {
            public prop1: string | undefined = undefined;
            public prop2: number = 42;
        }

        class TargetWithUndefined {
            public prop1: string | undefined = "";
            public prop2: number = 0;
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: false });
        mapper.addProfile(SourceWithUndefined, TargetWithUndefined);
        const source = new SourceWithUndefined();

        // Act
        const result = mapper.map(source, SourceWithUndefined, TargetWithUndefined);

        // Assert
        expect(result.prop1).toBe(""); // prop1 should be ignored
        expect(result.prop2).toBe(42); // prop2 should be mapped
    });

    test("map_WithIgnoreAndTransforms_ShouldApplyCorrectly", () => {
        // Arrange
        class SourceWithTransformAndIgnore {
            public prop1 = "value";
            public prop2 = 42;
            public prop3 = "ignoreThis";
        }

        class TargetWithTransformAndIgnore {
            public prop1: string = "";
            public prop2: number = 0;
            public prop3: string = "";
        }

        const mapper = new Mapper({ strict: false, undefinedIsAValue: true });
        const options: IMappingOptions = {
            ignore: ["prop3"], // Ignore prop3
            transforms: {
                prop2: (value: number) => value * 2 // Multiply prop2 by 2
            }
        };
        mapper.addProfile(SourceWithTransformAndIgnore, TargetWithTransformAndIgnore, options);
        const source = new SourceWithTransformAndIgnore();

        // Act
        const result = mapper.map(source, SourceWithTransformAndIgnore, TargetWithTransformAndIgnore);

        // Assert
        expect(result.prop1).toBe("value");
        expect(result.prop2).toBe(84); // 42 * 2
        expect(result.prop3).toBe(""); // prop3 should be ignored
    });

    test("map_WithNoDefaultValuesInTargetClass_ShouldThrowError", () => {
        // Arrange
        class SourceWithoutDefaults {
            public prop1 = "value";
        }

        class TargetWithoutDefaults {
            public prop1!: string; // No default value, strict mode will fail
        }

        const mapper = new Mapper({ strict: true, undefinedIsAValue: true });
        mapper.addProfile(SourceWithoutDefaults, TargetWithoutDefaults);
        const source = new SourceWithoutDefaults();

        // Act & Assert
        expect(() => {
            mapper.map(source, SourceWithoutDefaults, TargetWithoutDefaults);
        }).toThrow("the target class have no properties or the props not have defaut value for the runtime initialization");
    });
});

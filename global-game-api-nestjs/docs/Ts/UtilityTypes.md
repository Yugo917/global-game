Here’s a table in English detailing common TypeScript utility types such as `Omit`, `Pick`, etc., with a description, use case, and example result for each:

| **Utility Type**     | **Description**                                                                 | **Use Case**                                                   | **Example Result**                                             |
|----------------------|---------------------------------------------------------------------------------|----------------------------------------------------------------|----------------------------------------------------------------|
| `Pick<T, K>`         | Selects specific properties from type `T` that are listed in `K`.                | Used when you want to create a new type by extracting certain properties from an existing type. | **Example**: If `T` is `{ name: string, age: number, city: string }` and `K` is `"name"`, the result will be `{ name: string }`. |
| `Omit<T, K>`         | Excludes specific properties from type `T` that are listed in `K`.               | Used when you want to create a new type by removing certain properties from an existing type. | **Example**: If `T` is `{ name: string, age: number, city: string }` and `K` is `"age"`, the result will be `{ name: string, city: string }`. |
| `Partial<T>`         | Makes all properties of type `T` optional.                                       | Used when you want to allow creating an object that can have only some properties from the original type. | **Example**: If `T` is `{ name: string, age: number }`, the result will be `{ name?: string, age?: number }`. |
| `Required<T>`        | Makes all properties of type `T` mandatory (the opposite of `Partial`).          | Used when you want to enforce that all properties of a type must be provided, even if they are optional in the original type. | **Example**: If `T` is `{ name?: string, age?: number }`, the result will be `{ name: string, age: number }`. |
| `Readonly<T>`        | Makes all properties of type `T` immutable (readonly).                           | Used when you want to ensure that properties of a type cannot be modified after they are initialized. | **Example**: If `T` is `{ name: string, age: number }`, the result will be `{ readonly name: string, readonly age: number }`. |
| `Record<K, T>`       | Creates an object type with keys of type `K` and values of type `T`.             | Used to create an object where the keys are of a certain type and the values are of another type. | **Example**: If `K` is `string` and `T` is `number`, the result will be an object type like `{ [key: string]: number }`. |
| `Exclude<T, U>`      | Excludes from `T` all types that are assignable to `U`.                          | Used to filter out specific types from a union type.           | **Example**: If `T` is `"a" \| "b" \| "c"` and `U` is `"b"`, the result will be `"a" \| "c"`. |
| `Extract<T, U>`      | Extracts from `T` all types that are assignable to `U`.                          | Used to create a type by taking only the common types between `T` and `U`. | **Example**: If `T` is `"a" \| "b" \| "c"` and `U` is `"b" \| "c"`, the result will be `"b" \| "c"`. |
| `NonNullable<T>`     | Excludes `null` and `undefined` from `T`.                                        | Used when you want to create a type that excludes `null` and `undefined` values. | **Example**: If `T` is `string \| null \| undefined`, the result will be `string`. |
| `ReturnType<T>`      | Extracts the return type of a function `T`.                                      | Used when you want to get the return type of a given function. | **Example**: If `T` is `() => string`, the result will be `string`. |
| `Parameters<T>`      | Extracts a tuple type representing the types of the parameters of function `T`.  | Used when you want to get an array of parameter types for a function. | **Example**: If `T` is `(a: number, b: string) => void`, the result will be `[number, string]`. |
| `ConstructorParameters<T>` | Extracts a tuple type representing the types of the parameters of a class constructor `T`. | Used when you want to get the constructor parameter types of a class. | **Example**: If `T` is `new (a: string, b: number) => SomeClass`, the result will be `[string, number]`. |
| `InstanceType<T>`    | Extracts the instance type returned by a class constructor `T`.                  | Used to get the type of the instance created by a constructor function. | **Example**: If `T` is a class constructor like `SomeClass`, the result will be `SomeClass`. |

### Detailed Examples

#### `Pick<T, K>`
- **Use case**: You need an object with only specific properties from another object.
- **Example**:
   ```typescript
   type Person = { name: string; age: number; city: string };
   type PickedPerson = Pick<Person, "name" | "age">;
   // Result: { name: string; age: number }
   ```

#### `Omit<T, K>`
- **Use case**: You want an object without certain specific properties.
- **Example**:
   ```typescript
   type Person = { name: string; age: number; city: string };
   type PersonWithoutCity = Omit<Person, "city">;
   // Result: { name: string; age: number }
   ```

#### `Partial<T>`
- **Use case**: You want to make all properties of a type optional, for instance, when updating part of an object.
- **Example**:
   ```typescript
   type Person = { name: string; age: number };
   type PartialPerson = Partial<Person>;
   // Result: { name?: string; age?: number }
   ```

#### `Required<T>`
- **Use case**: You want to make all properties mandatory, even if they were optional in the original type.
- **Example**:
   ```typescript
   type Person = { name?: string; age?: number };
   type RequiredPerson = Required<Person>;
   // Result: { name: string; age: number }
   ```

#### `Readonly<T>`
- **Use case**: You want to prevent properties from being modified after initialization.
- **Example**:
   ```typescript
   type Person = { name: string; age: number };
   type ReadonlyPerson = Readonly<Person>;
   // Result: { readonly name: string; readonly age: number }
   ```

#### `Record<K, T>`
- **Use case**: You need to create an object with keys of a specific type and values of another type.
- **Example**:
   ```typescript
   type ScoreRecord = Record<string, number>;
   // Result: { [key: string]: number }
   const scores: ScoreRecord = { alice: 10, bob: 15 };
   ```

#### `Exclude<T, U>`
- **Use case**: You want to filter out certain types from a union.
- **Example**:
   ```typescript
   type Letters = "a" | "b" | "c";
   type WithoutB = Exclude<Letters, "b">;
   // Result: "a" | "c"
   ```

#### `Extract<T, U>`
- **Use case**: You need to extract only the common types between two types.
- **Example**:
   ```typescript
   type Letters = "a" | "b" | "c";
   type CommonWithB = Extract<Letters, "b" | "c">;
   // Result: "b" | "c"
   ```

#### `NonNullable<T>`
- **Use case**: You want to exclude `null` and `undefined` from a type.
- **Example**:
   ```typescript
   type MaybeString = string | null | undefined;
   type NonNullableString = NonNullable<MaybeString>;
   // Result: string
   ```

#### `ReturnType<T>`
- **Use case**: You want to get the return type of a function.
- **Example**:
   ```typescript
   function getName(): string {
     return "Alice";
   }
   type NameType = ReturnType<typeof getName>;
   // Result: string
   ```

#### `Parameters<T>`
- **Use case**: You want to get an array of the parameter types of a function.
- **Example**:
   ```typescript
   function greet(name: string, age: number): void {}
   type GreetParameters = Parameters<typeof greet>;
   // Result: [string, number]
   ```

#### `ConstructorParameters<T>`
- **Use case**: You want to get the types of the parameters passed to a class constructor.
- **Example**:
   ```typescript
   class Person {
     constructor(public name: string, public age: number) {}
   }
   type PersonConstructorParams = ConstructorParameters<typeof Person>;
   // Result: [string, number]
   ```

#### `InstanceType<T>`
- **Use case**: You want to get the type of the instance created by a class constructor.
- **Example**:
  

 ```typescript
   class Person {
     constructor(public name: string, public age: number) {}
   }
   type PersonInstance = InstanceType<typeof Person>;
   // Result: Person
   ```

This table and the detailed examples should help you understand how to use these utility types in TypeScript effectively!
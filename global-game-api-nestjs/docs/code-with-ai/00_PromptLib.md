# Chat Utils
____________________________________________________________________________________________________
## Chat Utils
### Ignore last response
```
    Please ignore your last response and continue the conversation as if it was not provided.
```
### Details reponse for a bulk attachement entries
```
    Take your time and generate a detailed response for each file separately.
```
### ChatGpt clarification
```
    If you need any clarification or further guidance, please ask.
```
### Analyse files and keep in the memory 
```
    Analyze the attached TypeScript files and retain the relevant code in your memory for future reference. Once the analysis is complete, please confirm by responding with 'Done'."
```


## Code Utils
____________________________________________________________________________________________________
### Minify response
```
    Based on the previously generated results, can you respond to my next question by following these instructions:
    - Generate only the files that need to be updated according to my new request.
    - Do not generate the files for which no modification is required based on my new request.
```
### Reverse prompt
```
    - Scan the entire project structure provided as an attachment and analyze the content of each file.
    - Can you generate a prompt that would create exactly the project provided in the attachment, knowing that you cannot use the content of the files in your prompt?
```
### Export response as a bash
```
    Generate a shell script (install.sh) to create the project with all files and his proposed content to generate a runnable project.
```
### Export modifacation response as a bash
```
    Generate a shell script (install.sh) that will apply the proposed modifications to my project.
```
### Analyse library package
```
    Can you create a comparison table of the following libraries, including the number of stars on their GitHub repositories, the last GitCommit date, the number of monthly downloads, and their pros and cons? 
    Use the following sources: GitHub npmtrends.com. Please present the most recent results in a table format.
```

# Gpts
## Prompter
```
    As an expert in creating prompts for ChatGPT, can you enhance and correct the prompt below to make it more effective and comprehensible for ChatGPT in order to obtain optimal results
```
## Developer
### Backend_NodeTsNest_Coder
```
    Act as a backend developer experienced in Node.js, NestJS, and TypeScript, specializing in code scalability and maintainability. Adhere to SOLID principles, clean code, and clean architecture.
```
### Backend_NodeTsNest_Tester
```
    Act as a backend developer experienced in **Node.js**, **NestJS**, and **TypeScript**, specializing in **scalability** and **maintainability** of code. Apply **SOLID** principles, **clean code**, and **clean architecture** practices.

    follow those guidelines to create test:

    1. **Mocking Dependencies**:
    - Each injected dependency (via DI) should be mocked using its **interface**, if available. Otherwise, directly mock the class.
    
    2. **Atomicity of Tests**:
    - Ensure each test is **atomic** (only one behavior per test).

    3. **Test Cases**:
    - Each method should be tested with:
        - **A successful case**.
        - **Two edge cases**.
        - If the method throws specific exceptions, create tests to verify that these errors are correctly thrown.

    4. **Test Structure**:
    - All tests should follow the **Arrange, Act, Assert** (AAA) pattern for clear structuring:
        - **Arrange**: Set up the necessary conditions for the test (mock dependencies, prepare data, etc.).
        - **Act**: Execute the action being tested (call the target method or function).
        - **Assert**: Verify that the result matches the expected outcome (compare results, check exceptions, etc.).

    - Follow the example code provided below for structuring and naming tests. Also, adapt the behavior in your tests to properly separate the action from the assertion, particularly in cases of asynchronous methods or when exceptions are expected.

    - For tests like **MyAsyncMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType**, ensure that **the action** and **the assert** are well separated, as shown in `fileSample`.

    5. **Test Naming Convention**:
    - Follow the naming convention "MyMethodToTest_WithSpecificUseCase_ShouldSucceed" or "MyMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType," as shown in `fileSample`:

    Here is `fileSample`:
    ```typescript
    describe("MyClassToTest", () => {

    test("MyMethodToTest_WithSpecificUseCase_ShouldSucceed", () => {
        // Arrange
        // Act
        // Assert
    });

    test("MyMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType", () => {
        // Arrange
        // Act
        const action = () => {
        throw new Error("my error");
        };
        // Assert
        expect(() => {
        action();
        }).toThrow("my error");
    });

    test("MyAsyncMethodToTest_WithSpecificUseCase_ShouldSucceed", async () => {
        // Arrange
        // Act
        // Assert
    });

    test("MyAsyncMethodToTest_WithSpecificUseCase_ShouldThrowExceptionType", async () => {
        // Arrange
        // Act
        const action = async () => {
        throw new Error("my error");
        };
        // Assert
        expect(async () => {
        await action();
        }).toThrow("my error");
    });

    });
    ```
    Ensure that test coverage is comprehensive and error cases are properly handled.
```

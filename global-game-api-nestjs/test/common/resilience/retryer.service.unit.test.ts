import { Test, TestingModule } from "@nestjs/testing";
import { LoggerService } from "@nestjs/common";
import { RetryerService } from "../../../src/common/resilience/retryer.service";

describe("RetryerService", () => {
    let retryerService: RetryerService;
    let loggerMock: jest.Mocked<LoggerService>;

    beforeEach(async () => {
        // Create a mock for LoggerService
        loggerMock = {
            log: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn()
        } as jest.Mocked<LoggerService>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RetryerService,
                { provide: "APP_LOGGER", useValue: loggerMock }
            ]
        }).compile();

        retryerService = module.get<RetryerService>(RetryerService);
    });

    describe("execute", () => {
        test("execute_WithSuccessfulCallback_ShouldReturnResult", async () => {
            // Arrange
            const callback = jest.fn().mockResolvedValue("Success");
            const callbackName = "SuccessfulCallback";

            // Act
            const result = await retryerService.execute(callbackName, callback, 5, 3, 10, 60);

            // Assert
            expect(result).toBe("Success");
            expect(callback).toHaveBeenCalledTimes(1);
            expect(loggerMock.log).toHaveBeenCalledWith(`${callbackName} succeeded after 1 attempt(s)`);
        });

        test("execute_WithFailingCallback_ThenSuccessOnRetry_ShouldRetryAndReturnResult", async () => {
            // Arrange
            const callback = jest
                .fn()
                .mockRejectedValueOnce(new Error("Temporary Error"))
                .mockResolvedValue("Success on retry");
            const callbackName = "RetryCallback";

            // Act
            const result = await retryerService.execute(callbackName, callback, 5, 2, 5, 30);

            // Assert
            expect(result).toBe("Success on retry");
            expect(callback).toHaveBeenCalledTimes(2);
            expect(loggerMock.warn).toHaveBeenCalledWith(`Retrying ${callbackName} (1)...`);
            expect(loggerMock.log).toHaveBeenCalledWith(`${callbackName} succeeded after 2 attempt(s)`);
        });

        test("execute_WithCallbackFailingBeyondRetries_ShouldThrowError", async () => {
            // Arrange
            const retries = 3;
            const callback = jest.fn().mockRejectedValue(new Error("Persistent Error"));
            const callbackName = "PersistentFailCallback";

            // Act
            const action = async (): Promise<void> => {
                await retryerService.execute(callbackName, callback, retries, 1, 5, 30);
            };

            // Assert
            await expect(action).rejects.toThrow("Persistent Error");
            expect(callback).toHaveBeenCalledTimes(retries + 1); // Initial attempt + retries
            expect(loggerMock.warn).toHaveBeenCalledTimes(retries);
        });
    });
});

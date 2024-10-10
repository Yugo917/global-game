import { Inject, Injectable, LoggerService } from "@nestjs/common";
import * as retry from "retry";

@Injectable()
export class RetryerService {

    constructor(@Inject("APP_LOGGER") private readonly logger: LoggerService) { }

    execute<T>(callbackName: string, callback: () => Promise<T>, retries = 5, factor = 3, minTimeout = 1000, maxTimeout = 60000): Promise<T> {
        const operation = retry.operation({
            retries,
            factor,
            minTimeout,
            maxTimeout
        });

        return new Promise<T>((resolve, reject) => {
            operation.attempt(async currentAttempt => {
                try {
                    const result = await callback();
                    this.logger.log(`${callbackName} succeeded after ${currentAttempt} attempt(s)`);
                    resolve(result);
                } catch (err) {
                    if (operation.retry(err as Error)) {
                        this.logger.warn(`Retrying ${callbackName} (${currentAttempt})...`);
                        return;
                    }
                    reject(err);
                }
            });
        });
    }
}

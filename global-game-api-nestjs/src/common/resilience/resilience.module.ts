import { Module } from "@nestjs/common";
import { RetryerService } from "src/common/resilience/retryer.service";
import { LoggerModule } from "src/common/logger/logger.module";

@Module({
    imports: [LoggerModule],
    providers: [RetryerService],
    exports: [RetryerService]
})
export class ResilienceModule { }
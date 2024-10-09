import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { WinstonLogger } from "src/common/logger/winston.logger";
import { LoggerInterceptor } from "src/common/logger/logger.interceptor";
import { LogInterpolator } from "src/common/logger/log.interpolator";

@Module({
    providers: [
        {
            provide: "ILogInterpolator",
            useClass: LogInterpolator
        },
        {
            provide: "APP_LOGGER",
            useClass: WinstonLogger
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor
        }
    ],
    exports: ["APP_LOGGER"]
})
export class LoggerModule { }
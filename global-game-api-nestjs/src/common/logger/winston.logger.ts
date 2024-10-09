// src/utils/winston.logger.ts

import { Inject, LoggerService } from "@nestjs/common";
import * as winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";
import { Client as ElasticsearchClient } from "@elastic/elasticsearch";
import { ILogInterpolator } from "src/common/logger/log.interpolator";

interface IInterpolatedLogData {
    message: string,
    messageTemplate: string | undefined,
    metadata: object | undefined
}

export class WinstonLogger implements LoggerService {

    private logger: winston.Logger;
    private logInterpolator: ILogInterpolator

    constructor(
        @Inject("ILogInterpolator") logInterpolator: ILogInterpolator,
    ) {
        this.logger = this.createLogger();
        this.logInterpolator = logInterpolator;
    }

    private createLogger(): winston.Logger {
        const esTransport = new ElasticsearchTransport({
            level: process.env.LOG_LEVEL,
            client: new ElasticsearchClient({
                node: process.env.ELASTIC_URL
            }),
            indexPrefix: process.env.ELASTIC_LOG_INDEX_PREFIX,
            //indexTemplate: true,
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            transformer: logData => {
                const createdLogData: IInterpolatedLogData = logData.meta as IInterpolatedLogData
                const transformedLogData = {
                    "@timestamp": new Date().toISOString(),
                    level: logData.level,
                    message: logData.message,
                    messageTemplate: createdLogData.messageTemplate,
                    // eslint-disable-next-line no-restricted-syntax
                    ...createdLogData.metadata
                };
                return transformedLogData;
            },
            index: `${process.env.ELASTIC_LOG_INDEX_PREFIX}-${new Date().toISOString().split("T")[0]}`  // Dynamic index dynamique per date (e.g., app-logs-2024-09-05)
        });

        return winston.createLogger({
            level: process.env.LOG_LEVEL,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                // winston.format.colorize({ all: true }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp} ${level}] ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                esTransport
            ]
        });
    }

    public createLogData(message: string, metadata?: object): IInterpolatedLogData {
        const msg = metadata ? this.logInterpolator.interpolateMessage(message, metadata) : message;
        const messageTemplate = metadata ? message : undefined;
        const interpolatedLogData: IInterpolatedLogData = { message: msg, messageTemplate, metadata };
        return interpolatedLogData;
    }

    public log(message: string): void
    public log(message: string, metadata?: object): void
    public log(message: string, metadata?: object): void {
        this.logger.info(this.createLogData(message, metadata));
    };

    public error(message: string): void
    public error(message: string, metadata?: object): void
    public error(message: string, metadata?: object): void {
        this.logger.error(this.createLogData(message, metadata));
    };

    public warn(message: string): void
    public warn(message: string, metadata?: object): void
    public warn(message: string, metadata?: object): void {
        this.logger.warn(this.createLogData(message, metadata));
    };

    public debug(message: string): void
    public debug(message: string, metadata?: object): void
    public debug(message: string, metadata?: object): void {
        this.logger.debug(this.createLogData(message, metadata));
    };

    public verbose(message: string): void
    public verbose(message: string, metadata?: object): void
    public verbose(message: string, metadata?: object): void {
        this.logger.verbose(this.createLogData(message, metadata));
    };

}

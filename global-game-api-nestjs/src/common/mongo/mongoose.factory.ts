import { Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { RetryerService } from "../resilience/retryer.service";


@Injectable()
export class MongooseFactory implements MongooseOptionsFactory {
    constructor(
        private readonly retryerService: RetryerService
    ) { }

    async createMongooseOptions(): Promise<MongooseModuleOptions> {
        await this.retryerService.execute(
            "mongoose.connect",
            async () => {
                await mongoose.connect(process.env.MONGODB_URI as string);
                return mongoose;
            }
        );

        return {
            uri: process.env.MONGODB_URI
        };
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import { stringify } from "circular-json"

export interface ILogInterpolator {
    interpolateMessage(messageTemplate: string, metadata: Record<string, any>): string
}

export class LogInterpolator implements ILogInterpolator {

    public interpolateMessage(messageTemplate: string, metadata: object): string {
        const metadataAsString = this.toMetaDataValuesAsString(metadata) as any;

        return messageTemplate.replace(/{(\w+)}/g, (match, key) => {
            return typeof metadataAsString[key] !== "undefined" ? metadataAsString[key] : match;
        });
    };

    public toMetaDataValuesAsString(metadata: object): object {
        const metadataAsString = { ...metadata } as any;
        for (const key in metadata) {
            if (typeof (metadata as any)[key] !== "string") {
                metadataAsString[key] = stringify((metadata as any)[key])
            }
        }
        return metadataAsString;
    };
}
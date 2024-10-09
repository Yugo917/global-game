/* eslint-disable no-console */
import { stringify } from "circular-json"

export const logObject = <T>(obj: T, objName?: string): void => {
    if (objName) {
        console.log(`${objName}:${stringify(obj)}`);
    }
    else {
        console.log(stringify(obj));
    }
}
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Inject } from "@nestjs/common";
import { LoggerService } from "@nestjs/common";
import { stringify } from "circular-json";

interface IHpptMessageMetadata {
    httpMethod: string;
    httpUrl: string;
    httpResponseStatusCode: string;
    httpElapsed: string;
    HttpErrorMessage: string | undefined;
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    public constructor(@Inject("APP_LOGGER") private readonly logger: LoggerService) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const now = Date.now();
        const httpMessageTemplate = "HTTP {httpMethod} {httpUrl} responded {httpResponseStatusCode} in {httpElapsed} ms";

        return next.handle().pipe(
            tap({
                next: () => {
                    const metadata = this.getHttpMetaData(context, now)
                    this.logger.log(httpMessageTemplate, metadata);
                },
                error: err => {
                    const metadata = this.getHttpMetaData(context, now, err)
                    this.logger.error(httpMessageTemplate, metadata);
                    this.logger.error(metadata.HttpErrorMessage);
                }
            })
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private getHttpMetaData(context: ExecutionContext, interceptDate: number, error?: any): IHpptMessageMetadata {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { statusCode } = response;

        const responseStatusCode = error ? error.status : statusCode;
        const errorAsJson = stringify(error);
        const errorMessage = error ? "(error : " + error?.message + ") " + errorAsJson : undefined

        const elapsed = (Date.now() - interceptDate).toFixed(4);

        return {
            httpMethod: request.method,
            httpUrl: request.url,
            httpResponseStatusCode: responseStatusCode,
            httpElapsed: elapsed,
            HttpErrorMessage: errorMessage
        };
    }
}

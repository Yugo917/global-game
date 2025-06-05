/* eslint-disable no-console */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

export const getAppValidationPipe = (): ValidationPipe => new ValidationPipe({
  whitelist: true,   // Remove properties not present in the DTO
  forbidNonWhitelisted: true, // Throw an error if extra properties are provided
  transform: true    // Automatically transform payloads to the expected DTO types
});

async function bootstrap(): Promise<void> {
  console.log("⚠️ - The project need to be run on Node V20.9.0");

  const app = await NestFactory.create(AppModule);

  // Validation pipe
  app.useGlobalPipes(getAppValidationPipe());

  // Set up Swagger options
  const config = new DocumentBuilder()
    .setTitle("Global Game API")
    .setDescription("API documentation for Global Game platform")
    .setVersion("1.0")
    .build();

  // Generate Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI endpoint
  SwaggerModule.setup("swagger", app, document, {
    jsonDocumentUrl: "swagger/json"
  });

  //
  app.enableCors();
  await app.listen(3000);

  console.log("✔️ - Server is running on port 3000");
  console.log("🔗 -  App : http://localhost:3000/swagger");
  console.log("🔗 -  Kibana : http://localhost:5701");
}
bootstrap();

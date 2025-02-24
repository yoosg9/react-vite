import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { Request, Response } from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Express 어댑터를 직접 사용하여 Health Check 경로 추가
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get("/", (_req: Request, res: Response) =>
    res.status(200).json({ status: "ok" })
  );
  expressApp.get("/healthz", (_req: Request, res: Response) =>
    res.status(200).send("ok")
  );
  expressApp.get("/_ah/health", (_req: Request, res: Response) =>
    res.status(200).send("ok")
  );

  // Swagger 설정 추가
  const config = new DocumentBuilder()
    .setTitle("NestJS GKE API")
    .setDescription("GKE 배포용 NestJS API 문서")
    .setVersion("1.0")
    .addTag("nestjs")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0"); // ✅ IPv4에서 Listen 하도록 변경
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📄 Swagger API Docs: http://localhost:${port}/api`);
}

bootstrap();

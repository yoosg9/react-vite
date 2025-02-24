import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Health Check")
@Controller()
export class AppController {
  @Get("/health")
  @ApiOperation({ summary: "서버 상태 체크" }) // 올바른 위치
  getHealth(): string {
    return "OK";
  }
}
